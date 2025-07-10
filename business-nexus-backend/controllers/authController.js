const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Register new user
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign({ id: newUser._id }, "secret_key");

    res.json({ message: "Registered successfully", user: newUser, token });
  } catch (err) {
    console.error("Registration failed:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};

// ✅ Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "secret_key");

    res.json({ message: "Login successful", user, token });
  } catch (err) {
    console.error("Login failed:", err);
    res.status(500).json({ error: "Login failed" });
  }
};

// ✅ Update profile info
const updateProfile = async (req, res) => {
  const { userId, name, email, role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, role },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ error: "User not found" });

    res.json({ message: "Profile updated!", user: updatedUser });
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ error: "Update failed" });
  }
};

// ✅ Export all controllers
module.exports = {
  register,
  login,
  updateProfile,
};
