import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const token = authHeader.split(" ")[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    message: "Token expired"
                });
            }

            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        req.id = user._id;
        req.user = user;
        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export const isAdmin = async (req, res, next) => {
    if(req.user && req.user.role === "admin"){
        next();
    } else {
        console.warn(`Admin access denied for user: ${req.user?.email} (Role: ${req.user?.role})`);
        return res.status(403).json({
            success: false,
            message: "Access denied : admin only"
        });
    }
}