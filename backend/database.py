from motor.motor_asyncio import AsyncIOMotorClient
from config import MONGODB_URL, DATABASE_NAME

client = AsyncIOMotorClient(MONGODB_URL)
db = client[DATABASE_NAME]

# Collections
users_collection = db["users"]
comments_collection = db["comments"]
likes_collection = db["likes"]
contacts_collection = db["contacts"]


async def create_indexes():
    """Create database indexes on startup."""
    await users_collection.create_index("email", unique=True)
    await comments_collection.create_index("blog_id")
    await comments_collection.create_index("created_at")
    await likes_collection.create_index([("blog_id", 1), ("user_id", 1)], unique=True)
    await likes_collection.create_index("blog_id")
    await contacts_collection.create_index("created_at")
