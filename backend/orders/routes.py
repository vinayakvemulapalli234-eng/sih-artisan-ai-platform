from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Order, Product, User
from schemas import OrderCreate, OrderResponse
from middleware.auth_middleware import get_current_user
from typing import List

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=OrderResponse)
def create_order(order: OrderCreate, db: Session = Depends(get_db),
                  current_user: str = Depends(get_current_user)):
    buyer = db.query(User).filter(User.email == current_user).first()
    product = db.query(Product).filter(Product.id == order.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    price_to_use = product.dynamic_price or product.base_price
    total = price_to_use * order.quantity

    new_order = Order(
        product_id=product.id,
        buyer_id=buyer.id,
        quantity=order.quantity,
        total_price=total
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order

@router.get("/", response_model=List[OrderResponse])
def list_my_orders(db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    buyer = db.query(User).filter(User.email == current_user).first()
    return db.query(Order).filter(Order.buyer_id == buyer.id).all()