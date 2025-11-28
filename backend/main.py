from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth_routes import router as AuthRouter

# ----------------------------
# APP FASTAPI
# ----------------------------
app = FastAPI(
    title="CodeArena Auth API",
    version="1.0.0"
)

# ----------------------------
# CORS (autoriser ton frontend)
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# ROUTES (AUTH)
# ----------------------------
app.include_router(AuthRouter)

# ----------------------------
# ROUTES DE TEST
# ----------------------------
@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/")
def root():
    return {"message": "CodeArena Backend is running 🚀"}
