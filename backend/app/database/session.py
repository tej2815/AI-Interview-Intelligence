from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("postgresql://neondb_owner:npg_npdfl13UIrwv@ep-snowy-union-atmykfq7-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require")

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)