import { useState } from "react";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const [jobDescription, setJobDescription] = useState("");

  const [analysisData, setAnalysisData] = useState(null);

const [questions, setQuestions] = useState("");

const [selectedQuestion, setSelectedQuestion] = useState("");
const [answer, setAnswer] = useState("");
const [evaluation, setEvaluation] = useState("");
  const handleResumeUpload = async () => {
    if (!selectedFile) {
      setUploadMessage("Please select a PDF.");
      return;
    }

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {
      await axios.post(
        "http://127.0.0.1:8000/upload-resume",
        formData
      );

      setUploadMessage("✅ Resume uploaded successfully");
    } catch (error) {
      console.error(error);
      setUploadMessage("❌ Upload failed");
    }
  };

  const handleAnalyzeJD = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/analyze-jd",
        {
          job_description: jobDescription,
        }
      );

      setAnalysisData(response.data);
    } catch (error) {
      console.error(error);
      alert("Analysis failed");
    }
  };

  const handleGenerateQuestions = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/generate-questions",
        {
          job_description: jobDescription,
        }
      );

      setQuestions(response.data.questions);
    } catch (error) {
      console.error(error);
      alert("Question generation failed");
    }
  };

  const handleEvaluateAnswer = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/evaluate-answer",
      {
        question: selectedQuestion,
        answer: answer,
      }
    );

    setEvaluation(response.data.evaluation);
  } catch (error) {
    console.error(error);
    alert("Evaluation failed");
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
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "42px",
          fontWeight: "700",
        }}
      >
        🤖 AI Interview Intelligence
      </h1>

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

        <button onClick={handleAnalyzeJD}>
          Analyze JD
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
            style={{
              background: "#2563eb",
              padding: "25px",
              borderRadius: "15px",
              textAlign: "center",
              marginBottom: "25px",
            }}
          >
            <h3>Match Score</h3>

            <h1
              style={{
                marginTop: "10px",
                fontSize: "50px",
              }}
            >
              {analysisData.match_score}%
            </h1>
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

          <button
            onClick={handleGenerateQuestions}
          >
            Generate Interview Questions
          </button>
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

    <pre
      style={{
        whiteSpace: "pre-wrap",
        lineHeight: "1.8",
        fontSize: "15px",
      }}
    >
      {questions}
    </pre>

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
    <br />

    <button
      onClick={handleEvaluateAnswer}
    >
      Evaluate My Answer
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

        <pre
          style={{
            whiteSpace: "pre-wrap",
            lineHeight: "1.8",
          }}
        >
          {evaluation}
        </pre>
      </div>
    )}
  </div>
)}
    </div>
  );
}

export default App;