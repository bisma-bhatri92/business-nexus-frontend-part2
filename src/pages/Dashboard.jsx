// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <h2>Please login to access the dashboard.</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <p>Welcome back, <strong>{user.name}</strong>!</p>
      <p>Your role: <strong>{user.role}</strong></p>
    </div>
  );
}
