// AI health assistant: Google Gemini when GEMINI_API_KEY is set,
// otherwise a rule-based fallback so the demo works with zero config.

const SYSTEM_PROMPT = `You are the AI Health Assistant for NabhaSeva, a telemedicine platform serving rural communities around Nabha, Punjab, India.

Your role:
- Help with symptoms, medicine questions, health tips, exercise advice and mental well-being.
- Ask clarifying questions (duration, severity, associated symptoms) before suggesting next steps.
- Give practical advice suited to a rural Indian context, using simple, clear language.
- Always recommend consulting a doctor for anything serious, and calling 108 for emergencies.
- You are a guide, not a replacement for professional medical care. Never prescribe medication.
- Keep answers short (under 150 words) and use markdown lists where helpful.`;

export interface ChatTurn {
  role: "user" | "ai";
  text: string;
}

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

export async function chatWithAssistant(message: string, history: ChatTurn[]): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return fallbackReply(message);

  const contents = [
    ...history.slice(-10).map((turn) => ({
      role: turn.role === "user" ? "user" : "model",
      parts: [{ text: String(turn.text).slice(0, 2000) }],
    })),
    { role: "user", parts: [{ text: message.slice(0, 2000) }] },
  ];

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Gemini API ${response.status}: ${detail.slice(0, 300)}`);
  }

  const data = (await response.json()) as any;
  const text = data?.candidates?.[0]?.content?.parts
    ?.map((p: any) => p.text ?? "")
    .join("")
    .trim();
  if (!text) throw new Error("Gemini returned an empty response");
  return text;
}

// Keyword-based responder used when no API key is configured (demo mode).
function fallbackReply(message: string): string {
  const m = message.toLowerCase();
  const disclaimer = "\n\n*I'm running in demo mode without an AI backend. For real guidance, please consult a doctor.*";

  if (/(emergency|chest pain|breath|unconscious|bleeding heavily)/.test(m))
    return "**This could be an emergency.** Please call **108** immediately or go to the nearest hospital. Do not wait." + disclaimer;
  if (/(fever|headache|cold|cough|flu)/.test(m))
    return "For fever or headache:\n\n- Rest and drink plenty of fluids (water, ORS, soups)\n- Monitor your temperature every few hours\n- A cool compress on the forehead can help\n\nIf the fever lasts more than 2 days, is above 103°F, or comes with a stiff neck or rash, please **book a consultation with a doctor**." + disclaimer;
  if (/(medicine|tablet|paracetamol|dose|drug)/.test(m))
    return "I can share general information, but **only your doctor or pharmacist should advise on medicines and doses**. Always:\n\n- Follow the prescribed dose and timing\n- Tell your doctor about other medicines you take\n- Never share prescription medicines with others" + disclaimer;
  if (/(exercise|fitness|walk|yoga)/.test(m))
    return "Good ways to start exercising:\n\n- **Walking** 30 minutes daily is excellent for beginners\n- Simple stretching or yoga in the morning\n- Start slowly and increase gradually\n- Stop if you feel pain, dizziness or chest discomfort" + disclaimer;
  if (/(diet|food|nutrition|eat)/.test(m))
    return "Simple healthy-eating tips:\n\n- Eat plenty of seasonal vegetables, dal and whole grains\n- Limit fried food, sugar and packaged snacks\n- Drink clean water — 6 to 8 glasses a day\n- Don't skip meals, especially breakfast" + disclaimer;
  if (/(stress|anxiety|sad|depress|sleep)/.test(m))
    return "Your mental health matters. Some things that can help:\n\n- Talk to someone you trust about how you feel\n- Keep a regular sleep schedule\n- Deep breathing: inhale 4s, hold 4s, exhale 4s\n\nIf these feelings persist, please speak with a doctor — support is available and it works." + disclaimer;

  return "Hello! I'm the NabhaSeva health assistant. I can help with:\n\n- **Symptoms** — describe what you're feeling\n- **Medicines** — general information and safety\n- **Health tips** — diet, exercise, daily wellness\n- **Mental well-being** — stress and sleep\n\nWhat would you like to know?" + disclaimer;
}
