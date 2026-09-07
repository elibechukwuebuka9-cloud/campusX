import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const savedUser = localStorage.getItem("campusXUser");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [university, setUniversity] = useState(
    user?.university || ""
  );
  const [course, setCourse] = useState(
    user?.course || ""
  );

  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const saveProfile = () => {
    const updatedUser = {
      ...user,
      name,
      email,
      university,
      course,
    };

    localStorage.setItem(
      "campusXUser",
      JSON.stringify(updatedUser)
    );

    setEditing(false);
    setMessage("Profile updated successfully! 🎉");
  };

  const handleLogout = () => {
    localStorage.removeItem("campusXUser");
    localStorage.removeItem("campusXLoggedIn");
    navigate("/login");
  };

  return (
    <div className="profile-page">

      <div className="profile-container">

        {/* HEADER */}
        <div className="profile-header">
          <div className="profile-avatar">
            {name.charAt(0).toUpperCase() || "S"}
          </div>

          <div>
            <h1>{name || "Student"}</h1>
            <p>CampusX Student</p>
          </div>
        </div>

        {/* PROFILE CARD */}
        <div className="profile-card">

          <div className="profile-card-header">
            <div>
              <h2>Personal Information</h2>
              <p>Manage your CampusX profile.</p>
            </div>

            {!editing && (
              <button
                className="edit-button"
                onClick={() => setEditing(true)}
              >
                ✏️ Edit Profile
              </button>
            )}
          </div>

          <div className="profile-form">

            <div className="profile-field">
              <label>Full Name</label>

              {editing ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <div className="profile-value">
                  {name || "Not added"}
                </div>
              )}
            </div>

            <div className="profile-field">
              <label>Email</label>

              {editing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <div className="profile-value">
                  {email || "Not added"}
                </div>
              )}
            </div>

            <div className="profile-field">
              <label>University</label>

              {editing ? (
                <input
                  value={university}
                  placeholder="Enter your university"
                  onChange={(e) =>
                    setUniversity(e.target.value)
                  }
                />
              ) : (
                <div className="profile-value">
                  {university || "Not added"}
                </div>
              )}
            </div>

            <div className="profile-field">
              <label>Course</label>

              {editing ? (
                <input
                  value={course}
                  placeholder="e.g. Computer Science"
                  onChange={(e) =>
                    setCourse(e.target.value)
                  }
                />
              ) : (
                <div className="profile-value">
                  {course || "Not added"}
                </div>
              )}
            </div>

          </div>

          {editing && (
            <div className="profile-actions">

              <button
                className="cancel-button"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>

              <button
                className="save-button"
                onClick={saveProfile}
              >
                Save Changes
              </button>

            </div>
          )}

          {message && (
            <p className="profile-message">
              {message}
            </p>
          )}

        </div>

        {/* ACCOUNT */}
        <div className="account-card">

          <h2>Account</h2>

          <p>
            Manage your CampusX account.
          </p>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            🚪 Log Out
          </button>

        </div>

        <button
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

      </div>

    </div>
  );
}

export default Profile;