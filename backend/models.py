from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


# ── Auth Models ──────────────────────────────────────────────
class UserSignup(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=128)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    avatar_color: str
    created_at: datetime
    is_admin: bool = False


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


# ── Comment Models ───────────────────────────────────────────
class CommentCreate(BaseModel):
    blog_id: int
    content: str = Field(..., min_length=1, max_length=2000)
    parent_id: Optional[str] = None


class CommentResponse(BaseModel):
    id: str
    blog_id: int
    content: str
    user_id: str
    user_name: str
    user_email: str
    avatar_color: str
    parent_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime


# ── Contact Models ───────────────────────────────────────────
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=5000)


class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    message: str
    created_at: datetime
    read: bool = False


class CommentUpdate(BaseModel):
    content: str = Field(..., min_length=1, max_length=2000)
