import dotenv from "dotenv";
dotenv.config();
import connectDB from "./database/db.js";
import { User } from "./models/userModel.js";

const listAdmin = async () => {
  try {
    await connectDB();
    const admins = await User.find({ role: 'admin' });
    console.log('ADMINS_FOUND:', JSON.stringify(admins, null, 2));
    process.exit(0);
  } catch (error) {
    console.error("Error listing admins:", error);
    process.exit(1);
  }
};

listAdmin();
