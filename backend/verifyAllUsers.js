import dotenv from "dotenv";
dotenv.config();

import connectDB from "./database/db.js";
import { User } from "./models/userModel.js";

const verifyAllUsers = async () => {
  try {
    await connectDB();
    const result = await User.updateMany({}, { $set: { isVerified: true } });
    console.log(`Updated ${result.modifiedCount} users to isVerified: true`);
    process.exit(0);
  } catch (error) {
    console.error("Error updating users:", error);
    process.exit(1);
  }
};

verifyAllUsers();
