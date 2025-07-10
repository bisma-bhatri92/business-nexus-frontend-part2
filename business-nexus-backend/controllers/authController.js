const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ user, token });
  } catch (err) {
    console.error("Registration failed:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ user, token });
  } catch (err) {
    console.error("Login failed:", err);
    res.status(500).json({ error: "Login failed" });
  }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const { userId, name, email, role } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, role },
      { new: true }
    );

    res.json({ user });
  } catch (err) {
    console.error("Profile update failed:", err);
    res.status(500).json({ error: "Profile update failed" });
  }
};

// Export functions
module.exports = {
  register,
  login,
  updateProfile,
};
