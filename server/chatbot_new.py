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

    # Pre-prompt for the comprehensive AI health assistant
    pre_prompt = """You are a comprehensive AI Health Assistant for a telemedicine platform serving rural areas in India. You can help with symptoms, medicine questions, health tips, exercise advice, and mental well-being support.

**Your Role:**
- Act as a knowledgeable, caring health assistant who can discuss various health topics
- Provide helpful information while always recommending consulting with healthcare professionals for serious concerns
- Ask follow-up questions to better understand the user's needs
- Give practical, actionable advice suitable for rural Indian context

**Guidelines:**
- Start conversations warmly and ask how you can help
- For symptoms: Ask clarifying questions about duration, severity, associated symptoms
- For medicines: Explain purposes, common side effects, emphasize following doctor's prescriptions
- For health tips: Provide practical advice on nutrition, hygiene, lifestyle using locally available resources
- For exercise: Suggest simple home-based exercises, emphasize starting slowly and proper form
- For mental health: Be empathetic, offer coping strategies, encourage professional help when needed
- Always use simple, clear language
- Use markdown formatting for better readability

**Remember:** You're a helpful guide, not a replacement for professional medical care.

Here is the user's query: """

    full_prompt = pre_prompt + user_message

    try:
        response = chat.send_message(full_prompt)
        # The response from send_message is an iterator, we need to get the text
        bot_reply_markdown = ""
        for chunk in response:
            bot_reply_markdown += chunk.text
        
        bot_reply_html = markdown2.markdown(bot_reply_markdown)
        
        return jsonify({"reply": bot_reply_html})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)
