import React, { useEffect, useState } from "react";
import axios from "../axios.js";


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
   console.error("Update failed:", err);
alert("Update failed");

  }
};


  if (!user) {
    return <h2>Please login to view your profile.</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Profile</h2>
      {editMode ? (
        <>
          <p>
            <strong>Name:</strong>{" "}
            <input name="name" value={formData.name} onChange={handleChange} />
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </p>
          <p>
            <strong>Role:</strong>{" "}
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="Entrepreneur">Entrepreneur</option>
              <option value="Investor">Investor</option>
            </select>
          </p>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p>Welcome to your profile. Here you can view or edit your information.</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </>
      )}
      <br /><br />
      <button
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
