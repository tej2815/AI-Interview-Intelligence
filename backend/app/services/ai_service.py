import os

from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(env_path)

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)


def generate_interview_questions(
    resume_skills,
    jd_skills,
    missing_skills
):

    prompt = f"""
    You are a technical interviewer.

    Resume Skills:
    {resume_skills}

    Job Description Skills:
    {jd_skills}

    Missing Skills:
    {missing_skills}

    Generate 10 interview questions.

    Include:
    - Technical questions
    - Scenario based questions
    - Questions related to missing skills

    Return only the questions.
    """

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b:free",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content