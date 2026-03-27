import { Product } from './backend/models/productModel.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, 'backend', '.env') });

const checkDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'Ekart-YT' });
    const products = await Product.find();
    console.log('PRODUCTS_FOUND:', JSON.stringify(products, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('DB_ERROR:', err.message);
    process.exit(1);
  }
};

checkDB();
