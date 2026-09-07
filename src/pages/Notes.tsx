import { useParams, Link } from "react-router-dom";
import "./Notes.css";

function Notes() {
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
    <div className="notes-page">
      <div className="notes-container">

        <Link
          to={`/course/${courseCode}`}
          className="back-link"
        >
          ← Back to {course.code}
        </Link>

        <div className="notes-header">
          <p>LECTURE NOTES</p>

          <h1>{course.code}</h1>

          <span>{course.name}</span>
        </div>

        <div className="topic-list">

          <div className="topic-card">
            <div>
              <small>TOPIC 01</small>
              <h2>Introduction</h2>
              <p>
                Introduction to the course and basic
                concepts you need to understand.
              </p>
            </div>

            <Link
  to={`/course/${courseCode}/notes/1`}
  className="read-button"
>
  Read →
</Link>
          </div>

          <div className="topic-card">
            <div>
              <small>TOPIC 02</small>
              <h2>Basic Concepts</h2>
              <p>
                Learn the fundamental concepts and
                principles of this course.
              </p>
            </div>

            <Link
  to={`/course/${courseCode}/notes/2`}
  className="read-button"
>
  Read →
</Link>
          </div>

          <div className="topic-card">
            <div>
              <small>TOPIC 03</small>
              <h2>Important Topics</h2>
              <p>
                Key topics students should understand
                before examinations.
              </p>
            </div>

            <Link
  to={`/course/${courseCode}/notes/3`}
  className="read-button"
>
  Read →
</Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Notes;