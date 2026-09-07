import "./Study.css";
import { Link } from "react-router-dom";

function Study() {
  const courses = [
    {
      code: "MTH 101",
      name: "Mathematics",
      icon: "📐",
    },
    {
      code: "PHY 101",
      name: "Physics",
      icon: "⚡",
    },
    {
      code: "COS 101",
      name: "Computer Science",
      icon: "💻",
    },
    {
      code: "GST 101",
      name: "General Studies",
      icon: "📚",
    },
  ];

  return (
    <div className="study-page">
      <div className="study-container">

        <div className="study-header">
          <p>ACADEMIC RESOURCES</p>

          <h1>
            Study smarter.
            <br />
            <span>Not harder.</span>
          </h1>

          <span>
            Find notes, past questions and study materials
            for your courses.
          </span>
        </div>

        <div className="study-search">
          🔍
          <input
            type="text"
            placeholder="Search for a course or resource..."
          />
          <button>Search</button>
        </div>

        <div className="study-section">

          <div className="section-title">
            <p>YOUR COURSES</p>
            <h2>Choose a course</h2>
          </div>

          <div className="course-grid">

            {courses.map((course) => (
              <div className="study-card" key={course.code}>

                <div className="course-icon">
                  {course.icon}
                </div>

                <div>
                  <small>{course.code}</small>

                  <h3>{course.name}</h3>

                  <p>
                    Notes, past questions and resources.
                  </p>
                </div>

                <Link
  to={`/course/${course.code.replace(" ", "-").toLowerCase()}`}
  className="resource-link"
>
  View Resources →
</Link>

              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}

export default Study;