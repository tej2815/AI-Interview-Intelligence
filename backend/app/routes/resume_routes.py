from fastapi import APIRouter, UploadFile, File

from app.services.pdf_service import extract_text_from_pdf
from app.services.skill_service import extract_skills

from app.database.session import SessionLocal
from app.database.resume_repository import save_resume

router = APIRouter()


@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    text = extract_text_from_pdf(file.file)

    skills = extract_skills(text)

    db = SessionLocal()

    saved_resume = save_resume(
        db=db,
        filename=file.filename,
        skills=skills,
        resume_text=text
    )

    db.close()

    return {
        "id": saved_resume.id,
        "filename": saved_resume.filename,
        "skills": skills
    }