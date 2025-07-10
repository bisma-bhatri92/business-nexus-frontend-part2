import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ prevent page refresh

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);

      // ✅ Store user data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");
      window.location.href = "/profile"; // ✅ redirect
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input name="email" value={form.email} onChange={handleChange} /><br />

        <label>Password:</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
