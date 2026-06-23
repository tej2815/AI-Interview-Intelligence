import { useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL =
  "https://ai-interview-intelligence-7oc7.onrender.com";


function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const [jobDescription, setJobDescription] = useState("");

  const [analysisData, setAnalysisData] = useState(null);

const [questions, setQuestions] = useState("");

const [selectedQuestion, setSelectedQuestion] = useState("");
const [answer, setAnswer] = useState("");
const [evaluation, setEvaluation] = useState("");

const [roadmap, setRoadmap] = useState("");

const [loadingQuestions, setLoadingQuestions] = useState(false);

const [loadingRoadmap, setLoadingRoadmap] = useState(false);

const [loadingEvaluation, setLoadingEvaluation] = useState(false);

const [loadingAnalysis, setLoadingAnalysis] = useState(false);

const answerLength = answer.trim().length;

const copyQuestion = (question) => {
  navigator.clipboard.writeText(question);

  alert("Question copied!");
};



  const handleResumeUpload = async () => {
    if (!selectedFile) {
      setUploadMessage("Please select a PDF.");
      return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {
      await axios.post(
        `${API_URL}/upload-resume`,
        formData
      );

      setUploadMessage("✅ Resume uploaded successfully");
    } catch (error) {
      console.error(error);
      setUploadMessage("❌ Upload failed");
    }
  };

  const handleAnalyzeJD = async () => {
  setLoadingAnalysis(true);

  try {
    const response = await axios.post(
      `${API_URL}/analyze-jd`,
      {
        job_description: jobDescription,
      }
    );

    setAnalysisData(response.data);
  } catch (error) {
    console.error(error);
    alert("Analysis failed");
  } finally {
    setLoadingAnalysis(false);
  }
};

  const handleGenerateQuestions = async () => {
  setLoadingQuestions(true);

  try {
    const response = await axios.post(
      `${API_URL}/generate-questions`,
      {
        job_description: jobDescription,
      }
    );

    setQuestions(response.data.questions);
  } catch (error) {
    console.error(error);
    alert("Question generation failed");
  } finally {
    setLoadingQuestions(false);
  }
};

  const handleEvaluateAnswer = async () => {
  setLoadingEvaluation(true);

  try {
    const response = await axios.post(
      `${API_URL}/evaluate-answer`,
      {
        question: selectedQuestion,
        answer: answer,
      }
    );

    setEvaluation(response.data.evaluation);
  } catch (error) {
    console.error(error);
    alert("Evaluation failed");
  } finally {
    setLoadingEvaluation(false);
  }
};


  const handleGenerateRoadmap = async () => {
  setLoadingRoadmap(true);

  try {
    const response = await axios.post(
      `${API_URL}/generate-roadmap`,
      {
        job_description: jobDescription,
      }
    );

    setRoadmap(response.data.roadmap);
  } catch (error) {
    console.error(error);
    alert("Roadmap generation failed");
  } finally {
    setLoadingRoadmap(false);
  }
};

  const renderSkills = (skills, color) => {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        {skills?.map((skill) => (
          <span
            key={skill}
            style={{
              background: color,
              padding: "10px 15px",
              borderRadius: "999px",
              fontWeight: "600",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      <>
  <h1 className="hero-title">
    🤖 AI Interview Intelligence
  </h1>

  <p className="hero-subtitle">
    Analyze resumes. Master interviews.
    Close skill gaps.
  </p>
</>

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        <h2>Upload Resume</h2>

        <br />

        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />

        <br />
        <br />

        <button onClick={handleResumeUpload}>
          Upload Resume
        </button>

        <br />
        <br />

        <p>{uploadMessage}</p>
      </div>

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h2>Job Description</h2>

        <br />

        <textarea
          rows="10"
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
          }}
        />

        <br />
        <br />

        <button
  onClick={handleAnalyzeJD}
  disabled={loadingAnalysis}
>
  {loadingAnalysis
    ? "Analyzing..."
    : "Analyze JD"}
</button>
      </div>

      {analysisData && (
        <div
          style={{
            marginTop: "20px",
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h2>Analysis Results</h2>

          <br />

          <div
  className="score-card"
  style={{
    background:
      analysisData.match_score >= 90
        ? "linear-gradient(135deg,#16a34a,#15803d)"
        : analysisData.match_score >= 70
        ? "linear-gradient(135deg,#2563eb,#1e40af)"
        : "linear-gradient(135deg,#dc2626,#991b1b)"
  }}
>
  <h3>Match Score</h3>

  <h1 className="score-value">
    {analysisData.match_score}%
  </h1>

  <div
  style={{
    marginTop: "20px",
    padding: "15px",
    background: "#0f172a",
    borderRadius: "12px",
  }}
>
  <h3>
    ATS Score
  </h3>

  <h2>
    {analysisData.ats_score}%
  </h2>

  <p>
    {
      analysisData.ats_score >= 80
        ? "✅ Likely ATS Friendly"
        : analysisData.ats_score >= 60
        ? "⚠️ Could Be Improved"
        : "❌ ATS May Reject Resume"
    }
  </p>
</div>


  <p
    style={{
      marginTop: "10px",
      fontSize: "18px",
    }}
  >
    {
      analysisData.match_score >= 90
        ? "Excellent Match 🚀"
        : analysisData.match_score >= 70
        ? "Good Match 👍"
        : "Needs Improvement 📚"
    }
  </p>
</div>

          <h3>Resume Skills</h3>
          {renderSkills(
            analysisData.resume_skills,
            "#334155"
          )}

          <br />

          <h3>JD Skills</h3>
          {renderSkills(
            analysisData.jd_skills,
            "#1e40af"
          )}

          <br />

          <h3>Missing Skills</h3>
          {renderSkills(
            analysisData.missing_skills,
            "#991b1b"
          )}

          <br />
          <br />

          <div
  style={{
    display: "flex",
    gap: "15px",
    marginTop: "20px",
  }}
>
  <button
  onClick={handleGenerateQuestions}
  disabled={loadingQuestions}
>
  {loadingQuestions
    ? "Generating Questions..."
    : "Generate Interview Questions"}
</button>

  <button
  onClick={handleGenerateRoadmap}
  disabled={loadingRoadmap}
>
  {loadingRoadmap
    ? "Generating Roadmap..."
    : "Generate Learning Roadmap"}
</button>
</div>
        </div>
      )}

      {questions && (
  <div
    style={{
      marginTop: "20px",
      background: "#1e293b",
      padding: "20px",
      borderRadius: "12px",
    }}
  >
    <h2>Interview Questions</h2>

    <br />

    <div>
  {questions
    .split(/\n\d+\./)
    .filter((q) => q.trim())
    .map((question, index) => (
      <div
        key={index}
        style={{
          background: "#0f172a",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "15px",
          border: "1px solid #334155",
        }}
      >
        <h3>
          Question {index + 1}
        </h3>

        <br />

        <p
          style={{
            lineHeight: "1.8",
          }}
        >
          {question.trim()}
        </p>

        <br />

        <div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  }}
>
  <button
    onClick={() =>
      setSelectedQuestion(question.trim())
    }
  >
    Use This Question
  </button>

  <button
    onClick={() =>
      copyQuestion(question.trim())
    }
  >
    Copy Question
  </button>
</div>
      </div>
    ))}
</div>

    <br />
    <br />

    <h2>Mock Interview</h2>

    <br />

    <textarea
      rows="6"
      placeholder="Paste one interview question here..."
      value={selectedQuestion}
      onChange={(e) =>
        setSelectedQuestion(e.target.value)
      }
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "10px",
        marginBottom: "15px",
      }}
    />

    <textarea
      rows="8"
      placeholder="Write your answer here..."
      
      value={answer}
      onChange={(e) =>
        setAnswer(e.target.value)
      }
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "10px",
      }}
    />

    <br />
<p>
  Characters: {answerLength}
</p>

<div
  style={{
    width: "100%",
    height: "8px",
    background: "#334155",
    borderRadius: "10px",
    marginTop: "8px",
  }}
>
  <div
    style={{
      width: `${Math.min(answerLength / 5, 100)}%`,
      height: "100%",
      background:
        answerLength < 100
          ? "#dc2626"
          : answerLength < 300
          ? "#eab308"
          : "#16a34a",
      borderRadius: "10px",
    }}
  />
</div>

<p
  style={{
    marginTop: "10px",
    fontWeight: "600",
  }}
>
  {
    answerLength < 100
      ? "🔴 Too Short"
      : answerLength < 300
      ? "🟡 Could Be More Detailed"
      : "🟢 Detailed Answer"
  }
</p>

<br />
<br />

    <button
  onClick={handleEvaluateAnswer}
  disabled={loadingEvaluation}
>
  {loadingEvaluation
    ? "Evaluating..."
    : "Evaluate My Answer"}
</button>

    {evaluation && (
      <div
        style={{
          marginTop: "20px",
          background: "#0f172a",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h3>AI Feedback</h3>

        <div
  style={{
    whiteSpace: "pre-wrap",
    lineHeight: "1.8",
    fontSize: "15px",
  }}
>
  {evaluation
    .split("\n")
    .map((line, index) => {
      const lower = line.toLowerCase();

      let bg = "#0f172a";

      if (lower.includes("score"))
        bg = "#1e40af";

      if (lower.includes("strength"))
        bg = "#166534";

      if (lower.includes("weakness"))
        bg = "#991b1b";

      if (lower.includes("improvement"))
        bg = "#7c3aed";

      return (
        <div
          key={index}
          style={{
            background: bg,
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          {line}
        </div>
      );
    })}
</div>
      </div>
    )}
  </div>
)}

{roadmap && (
  <div
    style={{
      marginTop: "20px",
      background: "#1e293b",
      padding: "20px",
      borderRadius: "12px",
    }}
  >
    <h2>
      🚀 30-Day Learning Roadmap
    </h2>

    <br />

    <pre
      style={{
        whiteSpace: "pre-wrap",
        lineHeight: "1.8",
      }}
    >
      {roadmap}
    </pre>
  </div>
)}
    </div>
  );
}

export default App;