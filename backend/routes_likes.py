from datetime import datetime, timezone
from fastapi import APIRouter, Depends
from bson import ObjectId
from database import likes_collection
from auth import get_current_user, get_optional_user

router = APIRouter(prefix="/likes", tags=["Likes"])


@router.get("/{blog_id}")
async def get_likes(blog_id: int, user=Depends(get_optional_user)):
    """Get like count for a blog post and whether current user liked it."""
    count = await likes_collection.count_documents({"blog_id": blog_id})
    liked = False
    if user:
        existing = await likes_collection.find_one(
            {"blog_id": blog_id, "user_id": user["_id"]}
        )
        liked = existing is not None
    return {"blog_id": blog_id, "count": count, "liked": liked}


@router.post("/{blog_id}/toggle")
async def toggle_like(blog_id: int, user=Depends(get_current_user)):
    """Toggle like on a blog post. Like if not liked, unlike if already liked."""
    existing = await likes_collection.find_one(
        {"blog_id": blog_id, "user_id": user["_id"]}
    )

    if existing:
        await likes_collection.delete_one({"_id": existing["_id"]})
    else:
        await likes_collection.insert_one(
            {
                "blog_id": blog_id,
                "user_id": user["_id"],
                "created_at": datetime.now(timezone.utc),
            }
        )

    count = await likes_collection.count_documents({"blog_id": blog_id})
    return {"blog_id": blog_id, "count": count, "liked": not bool(existing)}


@router.get("/batch/counts")
async def get_batch_likes(user=Depends(get_optional_user)):
    """Get like counts for all blog posts and which ones the current user liked."""
    pipeline = [
        {"$group": {"_id": "$blog_id", "count": {"$sum": 1}}},
    ]
    cursor = likes_collection.aggregate(pipeline)
    results = await cursor.to_list(length=100)

    counts = {r["_id"]: r["count"] for r in results}

    user_likes = set()
    if user:
        user_cursor = likes_collection.find(
            {"user_id": user["_id"]}, {"blog_id": 1}
        )
        user_liked = await user_cursor.to_list(length=100)
        user_likes = {doc["blog_id"] for doc in user_liked}

    return {"counts": counts, "user_likes": list(user_likes)}
