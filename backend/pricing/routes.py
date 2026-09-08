from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Product
from pydantic import BaseModel

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class PriceUpdate(BaseModel):
    dynamic_price: float

@router.put("/{product_id}")
def update_dynamic_price(product_id: int, price_update: PriceUpdate, db: Session = Depends(get_db)):
    """
    Group 3's Dynamic Pricing Assistant calls this endpoint 
    to update a product's AI-calculated price.
    """
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product.dynamic_price = price_update.dynamic_price
    db.commit()
    db.refresh(product)
    return {"message": "Dynamic price updated", "product_id": product.id, "new_price": product.dynamic_price}