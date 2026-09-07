import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Campus<span>X</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/study">Study</Link>
        <Link to="/gpa">GPA</Link>
        <Link to="/opportunities">Opportunities</Link>
        <Link to="/marketplace">Marketplace</Link>
        <Link to="/community">Community</Link>
        <Link to="/accommodation">Accommodation</Link>
      </div>

      <Link to="/login" className="login-btn">
        Login
      </Link>
    </nav>
  );
}

export default Navbar;