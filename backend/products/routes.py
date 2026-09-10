from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Product, User
from schemas import ProductCreate, ProductResponse
from middleware.auth_middleware import get_current_user
from typing import List

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_owner(current_user: str, db: Session):
    owner = db.query(User).filter(
        (User.email == current_user) | (User.phone == current_user)
    ).first()
    if not owner:
        raise HTTPException(status_code=401, detail="User not found")
    return owner

@router.post("/", response_model=ProductResponse)
def create_product(product: ProductCreate, db: Session = Depends(get_db),
                    current_user: str = Depends(get_current_user)):
    owner = get_owner(current_user, db)
    new_product = Product(**product.dict(), owner_id=owner.id)
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@router.get("/mine", response_model=List[ProductResponse])
def list_my_products(db: Session = Depends(get_db),
                      current_user: str = Depends(get_current_user)):
    owner = get_owner(current_user, db)
    return db.query(Product).filter(Product.owner_id == owner.id).all()

@router.get("/", response_model=List[ProductResponse])
def list_products(db: Session = Depends(get_db)):
    return db.query(Product).all()

@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.put("/{product_id}", response_model=ProductResponse)
def update_product(product_id: int, updated: ProductCreate, db: Session = Depends(get_db),
                    current_user: str = Depends(get_current_user)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    for key, value in updated.dict().items():
        setattr(product, key, value)
    db.commit()
    db.refresh(product)
    return product

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db),
                    current_user: str = Depends(get_current_user)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"message": "Product deleted"}
@router.get("/sellers/list")
def list_sellers(db: Session = Depends(get_db)):
    sellers = (
        db.query(User)
        .join(Product, Product.owner_id == User.id)
        .distinct()
        .all()
    )
    return [
        {
            "id": s.id,
            "name": s.name,
            "phone": s.phone,
            "email": s.email,
        }
        for s in sellers
    ]