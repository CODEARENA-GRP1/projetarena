from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth_routes import router as AuthRouter
from app.routes.challenge_routes import router as ChallengeRouter

app = FastAPI(
    title="CodeArena Auth API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTES AUTH
app.include_router(AuthRouter, prefix="/auth")

# ROUTES CHALLENGES
app.include_router(ChallengeRouter, prefix="/challenges")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/")
def root():
    return {"message": "CodeArena Backend is running 🚀"}
