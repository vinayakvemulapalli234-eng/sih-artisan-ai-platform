from fastapi import FastAPI,Depends
from database import Base, engine
import models
from auth.routes import router as auth_router
from middleware.auth_middleware import get_current_user

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(auth_router, prefix="/auth", tags=["auth"])

@app.get("/")
def root():
    return {"message": "Backend running"}
@app.get("/protected")
def protected_route(current_user: str = Depends(get_current_user)):
    return {"message": f"Hello {current_user}, you are authenticated!"}