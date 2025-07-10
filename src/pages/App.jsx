import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Dashboard from "./Dashboard";

export default function App() {
  return (
    <>
      <nav>
        <Link to="/dashboard">Dashboard</Link> |{" "}
        <Link to="/profile">Profile</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h2>Welcome to Business Nexus</h2>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}
