import { useParams, Link } from "react-router-dom";
import "./Questions.css";

function Questions() {
  const { courseCode } = useParams();

  const courseNames: {
    [key: string]: {
      code: string;
      name: string;
    };
  } = {
    "mth-101": {
      code: "MTH 101",
      name: "Mathematics",
    },
    "phy-101": {
      code: "PHY 101",
      name: "Physics",
    },
    "cos-101": {
      code: "COS 101",
      name: "Computer Science",
    },
    "gst-101": {
      code: "GST 101",
      name: "General Studies",
    },
  };

  const course = courseNames[courseCode || "mth-101"];

  return (
    <div className="questions-page">
      <div className="questions-container">

        <Link
          to={`/course/${courseCode}`}
          className="back-link"
        >
          ← Back to {course.code}
        </Link>

        <div className="questions-header">
          <p>PAST QUESTIONS</p>

          <h1>{course.code}</h1>

          <span>{course.name}</span>
        </div>

        <div className="question-card">
          <div>
            <small>2025 EXAM</small>

            <h2>First Semester Examination</h2>

            <p>
              Practice questions from the first semester
              examination.
            </p>
          </div>

          <Link
  to={`/course/${courseCode}/questions/quiz`}
  className="practice-button"
>
  Start Practice →
</Link>
        </div>

        <div className="question-card">
          <div>
            <small>2024 EXAM</small>

            <h2>Second Semester Examination</h2>

            <p>
              Test your knowledge with previous examination
              questions.
            </p>
          </div>

          <button>
            Start Practice →
          </button>
        </div>

      </div>
    </div>
  );
}

export default Questions;