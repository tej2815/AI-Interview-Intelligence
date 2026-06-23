import re

SKILLS = [
    # Languages
    "Python",
    "Java",
    "C++",
    "C",
    "JavaScript",
    "TypeScript",
    "Go",
    "Rust",
    "Kotlin",
    "Swift",

    # Frontend
    "HTML",
    "CSS",
    "React",
    "Next.js",
    "Vue.js",
    "Angular",
    "Tailwind CSS",

    # Backend
    "Node.js",
    "Express",
    "FastAPI",
    "Flask",
    "Django",
    "Spring",
    "Spring Boot",

    # Databases
    "SQL",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "SQLite",

    # Cloud
    "AWS",
    "Azure",
    "Google Cloud",
    "GCP",

    # DevOps
    "Docker",
    "Kubernetes",
    "Jenkins",
    "GitHub Actions",
    "Terraform",

    # AI/ML
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "PyTorch",
    "LangChain",
    "OpenAI",
    "LLM",
    "NLP",
    "Computer Vision",

    # Tools
    "Git",
    "GitHub",
    "Linux",
    "Postman",
    "VS Code"
]


def extract_skills(text):
    found_skills = []

    text_lower = text.lower()

    for skill in SKILLS:

        pattern = r"\b" + re.escape(skill.lower()) + r"\b"

        if re.search(pattern, text_lower):
            found_skills.append(skill)

    return found_skills