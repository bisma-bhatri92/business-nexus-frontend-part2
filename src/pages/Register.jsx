// src/pages/Register.jsx
import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Entrepreneur"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // 🔐 prevent form refresh

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registered successfully!");
      window.location.href = "/login"; // ✅ redirect to login
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>Name:</label>
        <input name="name" value={form.name} onChange={handleChange} required /><br />

        <label>Email:</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required /><br />

        <label>Password:</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required /><br />

        <label>Role:</label>
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="Entrepreneur">Entrepreneur</option>
          <option value="Investor">Investor</option>
        </select><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
