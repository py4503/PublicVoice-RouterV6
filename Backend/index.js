import express from "express";
import dotenv from "dotenv";
import mongoose, { connect } from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import appRoutes from "./src/routes/app.routes.js";
import userData from "./src/utils/localStorage.js";
import User from "./src/models/user.model.js";
import bcrypt from "bcrypt";
import sampleComplaints from "./src/utils/complaintData.js";
import Complaint from "./src/models/complaint.model.js";




const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


dotenv.config();

const {users} = userData;

const {complaint} =sampleComplaints;

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api", appRoutes )

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});

/*const createUsers = async () => {
    try {
        for (let user of users) {
            const existingUser = await User.findOne({ userId: user.userId });
            if (!existingUser) {
                // 🔹 Hash the password before storing
                const hashedPassword = await bcrypt.hash(user.password, 10);
                
                const newUser = new User({ 
                    ...user, 
                    password: hashedPassword // Store hashed password
                });

                await newUser.save();
                console.log(`User ${user.userId} added`);
            } else {
                console.log(`User ${user.userId} already exists`);
            }
        }
    } catch (error) {
        console.error("Error adding users:", error);
    }
};

// Call createUsers only after MongoDB is connected
connectDB().then(() => createUsers());
*/

//connectDB();

/*const storeSampleComplaints = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("MongoDB connected:", connection.connection.host); // Debugging step

    // Ensure MongoDB is connected before inserting
    if (mongoose.connection.readyState !== 1) {
      throw new Error("MongoDB not connected. Check credentials & network.");
    }

    await Complaint.deleteMany();
    console.log("Existing complaints deleted.");

    await Complaint.insertMany(sampleComplaints);
    console.log("Sample complaints stored successfully!");

    mongoose.connection.close();
    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Error storing sample complaints:", error);
    mongoose.connection.close();
  }
};

storeSampleComplaints();
*/
connectDB();    


