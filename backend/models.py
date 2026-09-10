from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    email = Column(String, unique=True, index=True, nullable=True)
    phone = Column(String, unique=True, index=True, nullable=True)
    
    hashed_password = Column(String, nullable=False)

    preferred_language = Column(String, default="en")

    products = relationship("Product", back_populates="owner")
    orders = relationship("Order", back_populates="buyer")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    category = Column(String)
    base_price = Column(Float, nullable=False)
    dynamic_price = Column(Float, nullable=True)
    image_url = Column(String, nullable=True)
    language = Column(String, default="en")
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="products")
    @property
    def owner_name(self):
        return self.owner.name if self.owner else None
    orders = relationship("Order", back_populates="product")


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    buyer_id = Column(Integer, ForeignKey("users.id"))
    quantity = Column(Integer, default=1)
    total_price = Column(Float, nullable=False)
    status = Column(
        String,
        default="pending"
    )  # pending, confirmed, shipped, delivered, cancelled
    created_at = Column(DateTime, default=datetime.utcnow)

    product = relationship("Product", back_populates="orders")
    buyer = relationship("User", back_populates="orders")