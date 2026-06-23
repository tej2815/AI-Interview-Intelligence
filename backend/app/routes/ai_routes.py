from fastapi import APIRouter
from pydantic import BaseModel

from app.database.session import SessionLocal
from app.database.query_repository import get_latest_resume

from app.services.skill_service import extract_skills
from app.services.comparison_service import find_missing_skills
from app.services.ai_service import generate_interview_questions
from app.services.evaluation_service import evaluate_answer
from app.services.roadmap_service import generate_roadmap

router = APIRouter()


class QuestionRequest(BaseModel):
    job_description: str


class EvaluationRequest(BaseModel):
    question: str
    answer: str


@router.post("/generate-questions")
async def generate_questions(data: QuestionRequest):

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

    questions = generate_interview_questions(
        resume_skills,
        jd_skills,
        missing_skills
    )

    db.close()

    return {
        "resume_skills": resume_skills,
        "jd_skills": jd_skills,
        "missing_skills": missing_skills,
        "questions": questions
    }


@router.post("/evaluate-answer")
async def evaluate_candidate_answer(data: EvaluationRequest):

    evaluation = evaluate_answer(
        data.question,
        data.answer
    )

    return {
        "evaluation": evaluation
    }
@router.post("/generate-roadmap")
async def roadmap(data: QuestionRequest):

    db = SessionLocal()

    latest_resume = get_latest_resume(db)

    resume_skills = []

    if latest_resume and latest_resume.skills:
        resume_skills = latest_resume.skills.split(",")

    jd_skills = extract_skills(
        data.job_description
    )

    missing_skills = find_missing_skills(
        resume_skills,
        jd_skills
    )

    roadmap = generate_roadmap(
        missing_skills
    )

    db.close()

    return {
        "roadmap": roadmap
    }