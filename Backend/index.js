import express from "express";
import dotenv from "dotenv";
import mongoose, { connect } from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import appRoutes from "./src/routes/app.routes.js";
import userData from "./src/utils/localStorage.js";
import User from "./src/models/user.model.js";
import bcrypt from "bcrypt";




const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


dotenv.config();

const {users} = userData;

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
    origin: "http://localhost:3000",
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

connectDB();