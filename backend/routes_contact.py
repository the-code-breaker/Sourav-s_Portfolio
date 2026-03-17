from datetime import datetime, timezone
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId

from database import contacts_collection
from models import ContactCreate, ContactResponse
from auth import get_admin_user

router = APIRouter(prefix="/contact", tags=["Contact"])


def contact_to_response(c: dict) -> ContactResponse:
    return ContactResponse(
        id=str(c["_id"]),
        name=c["name"],
        email=c["email"],
        message=c["message"],
        created_at=c["created_at"],
        read=c.get("read", False),
    )


@router.post("/", response_model=ContactResponse, status_code=201)
async def submit_contact(data: ContactCreate):
    """Public endpoint — anyone can submit a contact message."""
    doc = {
        "name": data.name.strip(),
        "email": data.email.lower(),
        "message": data.message.strip(),
        "created_at": datetime.now(timezone.utc),
        "read": False,
    }
    result = await contacts_collection.insert_one(doc)
    doc["_id"] = result.inserted_id
    return contact_to_response(doc)


@router.get("/", response_model=List[ContactResponse])
async def get_contacts(user=Depends(get_admin_user)):
    """Admin-only — list all contact submissions."""
    cursor = contacts_collection.find().sort("created_at", -1)
    contacts = await cursor.to_list(length=500)
    return [contact_to_response(c) for c in contacts]


@router.put("/{contact_id}/read")
async def mark_read(contact_id: str, user=Depends(get_admin_user)):
    """Admin-only — mark a contact as read."""
    result = await contacts_collection.update_one(
        {"_id": ObjectId(contact_id)}, {"$set": {"read": True}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"status": "ok"}


@router.delete("/{contact_id}", status_code=204)
async def delete_contact(contact_id: str, user=Depends(get_admin_user)):
    """Admin-only — delete a contact submission."""
    result = await contacts_collection.delete_one({"_id": ObjectId(contact_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
