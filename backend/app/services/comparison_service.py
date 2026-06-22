def find_missing_skills(resume_skills, jd_skills):

    missing_skills = []

    for skill in jd_skills:
        if skill not in resume_skills:
            missing_skills.append(skill)

    return missing_skills