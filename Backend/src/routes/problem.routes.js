const express = require('express');
const Problem = require('../models/Problem'); // Import the Mongoose model
const axios = require('axios');

const router = express.Router();

// API to handle complaint submission
router.post('/submit', async (req, res) => {
    try {
        const { description } = req.body;

        // Step 1: Send text to Python script for classification
        const pythonServiceURL = 'http://127.0.0.1:5000/process_complaint'; // Flask API URL
        const response = await axios.post(pythonServiceURL, { text: description });

        // Extract the classified data from Python response
        const { category, city, urgency } = response.data;

        // Step 2: Store it in MongoDB
        const newProblem = new Problem({
            description,
            category,
            city,
            urgency
        });

        await newProblem.save();
        res.status(201).json({ message: 'Complaint submitted successfully', problem: newProblem });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
