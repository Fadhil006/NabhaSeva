# NabhaSeva – AI Health Assistant

## 🚀 Quick Start Guide

### Prerequisites
- Node.js and npm installed
- Python 3.7+ installed
- Google Gemini API key (for AI chatbot functionality)

### 1. Setup Environment
```bash
# Clone the repository
git clone https://github.com/Fadhil006/SIH-archive.git
cd SIH-archive

# Install Python dependencies
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install flask flask-cors google-generativeai markdown2

# Install Node.js dependencies
npm install
```

### 2. Configure AI API
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 3. Run the Application
**Terminal 1 - Start Backend (AI Chatbot):**
```bash
source venv/bin/activate
python3 server/chatbot.py
```
Backend runs on: http://localhost:5001

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```
Frontend runs on: http://localhost:5000

### 4. Access the Application
- **Main App**: http://localhost:5000
- **Patient Portal (AI Chat)**: http://localhost:5000/patient
- **API Endpoint**: http://localhost:5001/api/chat

---

## Overview

NabhaSeva is a progressive web application designed for healthcare/pharmacy use with AI-powered health assistance.
It uses:

<> Frontend: React + Vite + TailwindCSS + shadcn/ui

<> Backend: Python Flask with Google Gemini AI integration

<> AI Features: Smart health chatbot for symptom checking and medical guidance

The app is optimized for mobile display, works offline (PWA), and supports APIs for authentication and data storage.
## Project Structure
```
NabhaSeva/
├── client/              # React frontend (Vite-based)
│   ├── src/             # Main React source code
│   │   ├── components/  # UI components including AI health assistant
│   │   │   ├── PatientPortal.tsx    # Main AI chat interface
│   │   │   ├── HealthAssistant.tsx  # Health assistant menu
│   │   │   └── ui/      # shadcn/ui components
│   │   └── pages/       # React pages
│   └── index.html       # Entry HTML file
│
├── server/              # Python Flask backend for AI
│   ├── chatbot.py       # Main AI chatbot with Google Gemini integration
│   ├── main.py          # Alternative FastAPI entry point
│   ├── routes.py        # API routes
│   └── storage.py       # In-memory storage layer
│
├── shared/              # Shared schemas between frontend & backend
│   ├── schemas.py       # Pydantic models for API validation
│   └── models.py        # Database models
│
├── public/              # Static assets
├── dist/                # Production build output
│
├── package.json         # Frontend dependencies
├── vite.config.ts       # Vite config (React build + proxy to backend)
├── tailwind.config.ts   # Tailwind setup
├── components.json      # shadcn/ui configuration
└── README.md            # Documentation
```

# Frontend (React + Vite)
## Entry point

client/src/main.tsx mounts the React app.

TailwindCSS + shadcn UI used for styling.

Multilingual & offline support integrated.

## Dev setup

#### Run:
```bash
cd NabhaSeva
npm install
npm run dev
```

This starts Vite dev server at http://localhost:5173.

API calls (to /api/...) are proxied to FastAPI backend.

#### Build:
```bash
npm run build
```

Outputs static files to dist/public/.

# Backend (Python Flask – AI Integration)

The backend uses Flask with Google Gemini AI to provide intelligent health assistance:

### chatbot.py (Main AI Backend)
```python
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import markdown2

app = Flask(__name__)
CORS(app)

# Configure Google Gemini AI
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel(
    'gemini-1.5-flash',
    system_instruction="You are a helpful medical assistant..."
)

# Persistent chat session for context awareness
chat_session = model.start_chat(history=[])

@app.route('/api/chat', methods=['POST'])
def chat_endpoint():
    data = request.json
    user_message = data.get('message', '')
    
    # Send message to AI and get response
    response = chat_session.send_message(user_message)
    ai_response = markdown2.markdown(response.text)
    
    return jsonify({
        'response': ai_response,
        'status': 'success'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)
```

### Key AI Features:
- **Context-Aware Conversations**: Maintains chat history for better responses
- **Medical Knowledge**: Specialized prompts for health guidance
- **Safety Filters**: Configured to provide responsible medical advice
- **Markdown Support**: Formats responses with proper styling
- **CORS Enabled**: Allows frontend communication
## Run AI Backend

#### Install dependencies:
```bash
pip install flask flask-cors google-generativeai markdown2
```

#### Set up environment:
```bash
export GEMINI_API_KEY=your_google_gemini_api_key_here
# Or create .env file in project root
```

#### Run AI chatbot server:
```bash
python3 server/chatbot.py
```
Server runs on: http://localhost:5001

## AI Integration Details

**Google Gemini Configuration:**
- Model: `gemini-1.5-flash`
- Safety settings: Optimized for medical responses
- System instructions: Specialized health assistant prompts
- Context preservation: Maintains conversation history

**API Endpoints:**
- `POST /api/chat` - Send message to AI chatbot
- Response includes formatted HTML for rich text display
# Development Mode

## Terminal 1 - AI Backend
```bash
source venv/bin/activate
export GEMINI_API_KEY=your_api_key_here
python3 server/chatbot.py
```
AI Backend → http://localhost:5001

## Terminal 2 - React Frontend
```bash
npm run dev
```
Frontend → http://localhost:5000
<br>
Patient Portal (AI Chat) → http://localhost:5000/patient
<br>
API calls are proxied from frontend to AI backend.

# Production Mode 
```bash
# Build frontend
npm run build

# Set environment and run AI backend
export GEMINI_API_KEY=your_api_key_here
python3 server/chatbot.py

# Frontend served via production build
```

## Features
- 🤖 **AI Health Assistant** - Intelligent symptom checking and health guidance
- 💬 **Real-time Chat** - Instant responses with context awareness  
- 🎨 **Modern UI** - shadcn/ui components with auto-scroll and loading states
- 📱 **Mobile Optimized** - Responsive design for all devices
- 🔒 **Safe AI** - Responsible medical advice with safety filters