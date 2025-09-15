from pydantic import BaseModel

class InsertUser(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: str
    username: str
    password: str
