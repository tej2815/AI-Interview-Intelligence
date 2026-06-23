from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path
import os

env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(env_path)

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)


def generate_roadmap(missing_skills):

    prompt = f"""
    You are a career mentor.
    You are an experienced software engineering mentor.

    Missing Skills:
    {missing_skills}

    Create a practical 30-day learning roadmap.

    Return plain text only.

Do NOT use:
- Markdown
- Tables
- **
- ###
- ---
- HTML

Format exactly like:

Week 1
Topic:
Goals:
Mini Project:

Week 2
Topic:
Goals:
Mini Project:

Week 3
Topic:
Goals:
Mini Project:

Week 4
Topic:
Goals:
Mini Project:

    Keep the roadmap practical and concise.
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