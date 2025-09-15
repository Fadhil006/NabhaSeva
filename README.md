# NabhaSeva – Documentation
## Overview

NabhaSeva is a progressive web application designed for healthcare/pharmacy use.
It uses:

<> Frontend: React + Vite + TailwindCSS + shadcn/ui

<> Backend: Migrated from Node.js (Express) to Python (FastAPI)

<> Database: PostgreSQL (via Drizzle ORM originally, now SQLAlchemy/Pydantic)

The app is optimized for mobile display, works offline (PWA), and supports APIs for authentication and data storage.
## Project Structure
```
NabhaSeva/
├── client/              # React frontend (Vite-based)
│   ├── src/             # Main React source code
│   └── index.html       # Entry HTML file
│
├── shared/              # Shared schemas between frontend & backend
│   └── schemas.py       # Defines Pydantic models for request & response validation. These are not tied to the database. Example: UserCreate, UserResponse.
│   └── models.py        # Defines database models using an ORM (e.g., SQLAlchemy). These map directly to tables in the DB (users, patients, etc).
│
├── backend-node/        # (OLD) Express.js backend -> discontd.
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── vite.ts
│
├── backend-py/          # (NEW) FastAPI backend (converted)
│   ├── main.py          # Entry point
│   ├── routes.py        # API routes
│   └── storage.py       # In-memory / DB storage layer
│          
│
├── public/              # Static assets
├── dist/                # Production build output
│
├── package.json         # Frontend dependencies
├── vite.config.ts       # Vite config (React build + proxy to backend)
├── tailwind.config.ts   # Tailwind setup
├── drizzle.config.ts    # DB config (Node world)
├── requirements.txt     # Python backend deps
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

# Backend (Python – FastAPI)

We replaced Express.js (index.ts, routes.ts, storage.ts, vite.ts) with FastAPI equivalents:
### main.py
```python
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from routes import router as api_router
from static_handler import setup_static
import os

app = FastAPI()

# API routes
app.include_router(api_router, prefix="/api")

# Error handling
@app.middleware("http")
async def log_requests(request: Request, call_next):
    response = await call_next(request)
    print(f"{request.method} {request.url.path} -> {response.status_code}")
    return response

# Serve static frontend in production
if os.getenv("ENV") == "production":
    setup_static(app)

routes.py
from fastapi import APIRouter, HTTPException
from storage import storage
from schemas import UserCreate, User

router = APIRouter()

@router.post("/users", response_model=User)
async def create_user(user: UserCreate):
    return await storage.create_user(user)

@router.get("/users/{user_id}", response_model=User)
async def get_user(user_id: str):
    user = await storage.get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
```
### storage.py
```python
import uuid
from schemas import User, UserCreate

class MemStorage:
    def __init__(self):
        self.users = {}

    async def create_user(self, data: UserCreate) -> User:
        uid = str(uuid.uuid4())
        user = User(id=uid, **data.dict())
        self.users[uid] = user
        return user

    async def get_user(self, uid: str):
        return self.users.get(uid)

storage = MemStorage()
```
### schemas.py
```python 
from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

class User(UserCreate):
    id: str
```
## Run backend

#### Install deps:
```bash
pip install fastapi uvicorn
```
#### Run server:
```bash
uvicorn main:app --reload --port 5000
```
## Changes (Node → Python)

Express → FastAPI

index.ts → main.py

routes.ts → routes.py

storage.ts → storage.py

schema.ts → schemas.py

Drizzle ORM → Pydantic + (optional SQLAlchemy)

Vite middleware (vite.ts) removed → replaced with:

#### Dev: run Vite + FastAPI separately

#### Prod: serve built frontend via StaticFiles
<hr>  

# Dev Mode
## terminal 1
```bash
uvicorn main:app --reload --port 5000
```

## terminal 2
```bash
npm run dev
```
Frontend → http://localhost:5173
<br>
Backend → http://localhost:5000
<br>
API calls proxied.

# Production Mode 
```bash
npm run build
ENV=production uvicorn main:app --host 0.0.0.0 --port 5000
```