from sqlalchemy import create_engine
from app.database.models import Base
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

print("DATABASE_URL:", DATABASE_URL)

engine = create_engine(DATABASE_URL)

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")