import uuid
from typing import Optional, Dict
from schemas import InsertUser, UserResponse

class MemStorage:
    def __init__(self):
        self.users: Dict[str, UserResponse] = {}

    async def get_user(self, user_id: str) -> Optional[UserResponse]:
        return self.users.get(user_id)

    async def get_user_by_username(self, username: str) -> Optional[UserResponse]:
        for user in self.users.values():
            if user.username == username:
                return user
        return None

    async def create_user(self, insert_user: InsertUser) -> UserResponse:
        user_id = str(uuid.uuid4())
        user = UserResponse(id=user_id, **insert_user.dict())
        self.users[user_id] = user
        return user

# singleton instance
storage = MemStorage()
