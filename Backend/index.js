import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import appRoutes from "./src/routes/app.routes.js";
import userData from "./src/utils/localStorage.js";
import sampleComplaints from "./src/utils/complaintData.js";
import User from "./src/models/user.model.js";
import Complaint from "./src/models/complaint.model.js";

dotenv.config(); // ✅ Load environment variables

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

const users = userData; // ✅ Fixed destructuring
const complaints = sampleComplaints; // ✅ Fixed destructuring

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", true);
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};

const createUsers = async () => {
    try {
        for (let user of users) {
            const existingUser = await User.findOne({ userId: user.userId });
            if (!existingUser) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                const newUser = new User({ ...user, password: hashedPassword });
                await newUser.save();
                console.log(`✅ User ${user.userId} added`);
            } else {
                console.log(`⚠️ User ${user.userId} already exists`);
            }
        }
    } catch (error) {
        console.error("❌ Error adding users:", error);
    }
};

const storeSampleComplaints = async () => {
    try {
        if (mongoose.connection.readyState !== 1) throw new Error("❌ MongoDB not connected.");

        await Complaint.deleteMany();
        await Complaint.insertMany(complaints);
        console.log("✅ Sample complaints stored successfully!");
    } catch (error) {
        console.error("❌ Error storing complaints:", error);
    }
};

// Start DB & Seed Data
connectDB().then(() => {
    createUsers();
    storeSampleComplaints();
});

app.use("/api", appRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
