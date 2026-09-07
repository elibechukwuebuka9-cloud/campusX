import { useParams, Link } from "react-router-dom";
import "./Course.css";

function Course() {
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
    <div className="course-page">
      <div className="course-container">

        <Link to="/study" className="back-link">
          ← Back to Study Hub
        </Link>

        <div className="course-header">
          <p>STUDY HUB</p>

          <h1>{course.code}</h1>

          <span>{course.name}</span>
        </div>

        <div className="resource-grid">

          <div className="resource-card">
            <div className="resource-icon">📖</div>

            <h2>Lecture Notes</h2>

            <p>
              Access lecture notes and important topics
              for {course.code}.
            </p>

            <Link
              to={`/course/${courseCode}/notes`}
              className="resource-button"
            >
              Open Notes →
            </Link>
          </div>

          <div className="resource-card">
            <div className="resource-icon">📝</div>

            <h2>Past Questions</h2>

            <p>
              Practice with previous examination
              questions.
            </p>

            <Link
              to={`/course/${courseCode}/questions`}
              className="resource-button"
            >
              View Questions →
            </Link>
          </div>

          <div className="resource-card">
            <div className="resource-icon">📚</div>

            <h2>Study Materials</h2>

            <p>
              Helpful materials to improve your
              understanding of the course.
            </p>

            <Link
              to={`/course/${courseCode}/materials`}
              className="resource-button"
            >
              View Materials →
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Course;