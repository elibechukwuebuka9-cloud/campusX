import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Study from "./pages/study";
import GPA from "./pages/GPA";
import Course from "./pages/Course";
import Opportunities from "./pages/Opportunities";
import Marketplace from "./pages/Marketplace";
import Community from "./pages/community";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";

// Accommodation
import Accommodation from "./pages/Accommodation";
import AccommodationDetails from "./pages/AccommodationDetails";
import AccommodationRequests from "./pages/AccommodationRequests";
import ProviderLogin from "./pages/ProviderLogin";

// Layout
import Navbar from "./components/layout/Navbar";


function ProtectedProvider() {
  const isProvider =
    localStorage.getItem("campusXProvider") === "true";

  if (!isProvider) {
    return <Navigate to="/provider-login" replace />;
  }

  return <AccommodationRequests />;
}


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/study" element={<Study />} />
        <Route path="/gpa" element={<GPA />} />
        <Route path="/course" element={<Course />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/community" element={<Community />} />

        {/* Student Account */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />

        {/* Student Accommodation */}
        <Route
          path="/accommodation"
          element={<Accommodation />}
        />

        <Route
          path="/accommodation/:id"
          element={<AccommodationDetails />}
        />

        {/* Provider */}
        <Route
          path="/provider-login"
          element={<ProviderLogin />}
        />

        <Route
          path="/accommodation-requests"
          element={<ProtectedProvider />}
        />
        <Route
  path="/notifications"
  element={<Notifications />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;