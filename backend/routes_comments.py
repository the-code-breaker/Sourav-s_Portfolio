from datetime import datetime, timezone
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from database import comments_collection, users_collection
from models import CommentCreate, CommentResponse, CommentUpdate
from auth import get_current_user
from config import ADMIN_EMAIL

router = APIRouter(prefix="/comments", tags=["Comments"])


def comment_to_response(comment: dict) -> CommentResponse:
    return CommentResponse(
        id=str(comment["_id"]),
        blog_id=comment["blog_id"],
        content=comment["content"],
        user_id=str(comment["user_id"]),
        user_name=comment["user_name"],
        user_email=comment["user_email"],
        avatar_color=comment.get("avatar_color", "#915EFF"),
        parent_id=str(comment["parent_id"]) if comment.get("parent_id") else None,
        created_at=comment["created_at"],
        updated_at=comment["updated_at"],
    )


@router.get("/{blog_id}", response_model=List[CommentResponse])
async def get_comments(blog_id: int):
    """Get all comments for a blog post, sorted newest first."""
    cursor = comments_collection.find({"blog_id": blog_id}).sort("created_at", -1)
    comments = await cursor.to_list(length=200)
    return [comment_to_response(c) for c in comments]


@router.post("/", response_model=CommentResponse, status_code=201)
async def create_comment(
    data: CommentCreate,
    user: dict = Depends(get_current_user),
):
    """Create a new comment (requires authentication)."""
    now = datetime.now(timezone.utc)

    comment_doc = {
        "blog_id": data.blog_id,
        "content": data.content.strip(),
        "user_id": user["_id"],
        "user_name": user["name"],
        "user_email": user["email"],
        "avatar_color": user.get("avatar_color", "#915EFF"),
        "parent_id": ObjectId(data.parent_id) if data.parent_id else None,
        "created_at": now,
        "updated_at": now,
    }

    result = await comments_collection.insert_one(comment_doc)
    comment_doc["_id"] = result.inserted_id

    return comment_to_response(comment_doc)


@router.put("/{comment_id}", response_model=CommentResponse)
async def update_comment(
    comment_id: str,
    data: CommentUpdate,
    user: dict = Depends(get_current_user),
):
    """Update own comment."""
    comment = await comments_collection.find_one({"_id": ObjectId(comment_id)})
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    if comment["user_id"] != user["_id"]:
        raise HTTPException(status_code=403, detail="You can only edit your own comments")

    now = datetime.now(timezone.utc)
    await comments_collection.update_one(
        {"_id": ObjectId(comment_id)},
        {"$set": {"content": data.content.strip(), "updated_at": now}},
    )

    comment["content"] = data.content.strip()
    comment["updated_at"] = now
    return comment_to_response(comment)


@router.delete("/{comment_id}", status_code=204)
async def delete_comment(
    comment_id: str,
    user: dict = Depends(get_current_user),
):
    """Delete own comment, or any comment if admin."""
    comment = await comments_collection.find_one({"_id": ObjectId(comment_id)})
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    is_admin = user["email"] == ADMIN_EMAIL
    if comment["user_id"] != user["_id"] and not is_admin:
        raise HTTPException(status_code=403, detail="You can only delete your own comments")

    await comments_collection.delete_one({"_id": ObjectId(comment_id)})
    # Also delete replies to this comment
    await comments_collection.delete_many({"parent_id": ObjectId(comment_id)})
