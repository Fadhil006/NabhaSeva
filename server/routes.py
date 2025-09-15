from fastapi import APIRouter, HTTPException
from schemas import InsertUser, UserResponse
from storage import storage

router = APIRouter(prefix="/api")

@router.post("/users", response_model=UserResponse)
async def create_user(user: InsertUser):
    existing = await storage.get_user_by_username(user.username)
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    return await storage.create_user(user)

@router.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: str):
    user = await storage.get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/users/by-username/{username}", response_model=UserResponse)
async def get_user_by_username(username: str):
    user = await storage.get_user_by_username(username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
