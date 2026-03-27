import mongoose from 'mongoose';
import { Product } from './models/productModel.js';
import dotenv from 'dotenv';
dotenv.config();

const check = async () => {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/Ekart-YT");
    const products = await Product.find().sort({ createdAt: -1 }).limit(5);
    console.log(JSON.stringify(products, null, 2));
    process.exit();
};
check();
