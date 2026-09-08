from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from database import SessionLocal
from models import User
from schemas import UserCreate, UserLogin
from auth.utils import hash_password, verify_password, create_access_token

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    if not user.email and not user.phone:
        raise HTTPException(
            status_code=400,
            detail="Email or phone number is required"
        )

    if user.email and user.phone:
        raise HTTPException(
            status_code=400,
            detail="Provide either email or phone, not both"
        )

    if user.email:
        existing_user = db.query(User).filter(
            User.email == user.email
        ).first()
    else:
        existing_user = db.query(User).filter(
            User.phone == user.phone
        ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email or phone number already registered"
        )

    hashed_password = hash_password(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        phone=user.phone,
        hashed_password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    if not user.email and not user.phone:
        raise HTTPException(
            status_code=400,
            detail="Email or phone number is required"
        )

    if user.email and user.phone:
        raise HTTPException(
            status_code=400,
            detail="Provide either email or phone, not both"
        )

    if user.email:
        db_user = db.query(User).filter(
            User.email == user.email
        ).first()
    else:
        db_user = db.query(User).filter(
            User.phone == user.phone
        ).first()

    if not db_user or not verify_password(
        user.password,
        db_user.hashed_password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token({
        "sub": db_user.email or db_user.phone
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }


@router.post("/token")
def token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    identifier = form_data.username

    db_user = db.query(User).filter(
        (User.email == identifier) |
        (User.phone == identifier)
    ).first()

    if not db_user or not verify_password(
        form_data.password,
        db_user.hashed_password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    access_token = create_access_token({
        "sub": db_user.email or db_user.phone
    })

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }