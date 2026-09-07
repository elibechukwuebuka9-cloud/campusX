import { useState } from "react";
import "./GPA.css";

function GPA() {
  const [courses, setCourses] = useState([
    { name: "", grade: "", unit: 3 },
  ]);

  const addCourse = () => {
    setCourses([
      ...courses,
      { name: "", grade: "", unit: 3 },
    ]);
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalUnits = 0;

    const gradePoints: { [key: string]: number } = {
      A: 5,
      B: 4,
      C: 3,
      D: 2,
      E: 1,
      F: 0,
    };

    courses.forEach((course) => {
      if (course.grade) {
        totalPoints += gradePoints[course.grade] * course.unit;
        totalUnits += course.unit;
      }
    });

    if (totalUnits === 0) return "0.00";

    return (totalPoints / totalUnits).toFixed(2);
  };

  return (
    <div className="gpa-page">
      <div className="gpa-container">

        <div className="gpa-header">
          <p>ACADEMIC TOOLS</p>

          <h1>GPA Calculator</h1>

          <span>
            Calculate your semester GPA quickly and accurately.
          </span>
        </div>

        <div className="gpa-card">

          <div className="table-header">
            <span>COURSE</span>
            <span>GRADE</span>
            <span>UNITS</span>
          </div>

          {courses.map((course, index) => (
            <div className="course-row" key={index}>

              <input
                type="text"
                placeholder="e.g. MTH 101"
                value={course.name}
                onChange={(e) => {
                  const updated = [...courses];
                  updated[index].name = e.target.value;
                  setCourses(updated);
                }}
              />

              <select
                value={course.grade}
                onChange={(e) => {
                  const updated = [...courses];
                  updated[index].grade = e.target.value;
                  setCourses(updated);
                }}
              >
                <option value="">Grade</option>
                <option value="A">A — 5 points</option>
                <option value="B">B — 4 points</option>
                <option value="C">C — 3 points</option>
                <option value="D">D — 2 points</option>
                <option value="E">E — 1 point</option>
                <option value="F">F — 0 points</option>
              </select>

              <input
                type="number"
                min="1"
                value={course.unit}
                onChange={(e) => {
                  const updated = [...courses];
                  updated[index].unit = Number(e.target.value);
                  setCourses(updated);
                }}
              />

            </div>
          ))}

          <button className="add-course" onClick={addCourse}>
            + Add Course
          </button>

          <div className="gpa-result">

            <div>
              <span>Your Semester GPA</span>
              <h2>{calculateGPA()}</h2>
            </div>

            <div className="gpa-scale">
              <span>5.00 Scale</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default GPA;