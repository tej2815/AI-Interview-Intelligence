from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.resume_routes import router as resume_router
from app.routes.jd_routes import router as jd_router
from app.routes.ai_routes import router as ai_router

app = FastAPI()

from app.database.models import Base
from app.database.session import engine

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume_router)
app.include_router(jd_router)
app.include_router(ai_router)

@app.get("/")
def home():
    return {
        "message": "AI Interview Intelligence Platform Running"
    }