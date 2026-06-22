from fastapi import APIRouter
from pydantic import BaseModel

from app.services.skill_service import extract_skills
from app.services.comparison_service import find_missing_skills
from app.services.scoring_service import calculate_match_score

from app.database.session import SessionLocal
from app.database.query_repository import get_latest_resume

router = APIRouter()


class JDRequest(BaseModel):
    job_description: str


@router.post("/analyze-jd")
async def analyze_jd(data: JDRequest):

    db = SessionLocal()

    latest_resume = get_latest_resume(db)

    resume_skills = []

    if latest_resume and latest_resume.skills:
        resume_skills = latest_resume.skills.split(",")

    jd_skills = extract_skills(data.job_description)

    missing_skills = find_missing_skills(
        resume_skills,
        jd_skills
    )

    match_score = calculate_match_score(
        resume_skills,
        jd_skills
    )

    db.close()

    return {
        "match_score": match_score,
        "resume_skills": resume_skills,
        "jd_skills": jd_skills,
        "missing_skills": missing_skills
    }