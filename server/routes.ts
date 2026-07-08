import type { Express } from "express";
import { createServer, type Server } from "http";
import { chatWithAssistant } from "./assistant";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", ai: Boolean(process.env.GEMINI_API_KEY) });
  });

  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body ?? {};
    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "No message provided" });
    }
    try {
      const reply = await chatWithAssistant(message.trim(), Array.isArray(history) ? history : []);
      res.json({ reply });
    } catch (err) {
      console.error("chat error:", err);
      res.status(502).json({ error: "The assistant is unavailable right now. Please try again." });
    }
  });

  return createServer(app);
}
