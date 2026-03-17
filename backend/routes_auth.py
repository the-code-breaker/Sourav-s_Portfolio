import random
from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, status
from bson import ObjectId
from database import users_collection
from models import UserSignup, UserLogin, UserResponse, TokenResponse
from auth import hash_password, verify_password, create_access_token
from config import ADMIN_EMAIL

router = APIRouter(prefix="/auth", tags=["Authentication"])

AVATAR_COLORS = [
    "#915EFF", "#00cea8", "#bf61ff", "#61dafb", "#f59e0b",
    "#ec4899", "#10b981", "#6366f1", "#f43f5e", "#14b8a6",
]


def user_to_response(user: dict) -> UserResponse:
    return UserResponse(
        id=str(user["_id"]),
        name=user["name"],
        email=user["email"],
        avatar_color=user.get("avatar_color", "#915EFF"),
        created_at=user["created_at"],
        is_admin=user["email"] == ADMIN_EMAIL,
    )


@router.post("/signup", response_model=TokenResponse, status_code=201)
async def signup(data: UserSignup):
    existing = await users_collection.find_one({"email": data.email.lower()})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists",
        )

    user_doc = {
        "name": data.name.strip(),
        "email": data.email.lower(),
        "password_hash": hash_password(data.password),
        "avatar_color": random.choice(AVATAR_COLORS),
        "created_at": datetime.now(timezone.utc),
    }

    result = await users_collection.insert_one(user_doc)
    user_doc["_id"] = result.inserted_id

    token = create_access_token(str(result.inserted_id))

    return TokenResponse(
        access_token=token,
        user=user_to_response(user_doc),
    )


@router.post("/login", response_model=TokenResponse)
async def login(data: UserLogin):
    user = await users_collection.find_one({"email": data.email.lower()})
    if not user or not verify_password(data.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token = create_access_token(str(user["_id"]))

    return TokenResponse(
        access_token=token,
        user=user_to_response(user),
    )


from auth import get_current_user
from fastapi import Depends


@router.get("/me", response_model=UserResponse)
async def get_current_profile(user: dict = Depends(get_current_user)):
    return user_to_response(user)
