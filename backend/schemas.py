from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str


class ProductCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    base_price: float
    image_url: Optional[str] = None
    language: Optional[str] = "en"

class ProductResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    category: Optional[str]
    base_price: float
    dynamic_price: Optional[float]
    image_url: Optional[str]
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class OrderCreate(BaseModel):
    product_id: int
    quantity: int = 1

class OrderResponse(BaseModel):
    id: int
    product_id: int
    buyer_id: int
    quantity: int
    total_price: float
    status: str
    created_at: datetime

    class Config:
        from_attributes = True