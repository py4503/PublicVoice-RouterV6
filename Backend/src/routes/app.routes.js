import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import Complaint from "../models/complaint.model.js";

const router = express.Router();

// User Login Route
router.post("/login", async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({ message: "User ID and password are required." });
    }

    // Trim input fields to prevent accidental spaces
    const user = await User.findOne({ userId: userId.trim() });

    if (!user) {
      console.log("User not found:", userId);
      return res.status(404).json({ message: "User not found." });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password for user:", userId);
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = generateToken(user._id, res);

    console.log("Login successful:", { userId, department: user.department });

    res.status(200).json({ 
      message: "Login successful.", 
      user: { userId: user.userId, department: user.department }, // Hide password
      token 
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//  Fetch Complaints by Department
router.get("/complaints", async (req, res) => {
  try {
    console.log("Received request with query:", req.query);

    const { department } = req.query; // Use department instead of category

    if (!department || department === 'null') {
      console.log("Missing department parameter");
      return res.status(400).json({ message: "Department is required" });
    }

    const validCategories = ["Road", "Electricity", "Sanitation", "Roadways"];
    if (!validCategories.includes(department)) {
      console.log("Invalid department category:", department);
      return res.status(400).json({ message: "Invalid department category." });
    }

    const complaints = await Complaint.find({ category: department });

    console.log("Fetched complaints:", complaints.length);

    if (complaints.length === 0) {
      return res.status(404).json({ message: "No complaints found for this department." });
    }

    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Error fetching complaints", error });
  }
});


export default router;
