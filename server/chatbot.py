from flask import Flask, request, jsonify
import google.generativeai as genai
import os
import markdown2
from flask_cors import CORS

os.environ['GRPC_VERBOSITY'] = 'ERROR'
os.environ['GLOG_minloglevel'] = '2'

app = Flask(__name__)
CORS(app)

# --- Get API Key ---
# Replace "YOUR_API_KEY" with your actual Gemini API key.
api_key = os.environ.get("GEMINI_API_KEY", "AIzaSyCWvRnLTESSZR9kn9KH6EZtea8Cr4Z4fLY")

if api_key == "YOUR_API_KEY":
    print("Please set the GEMINI_API_KEY environment variable or replace 'YOUR_API_KEY' in chatbot.py.")
    exit()

genai.configure(api_key=api_key)

# --- Model Configuration ---
generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048,
}

safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
]

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    safety_settings=safety_settings,
    system_instruction="""You are an AI-powered symptom checker for a telemedicine platform serving rural areas in Nabha, India. Your goal is to help users understand their symptoms and provide preliminary guidance.
- Start the conversation by warmly greeting the user and asking them to describe their symptoms.
- Do not provide a medical diagnosis.
- Always strongly advise users to consult a qualified doctor for an accurate diagnosis and treatment.
- Keep your language simple, clear, and easy to understand for a rural audience.
- Ask clarifying questions to better understand the user's symptoms if needed (e.g., "How long have you had this symptom?", "Can you describe the pain?").
- Based on the symptoms, you can suggest potential next steps, like whether the condition seems to require an urgent visit to a doctor or if it might be managed with home care while monitoring, but always with the caveat to consult a doctor.
- Your primary function is to be a helpful initial guide, not a replacement for a healthcare professional.
- Use markdown for formatting, like **bold** for emphasis and new lines for lists."""
)

# --- Chat History ---
chat = model.start_chat(history=[])

@app.route("/")
def index():
    return "Chatbot API is running!"

@app.route("/chat", methods=["POST"])
def chat_endpoint():
    user_message = request.json.get("message")
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    try:
        # For now, let's return a test response to check if the connection works
        if "fever" in user_message.lower():
            bot_reply_html = "<p>Hello! I understand you have a fever. Here are some general suggestions:</p><ul><li><strong>Stay hydrated</strong> - Drink plenty of fluids</li><li><strong>Rest</strong> - Get adequate sleep</li><li><strong>Monitor temperature</strong> - Keep track of your fever</li></ul><p><strong>Important:</strong> Please consult with a qualified doctor for proper diagnosis and treatment, especially if fever persists or worsens.</p>"
        else:
            bot_reply_html = "<p>Hello! I'm your AI Health Assistant. I can help you with health-related questions. Please describe your symptoms and I'll try to provide some guidance. Remember to always consult with a qualified doctor for proper medical advice.</p>"
        
        return jsonify({"reply": bot_reply_html})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)
