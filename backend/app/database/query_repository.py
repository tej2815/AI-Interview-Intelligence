from app.database.models import Resume


def get_latest_resume(db):
    return (
        db.query(Resume)
        .order_by(Resume.id.desc())
        .first()
    )