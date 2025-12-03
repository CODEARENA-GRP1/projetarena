from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import timedelta, datetime

from ..models.user_models import User, Token

from app.utils.db import users_collection, blacklist_collection
from app.core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    verify_token_blacklist,
    SECRET_KEY,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

import uuid

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


@router.get("/test-mongo")
def test_mongo():
    try:
        count = users_collection.count_documents({})
        return {"mongo": "ok", "users_count": count}
    except Exception as e:
        return {"mongo": "error", "details": str(e)}


# REGISTER
@router.post("/register")
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

    return {"msg": "User registered successfully", "verification_token": verification_token}


# VERIFY EMAIL
@router.get("/verify-email")
def verify_email(token: str):
    user = users_collection.find_one({"verification_token": token})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    users_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {"is_verified": True}, "$unset": {"verification_token": ""}}
    )
    return {"msg": "Email verified successfully"}


# LOGIN
@router.post("/login", response_model=Token)
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


# LOGOUT
@router.post("/logout")
def logout(token: str = Depends(oauth2_scheme)):
    if verify_token_blacklist(token):
        raise HTTPException(status_code=400, detail="Token already invalidated")

    blacklist_collection.insert_one({"token": token, "blacklisted_at": datetime.utcnow()})
    return {"msg": "User logged out successfully"}


# PROTECTED ROUTE
@router.get("/protected")
def protected_route(token: str = Depends(oauth2_scheme)):
    if verify_token_blacklist(token):
        raise HTTPException(status_code=401, detail="Token invalidated")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    return {"msg": f"Hello {username}, you accessed a protected route!"}
