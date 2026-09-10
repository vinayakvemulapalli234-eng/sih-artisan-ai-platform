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

def get_db_user(current_user: str, db: Session):
    user = db.query(User).filter(
        (User.email == current_user) | (User.phone == current_user)
    ).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

@router.post("/", response_model=OrderResponse)
def create_order(order: OrderCreate, db: Session = Depends(get_db),
                  current_user: str = Depends(get_current_user)):
    buyer = get_db_user(current_user, db)
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
    buyer = get_db_user(current_user, db)
    return db.query(Order).filter(Order.buyer_id == buyer.id).all()

@router.get("/my-stats")
def my_seller_stats(db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    seller = get_db_user(current_user, db)
    orders = (
        db.query(Order)
        .join(Product, Order.product_id == Product.id)
        .filter(Product.owner_id == seller.id)
        .all()
    )
    total_revenue = sum(o.total_price for o in orders)
    items_sold = sum(o.quantity for o in orders)
    return {
        "total_revenue": total_revenue,
        "items_sold": items_sold,
    }


@router.get("/incoming")
def list_incoming_orders(db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    seller = get_db_user(current_user, db)
    orders = (
        db.query(Order)
        .join(Product, Order.product_id == Product.id)
        .filter(Product.owner_id == seller.id)
        .all()
    )
    result = []
    for o in orders:
        buyer = db.query(User).filter(User.id == o.buyer_id).first()
        product = db.query(Product).filter(Product.id == o.product_id).first()
        result.append({
            "id": o.id,
            "product_id": o.product_id,
            "product_title": product.title if product else None,
            "product_image": product.image_url if product else None,
            "buyer_name": buyer.name if buyer else "Customer",
            "quantity": o.quantity,
            "total_price": o.total_price,
            "status": o.status,
            "created_at": o.created_at,
        })
    return result
VALID_STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"]

@router.put("/{order_id}/status")
def update_order_status(
    order_id: int,
    new_status: str,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    if new_status not in VALID_STATUSES:
        raise HTTPException(status_code=400, detail="Invalid status")

    seller = get_db_user(current_user, db)
    order = (
        db.query(Order)
        .join(Product, Order.product_id == Product.id)
        .filter(Order.id == order_id, Product.owner_id == seller.id)
        .first()
    )
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.status = new_status
    db.commit()
    db.refresh(order)
    return {"id": order.id, "status": order.status}