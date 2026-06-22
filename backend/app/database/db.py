from sqlalchemy import create_engine
from app.database.models import Base

DATABASE_URL = "postgresql://postgres:postgres123@localhost:5432/ai_interview_db"

engine = create_engine(DATABASE_URL)

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")