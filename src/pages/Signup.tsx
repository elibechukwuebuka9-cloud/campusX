import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = (e: FormEvent) => {
  e.preventDefault();

  if (!name || !email || !password) {
    setMessage("Please fill in all fields.");
    return;
  }

  const user = {
    name: name,
    email: email,
    password: password,
  };

  localStorage.setItem("campusXUser", JSON.stringify(user));

  // Check that it was actually saved
  const savedUser = localStorage.getItem("campusXUser");

  if (savedUser) {
    setMessage("Account created successfully! 🎉");

    setTimeout(() => {
      navigate("/login");
    }, 3000);
  } else {
    setMessage("Account could not be saved.");
  }
};

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1>Create account 🚀</h1>
        <p>Join the CampusX community</p>

        <form onSubmit={handleSignup}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Create Account</button>
        </form>

        {message && <p className="">{message}</p>}

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;