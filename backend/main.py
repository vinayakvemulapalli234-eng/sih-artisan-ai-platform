from fastapi import FastAPI, Depends
from database import Base, engine
import models
from auth.routes import router as auth_router
from products.routes import router as products_router
from orders.routes import router as orders_router
from pricing.routes import router as pricing_router
from middleware.auth_middleware import get_current_user

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(products_router, prefix="/products", tags=["products"])
app.include_router(orders_router, prefix="/orders", tags=["orders"])
app.include_router(pricing_router, prefix="/pricing", tags=["pricing"])

@app.get("/")
def root():
    return {"message": "Backend running"}