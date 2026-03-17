import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from config import FRONTEND_URL
from database import create_indexes
from routes_auth import router as auth_router
from routes_comments import router as comments_router
from routes_likes import router as likes_router
from routes_contact import router as contact_router

IS_VERCEL = os.getenv("VERCEL", "") == "1"


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_indexes()
    yield


app = FastAPI(
    title="Portfolio API",
    version="1.0.0",
    lifespan=None if IS_VERCEL else lifespan,
)

# CORS — allow frontend origins
allowed_origins = [
    "http://localhost:5173",
    "http://localhost:4173",
]
if FRONTEND_URL:
    allowed_origins.append(FRONTEND_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth_router, prefix="/api")
app.include_router(comments_router, prefix="/api")
app.include_router(likes_router, prefix="/api")
app.include_router(contact_router, prefix="/api")


@app.get("/api/health")
async def health():
    return {"status": "ok"}
