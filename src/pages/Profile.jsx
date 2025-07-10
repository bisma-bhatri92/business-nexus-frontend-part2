import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setFormData(parsed);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put("/auth/update", {
        userId: user._id,
        ...formData
      });
      alert("Profile updated!");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      setEditMode(false);
    } catch (err) {
      alert("Update failed");
    }
  };

  if (!user) {
    return <h2>Please login to view your profile.</h2>;
  }

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <p className="profile-subtext">Welcome to your profile. Here you can view or edit your information.</p>

      {editMode ? (
        <>
          <label>Name: <input name="name" value={formData.name} onChange={handleChange} /></label>
          <label>Email: <input name="email" value={formData.email} onChange={handleChange} /></label>
          <label>Role: 
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="Entrepreneur">Entrepreneur</option>
              <option value="Investor">Investor</option>
            </select>
          </label>
          <div className="btn-group">
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </>
      )}

      <button
        className="logout"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}
