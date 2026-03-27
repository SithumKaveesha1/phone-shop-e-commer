import mongoose from 'mongoose';
import '../backend/models/productModel.js'; // Ensure schema is loaded
const Product = mongoose.model('Product');

const check = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Ekart-YT");
        console.log("Connected to DB");
        const product = await Product.findOne().sort({ _id: -1 });
        if (product) {
            console.log("LATEST PRODUCT:", JSON.stringify(product, null, 2));
        } else {
            console.log("No products found");
        }
        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};
check();
