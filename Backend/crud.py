from sqlalchemy.orm import Session
from models import User
from pydantic import BaseModel

# Create User
def create_user(db: Session, user_data: BaseModel):
    user = User(**user_data.dict())
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

# Get All Users (not strictly needed here if you're using db.query directly)
def get_all_users(db: Session):
    return db.query(User).all()

# Get Single User by Email or ID
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

# Update User
def update_user(db: Session, email: str, update_data: dict):
    user = db.query(User).filter(User.email == email).first()
    if user:
        for key, value in update_data.items():
            setattr(user, key, value)
        db.commit()
        db.refresh(user)
    return user

# Delete User
def delete_user(db: Session, email: str):
    user = db.query(User).filter(User.email == email).first()
    if user:
        db.delete(user)
        db.commit()
    return user
