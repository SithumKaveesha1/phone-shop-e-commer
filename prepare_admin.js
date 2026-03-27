import { User } from './backend/models/userModel.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, 'backend', '.env') });

const prepareAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'Ekart-YT' });
    let admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      console.log('No admin found, you may need to register one for testing.');
    } else {
      console.log('ADMIN_FOUND:', admin.email);
    }
    process.exit(0);
  } catch (err) {
    console.error('ERROR:', err.message);
    process.exit(1);
  }
};

prepareAdmin();
