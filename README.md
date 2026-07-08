# NabhaSeva — Telemedicine for Rural Healthcare

A telemedicine platform for the 173 villages served by Nabha's Civil Hospital (Punjab, India), where 11 doctors cover 23 sanctioned posts. Built for Smart India Hackathon problem statement **SIH 25018**.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Express](https://img.shields.io/badge/Express-4-lightgrey)
![Vite](https://img.shields.io/badge/Vite-5-purple)

## Features

- **Patient portal** — book video consultations with a calendar + time-slot picker, browse doctors by specialty, view health records and prescriptions, order medicines
- **AI Health Assistant** — chat interface backed by Google Gemini with a rule-based fallback, so the demo works even without an API key; replies rendered with an XSS-safe markdown renderer
- **Doctor dashboard** — today's schedule, live consultation queue, urgent-case flags, e-prescription writer
- **Admin console** — platform stats, doctor registry with search and status management
- **Responsive UI** — shadcn/ui + Tailwind; app-like bottom navigation on mobile, full layouts on desktop

## Architecture

```
client/   React 18 + Vite + Tailwind + shadcn/ui (wouter routing, TanStack Query)
server/   Express (TypeScript) — serves the built client and /api
  assistant.ts   Gemini REST integration + zero-config fallback responder
shared/   Drizzle schema shared between client and server
```

One process serves everything: in development, Vite runs as Express middleware with HMR; in production, Express serves the static build and the API from a single port.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5000
```

Optional — enable real AI responses:

```bash
cp .env.example .env   # add your GEMINI_API_KEY (aistudio.google.com)
```

Without a key the assistant runs in demo mode with rule-based answers.

**Demo accounts:** `patient@demo.com` / `patient123` · `doctor@demo.com` / `doctor123` · `admin@demo.com` / `admin123` (or use the one-click demo buttons on the login page).

## Production

```bash
npm run build      # bundles client (Vite) and server (esbuild) into dist/
npm start          # serves everything on $PORT (default 5000)
```

### Deploy (Render, free tier)

The repo includes `render.yaml` — create a new **Blueprint** on [render.com](https://render.com), point it at this repo, and set `GEMINI_API_KEY` in the dashboard. Any Node host works the same way (Railway, Fly.io): build with `npm run build`, start with `npm start`.

## Configuration

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Server port |
| `GEMINI_API_KEY` | _(unset)_ | Google Gemini key; without it the assistant uses the built-in fallback |
| `GEMINI_MODEL` | `gemini-2.0-flash` | Gemini model for the assistant |

## License

MIT
