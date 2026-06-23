from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.resume_routes import router as resume_router
from app.routes.jd_routes import router as jd_router
from app.routes.ai_routes import router as ai_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://ai-interview-intelligence.vercel.app",
        "https://ai-interview-intelligence-7zm0fnqna-tej2815s-projects.vercel.app"
    ],
    allow_credentials=True,
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