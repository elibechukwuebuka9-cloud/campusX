import "./Home.css";

function Home() {
  return (
    <div className="campusx">

      {/* HERO SECTION */}
      <section className="hero">

        <div className="hero-content">

          <p className="hero-label">
            WELCOME TO CAMPUSX
          </p>

          <h1>
            Your Campus.
            <br />
            <span>Your Future.</span>
          </h1>

          <p className="hero-description">
            Everything you need to make student life easier,
            smarter and more connected — all in one place.
          </p>

          <div className="hero-buttons">

            <a href="/study" className="primary-button">
              Get Started →
            </a>

            <a href="/community" className="secondary-button">
              Explore CampusX
            </a>

          </div>

        </div>

        {/* DASHBOARD PREVIEW */}
        <div className="dashboard-preview">

          <div className="dashboard-header">
            <span>CampusX</span>
            <span>−</span>
          </div>

          <h3>Student Dashboard</h3>

          <div className="dashboard-item">
            📚
            <div>
              <strong>Study Hub</strong>
              <small>Access your resources</small>
            </div>
          </div>

          <div className="dashboard-item">
            💼
            <div>
              <strong>Opportunities</strong>
              <small>Find your next opportunity</small>
            </div>
          </div>

          <div className="dashboard-item">
            📊
            <div>
              <strong>GPA Calculator</strong>
              <small>Track your academic progress</small>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;