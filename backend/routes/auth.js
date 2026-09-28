const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth");

const {
    registerUser,
    loginUser,
    getCurrentUser,
    updateProfile,
    addAddress,
    deleteAddress
} = require("../controllers/authController");

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes
router.get("/me", protect, getCurrentUser);

router.put("/update", protect, updateProfile);

router.post("/add-address", protect, addAddress);

router.delete("/delete-address", protect, deleteAddress);

module.exports = router;