from app.database.models import Resume


def save_resume(db, filename, skills, resume_text):
    resume = Resume(
        filename=filename,
        skills=",".join(skills),
        resume_text=resume_text
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return resume