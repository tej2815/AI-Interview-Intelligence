import os

from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(env_path)
print("KEY VALUE:", os.getenv("OPENROUTER_API_KEY"))
print("OPENROUTER KEY FOUND:", os.getenv("OPENROUTER_API_KEY") is not None)
client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)


def evaluate_answer(question, answer):

    prompt = f"""
    You are a senior technical interviewer.

    Question:
    {question}

    Candidate Answer:
    {answer}

    Evaluate the answer.

    Give:

    1. Score out of 10
    2. Strengths
    3. Weaknesses
    4. Improvements

    Return the response in a clean format.
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