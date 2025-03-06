import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    if (res) {
        res.cookie("jwt", token, {
            httpOnly: true, // Prevent XSS attacks
            secure: process.env.NODE_ENV === "production", // Secure in production
            sameSite: "strict", // Prevent CSRF attacks
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });
    }

    return token;
};
