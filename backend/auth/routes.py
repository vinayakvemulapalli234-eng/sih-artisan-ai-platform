from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User
from schemas import UserCreate, UserLogin
from auth.utils import hash_password, verify_password, create_access_token
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def find_existing_user(db: Session, email: str | None, phone: str | None):
    query = db.query(User)
    if email:
        existing = query.filter(User.email == email).first()
        if existing:
            return existing
    if phone:
        existing = query.filter(User.phone == phone).first()
        if existing:
            return existing
    return None

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    if not user.email and not user.phone:
        raise HTTPException(status_code=400, detail="Email or phone is required")

    existing = find_existing_user(db, user.email, user.phone)
    if existing:
        raise HTTPException(status_code=400, detail="Account already exists")

    new_user = User(
        name=user.name,
        email=user.email,
        phone=user.phone,
        hashed_password=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    token = create_access_token({"sub": new_user.email or new_user.phone})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = find_existing_user(db, user.email, user.phone)
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": db_user.email or db_user.phone})
    return {
        "access_token": token,
        "token_type": "bearer",
        "name": db_user.name,
        "phone": db_user.phone,
        "email": db_user.email,
    }

@router.post("/token")
def token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    db_user = find_existing_user(db, form_data.username, form_data.username)
    if not db_user or not verify_password(form_data.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token({"sub": db_user.email or db_user.phone})
    return {"access_token": access_token, "token_type": "bearer"}