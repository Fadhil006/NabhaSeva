from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import time, os
import uvicorn

from routes import router
from static import setup_static

app = FastAPI()

# --- logging middleware (like Express) ---
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.time()
    response = await call_next(request)
    duration = int((time.time() - start) * 1000)
    path = request.url.path
    log_line = f"{request.method} {path} {response.status_code} in {duration}ms"
    if len(log_line) > 80:
        log_line = log_line[:79] + "…"
    print(log_line)
    return response

# --- error handler ---
@app.exception_handler(Exception)
async def error_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": str(exc) or "Internal Server Error"}
    )

# --- register routes ---
app.include_router(router)

# --- static files (production only) ---
if os.getenv("ENV", "development") != "development":
    setup_static(app)

# --- run server ---
if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    uvicorn.run(app, host="0.0.0.0", port=port)
