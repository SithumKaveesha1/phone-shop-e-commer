import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "./database/db.js";
import { User } from "./models/userModel.js";

const createAdmin = async () => {
    try {
        console.log("Starting createAdmin script...");
        console.log("Connecting to DB...");
        await connectDB();
        
        if (mongoose.connection.readyState !== 1) {
            throw new Error("Failed to connect to MongoDB. Connection state is " + mongoose.connection.readyState);
        }
        
        console.log("DB connected successfully.");
        
        const email = "sithumkaveesha1212@gmail.com";
        const password = "Sithum@1";
        console.log(`Hashing password for ${email}...`);
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const adminData = {
            firstname: "Admin",
            lastname: "User",
            email: email,
            password: hashedPassword,
            role: "admin",
            isVerified: true
        };
        
        console.log("Checking if user exists...");
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            console.log("Admin user already exists. Updating password and role...");
            existingUser.password = hashedPassword;
            existingUser.role = "admin";
            existingUser.isVerified = true;
            await existingUser.save();
            console.log("Admin user updated successfully.");
        } else {
            console.log("Creating new admin user...");
            await User.create(adminData);
            console.log("Admin user created successfully.");
        }
        
        console.log("Closing connection...");
        await mongoose.connection.close();
        console.log("Done.");
        process.exit(0);
    } catch (error) {
        console.error("CRITICAL ERROR:", error);
        process.exit(1);
    }
};

createAdmin();
