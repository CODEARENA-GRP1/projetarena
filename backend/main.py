from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.context import CryptContext
from pydantic import BaseModel
from datetime import datetime, timedelta
from pymongo import MongoClient
import uuid

# ---------------------------
# CONFIG JWT & SECURITÉ
# ---------------------------
SECRET_KEY = "secret-key-codearena"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# ---------------------------
# CONNEXION MONGODB
# ---------------------------
client = MongoClient("mongodb://omar:12345@mongodb:27017/?authSource=admin")
db = client["codearena"]
users_collection = db["users"]
blacklist_collection = db["blacklist_tokens"]  # pour stocker les tokens invalidés

# ---------------------------
# FASTAPI
# ---------------------------
app = FastAPI(title="CodeArena Auth API")

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="CodeArena Auth API")

# ⭐ Autoriser ton frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # ton frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/test-mongo")
def test_mongo():
    try:
        count = users_collection.count_documents({})
        return {"mongo": "ok", "users_count": count}
    except Exception as e:
        return {"mongo": "error", "details": str(e)}


# ---------------------------
# MODELES
# ---------------------------
class User(BaseModel):
    username: str
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# ---------------------------
# FONCTIONS UTILES
# ---------------------------
def get_password_hash(password: str):
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str):
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict, expires_delta=None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token_blacklist(token: str):
    return blacklist_collection.find_one({"token": token}) is not None

# ---------------------------
# ROUTES
# ---------------------------
@app.post("/register")
def register(user: User):
    if users_collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username already exists")

    verification_token = str(uuid.uuid4())
    hashed_password = get_password_hash(user.password)

    users_collection.insert_one({
        "username": user.username,
        "email": user.email,
        "password": hashed_password,
        "is_verified": False,
        "verification_token": verification_token
    })

    # 🔹 Pour tester, renvoie le token au lieu d'envoyer un mail
    return {"msg": "User registered successfully", "verification_token": verification_token}

@app.get("/verify-email")
def verify_email(token: str):
    user = users_collection.find_one({"verification_token": token})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    users_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {"is_verified": True}, "$unset": {"verification_token": ""}}
    )
    return {"msg": "Email verified successfully"}

@app.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users_collection.find_one({"username": form_data.username})
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    if not user.get("is_verified", False):
        raise HTTPException(status_code=401, detail="Email not verified")

    if not verify_password(form_data.password, user["password"]):
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    access_token = create_access_token(
        data={"sub": user["username"]},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/logout")
def logout(token: str = Depends(oauth2_scheme)):
    # Ajouter le token à la blacklist pour qu'il soit invalide
    if verify_token_blacklist(token):
        raise HTTPException(status_code=400, detail="Token already invalidated")

    blacklist_collection.insert_one({"token": token, "blacklisted_at": datetime.utcnow()})
    return {"msg": "User logged out successfully"}

# ---------------------------
# Exemple route sécurisée
# ---------------------------
@app.get("/protected")
def protected_route(token: str = Depends(oauth2_scheme)):
    if verify_token_blacklist(token):
        raise HTTPException(status_code=401, detail="Token is invalidated")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"msg": f"Hello {username}, you accessed a protected route!"}
