from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
import markdown2

# --- Setup ---
os.environ['GRPC_VERBOSITY'] = 'ERROR'
os.environ['GLOG_minloglevel'] = '2'

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# --- Get API Key ---
api_key = ""   

if not api_key or api_key == "YOUR_API_KEY":
    print("Please add your actual Gemini API key in the code.")
    exit()

genai.configure(api_key=api_key)

# --- Model Config ---
generation_config = {
    "temperature": 0.5,
    "top_p": 0.9,
    "top_k": 40,
    "max_output_tokens": 512,  # limit for low bandwidth
}

safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    safety_settings=safety_settings,
)

chat = model.start_chat(history=[])

# --- Local Symptom Dataset (Fallback) ---
SYMPTOM_MAP = {
    "fever,cough": ["Common Cold", "Flu", "COVID-19"],
    "headache,nausea": ["Migraine", "Food Poisoning"],
    "stomach pain,diarrhea": ["Food Poisoning", "Gastroenteritis"],
    "chest pain,shortness of breath": ["Heart Issue", "Asthma"],
    "fever,body ache": ["Flu", "Viral Infection"],
    "cough,runny nose": ["Common Cold", "Allergies"],
    "red rash,skin": ["Allergic Reaction", "Eczema", "Heat Rash"],
    "sore throat,fever": ["Strep Throat", "Viral Infection"],
    "vomiting,diarrhea": ["Food Poisoning", "Stomach Bug"],
    "back pain,stiffness": ["Muscle Strain", "Poor Posture"],
    "joint pain,swelling": ["Arthritis", "Injury"],
    "difficulty breathing,wheezing": ["Asthma", "Respiratory Issue"],
}

def local_checker(user_message: str):
    """Simple offline symptom matcher"""
    text = user_message.lower()
    
    # Check for individual symptoms first
    if "red" in text and "rash" in text:
        return (
            f"**Possible causes:** Allergic Reaction, Eczema, Heat Rash\n\n"
            f"**General care:** Keep area clean, avoid scratching, apply cool compress\n\n"
            f"⚠️ This is not medical advice. Please consult a doctor."
        )
    
    if "fever" in text and not ("cough" in text or "body ache" in text):
        return (
            f"**Possible causes:** Viral infection, bacterial infection\n\n"
            f"**General care:** Stay hydrated, rest, monitor temperature\n\n"
            f"⚠️ This is not medical advice. Please consult a doctor if fever persists."
        )
    
    if "headache" in text and not "nausea" in text:
        return (
            f"**Possible causes:** Tension headache, Dehydration, Stress, Eye strain\n\n"
            f"**General care:** Rest in dark quiet room, drink water, apply cold compress to forehead\n\n"
            f"⚠️ This is not medical advice. Seek immediate help for severe or sudden headaches."
        )
    
    if "yellow" in text and "urine" in text:
        return (
            f"**Possible causes:** Dehydration, Normal concentrated urine, Vitamin supplements\n\n"
            f"**General care:** Increase water intake, monitor color changes\n\n"
            f"⚠️ Dark yellow or orange urine may indicate serious issues. Please consult a doctor."
        )
    
    if "cough" in text and not ("fever" in text or "runny" in text):
        return (
            f"**Possible causes:** Dry throat, Allergies, Common cold, Throat irritation\n\n"
            f"**General care:** Stay hydrated, honey and warm water, avoid cold drinks\n\n"
            f"⚠️ This is not medical advice. See a doctor for persistent cough or blood."
        )
    
    if "stomach" in text and ("pain" in text or "ache" in text) and not "diarrhea" in text:
        return (
            f"**Possible causes:** Indigestion, Gas, Acid reflux, Overeating\n\n"
            f"**General care:** Avoid spicy food, drink warm water, rest\n\n"
            f"⚠️ This is not medical advice. Severe pain needs immediate medical attention."
        )
    
    if "back" in text and ("pain" in text or "ache" in text):
        return (
            f"**Possible causes:** Muscle strain, Poor posture, Lifting injury\n\n"
            f"**General care:** Rest, apply heat/cold, gentle stretching\n\n"
            f"⚠️ This is not medical advice. See a doctor for severe or persistent pain."
        )
    
    if "sore throat" in text or ("throat" in text and ("pain" in text or "hurt" in text)):
        return (
            f"**Possible causes:** Viral infection, Bacterial infection, Dry air\n\n"
            f"**General care:** Warm salt water gargle, honey, stay hydrated\n\n"
            f"⚠️ This is not medical advice. See a doctor if symptoms worsen or fever develops."
        )
    
    # Check for combination symptoms
    text_compact = text.replace(" ", "")
    for key, conditions in SYMPTOM_MAP.items():
        if all(symptom in text_compact for symptom in key.split(",")):
            return (
                f"**Possible causes:** {', '.join(conditions)}\n\n"
                f"**General care:** Rest, stay hydrated, monitor symptoms\n\n"
                f"⚠️ This is not medical advice. Please consult a doctor."
            )
    return None

# --- Optimized Prompt for AI ---
PRE_PROMPT = """You are a simple **AI Symptom Checker** for rural areas.
- Do NOT give an exact diagnosis.
- Suggest possible causes in plain words.
- Give simple next steps (home care or doctor visit).
- Always end with: "⚠️ This is not medical advice. Please see a doctor."
User symptoms:"""

# --- Routes ---
@app.route("/")
def index():
    return "✅ Symptom Checker API is running."

@app.route("/chat", methods=["POST"])
def chat_endpoint():
    user_message = request.json.get("message")
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # --- Step 1: Local quick check ---
    local_result = local_checker(user_message)
    if local_result:
        return jsonify({"reply": markdown2.markdown(local_result)})

    # --- Step 2: AI Symptom Check ---
    try:
        full_prompt = PRE_PROMPT + " " + user_message
        response = chat.send_message(full_prompt)
        bot_reply_markdown = "".join([chunk.text for chunk in response])
        bot_reply_html = markdown2.markdown(bot_reply_markdown)
        return jsonify({"reply": bot_reply_html})
    except Exception as e:
        # --- Step 3: Fallback for low/no bandwidth ---
        fallback_response = (
            f"**AI Health Assistant** (Offline Mode)\n\n"
            f"I understand you have health concerns. Here's general guidance:\n\n"
            f"**For any symptoms:**\n"
            f"- Monitor your condition\n"
            f"- Stay hydrated and rest\n"
            f"- Keep track of symptom changes\n\n"
            f"**Seek immediate medical attention if you experience:**\n"
            f"- Severe pain or difficulty breathing\n"
            f"- High fever (over 102°F/39°C)\n"
            f"- Persistent vomiting or severe weakness\n\n"
            f"⚠️ This is not medical advice. Please consult a doctor for proper diagnosis and treatment.\n\n"
            f"*Note: AI assistant is currently offline due to connectivity issues.*"
        )
        return jsonify({"reply": markdown2.markdown(fallback_response)})

# --- Run App ---
if __name__ == "__main__":
    app.run(debug=True, port=5001)
