const { register, login, updateProfile } = require("../controllers/authController");
const express = require("express");
const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.put("/update", updateProfile); // for profile editing

module.exports = router;
