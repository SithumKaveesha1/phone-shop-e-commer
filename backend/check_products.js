import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./models/productModel.js";

dotenv.config();

const MONGO_URI = "mongodb+srv://sithumkaveesha1212_db_user:Sithum%401@cluster0.e7swrai.mongodb.net/Ekart-YT?retryWrites=true&w=majority";

const checkProducts = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        const products = await Product.find({}, 'name category price');
        console.log("Current Products in DB:");
        console.table(products.map(p => ({ name: p.name, category: p.category, price: p.price })));
        process.exit();
    } catch (error) {
        console.error("Error checking products:", error);
        process.exit(1);
    }
};

checkProducts();
