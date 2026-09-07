import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    const savedUser = localStorage.getItem("campusXUser");

    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserName(user.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("campusXUser");
    navigate("/login");
  };

  return (
    <div className="dashboard-page">

      {/* HEADER */}
      <header className="dashboard-header">
        <div>
          <h1>Campus<span>X</span></h1>
          <p>Student Dashboard</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* WELCOME */}
      <section className="welcome-section">
        <p className="small-title">WELCOME BACK 👋</p>

        <h2>
          Hello, {userName}
        </h2>

        <p>
          Manage your studies, track your progress and explore
          opportunities — all from one place.
        </p>
      </section>

      {/* STATS */}
      <section className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <h3>6</h3>
          <p>Courses</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <h3>3.75</h3>
          <p>Current GPA</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <h3>24</h3>
          <p>Resources</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <h3>8</h3>
          <p>Opportunities</p>
        </div>

      </section>

      {/* MAIN CARDS */}
      <section className="dashboard-grid">

        {/* STUDY */}
        <div className="dashboard-card">
          <div className="card-icon">📖</div>

          <h3>Study Hub</h3>

          <p>
            Access your courses, notes, past questions and
            other study resources.
          </p>

          <button onClick={() => navigate("/study")}>
            Go to Study →
          </button>
        </div>

        {/* GPA */}
        <div className="dashboard-card">
          <div className="card-icon">📊</div>

          <h3>GPA Calculator</h3>

          <p>
            Calculate and track your academic performance
            throughout the semester.
          </p>

          <button onClick={() => navigate("/gpa")}>
            Calculate GPA →
          </button>
        </div>

        {/* OPPORTUNITIES */}
        <div className="dashboard-card">
          <div className="card-icon">💼</div>

          <h3>Opportunities</h3>

          <p>
            Discover internships, scholarships, jobs and
            other opportunities.
          </p>

          <button onClick={() => navigate("/opportunities")}>
            Explore Opportunities →
          </button>
        </div>

        {/* MARKETPLACE */}
        <div className="dashboard-card">
          <div className="card-icon">🛒</div>

          <h3>Marketplace</h3>

          <p>
            Buy and sell items with other students on campus.
          </p>

          <button onClick={() => navigate("/marketplace")}>
            Visit Marketplace →
          </button>
        </div>

        {/* COMMUNITY */}
        <div className="dashboard-card">
          <div className="card-icon">💬</div>

          <h3>Community</h3>

          <p>
            Connect with other students, ask questions and
            share ideas.
          </p>

          <button onClick={() => navigate("/community")}>
            Join Community →
          </button>
        </div>

        {/* PROFILE */}
        <div className="dashboard-card">
          <div className="card-icon">👤</div>

          <h3>My Profile</h3>

          <p>
            View and manage your CampusX student profile.
          </p>

          <button onClick={() => navigate("/profile")}>
            View Profile →
          </button>
        </div>

      </section>

      {/* RECENT ACTIVITY */}
      <section className="activity-section">

        <div className="section-heading">
          <h2>Recent Activity</h2>
          <span>View all</span>
        </div>

        <div className="activity-list">

          <div className="activity-item">
            <span>📚</span>
            <div>
              <h4>Studied Mathematics</h4>
              <p>Today</p>
            </div>
          </div>

          <div className="activity-item">
            <span>📊</span>
            <div>
              <h4>Checked GPA</h4>
              <p>Yesterday</p>
            </div>
          </div>

          <div className="activity-item">
            <span>💼</span>
            <div>
              <h4>Viewed an opportunity</h4>
              <p>2 days ago</p>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;