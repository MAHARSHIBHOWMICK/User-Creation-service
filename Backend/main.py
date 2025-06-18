from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, User

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Request schemas
class UserSchema(BaseModel):
    email: str
    first_name: str
    last_name: str
    password: str

class UpdateUserSchema(BaseModel):
    email: str
    first_name: str
    last_name: str
    password: str

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get all users
@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()
# Create new user
@app.post("/users")
def create_user(user: UserSchema, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="User with this email already exists")
    new_user = User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
# Delete user by id
@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}
# Update user by id
@app.put("/users/{user_id}")
def update_user(user_id: int, updated_user: UpdateUserSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if new email already exists on another user
    if updated_user.email != user.email:
        if db.query(User).filter(User.email == updated_user.email).first():
            raise HTTPException(status_code=400, detail="Email already in use")

    user.email = updated_user.email
    user.first_name = updated_user.first_name
    user.last_name = updated_user.last_name
    user.password = updated_user.password
    db.commit()
    db.refresh(user)
    return user