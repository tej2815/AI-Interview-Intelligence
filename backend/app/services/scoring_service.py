def calculate_match_score(resume_skills, jd_skills):

    if not jd_skills:
        return 0

    matched = 0

    for skill in jd_skills:
        if skill in resume_skills:
            matched += 1

    score = (matched / len(jd_skills)) * 100

    return round(score, 2)