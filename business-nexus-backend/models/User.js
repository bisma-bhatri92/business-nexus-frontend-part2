const mongoose = require("mongoose"); // ✅ This line is required

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["Entrepreneur", "Investor"],
    default: "Entrepreneur"
  }
});

module.exports = mongoose.model("User", userSchema);
