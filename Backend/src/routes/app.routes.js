import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import Complaint from "../models/complaint.model.js";

const router = express.Router();

router.post("/login", async(req, res) =>{

    try {
        const { userId, password, department } = req.body;
        
        if (!userId || !password || !department) {
            return res.status(400).json({ message: "All fields are required." });
        }
        
        const user = await User.findOne({ userId, department });
        if (!user) {
            return res.status(404).json({ message: "User not found in this department." });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        
        res.status(200).json({ message: "Login successful.", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }

});

router.get('/complaints', async (req, res) => {
  try {
    const { department } = req.query; // Get department from query params

    if (!department) {
      return res.status(400).json({ message: 'Department is required' });
    }

    // Fetch complaints that match the department
    const complaints = await Complaint.find({ category: department });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints', error });
  }
});



export default router