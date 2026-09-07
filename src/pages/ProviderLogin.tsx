import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProviderLogin.css";

function ProviderLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/provider-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Invalid provider email or password."
        );

        return;
      }

     if (data.success) {
  localStorage.setItem(
    "campusXProvider",
    "true"
  );

  localStorage.setItem(
    "campusXProviderToken",
    data.token
  );

  navigate("/accommodation-requests");
}
    } catch (error) {
      console.error("Login error:", error);

      alert(
        "Unable to connect to the CampusX server. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="provider-login-page">

      <div className="provider-login-card">

        <div className="provider-logo">
          CAMPUSX
        </div>

        <h1>
          Provider Login
        </h1>

        <p className="provider-subtitle">
          Sign in to manage accommodation requests.
        </p>

        <form onSubmit={handleLogin}>

          <div className="provider-input-group">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="provider@campusx.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          <div className="provider-input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="provider-login-button"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <div className="provider-demo">

          <p>
            Demo provider account
          </p>

          <span>
            Email: provider@campusx.com
          </span>

          <span>
            Password: CampusX123
          </span>

        </div>

      </div>

    </div>
  );
}

export default ProviderLogin;