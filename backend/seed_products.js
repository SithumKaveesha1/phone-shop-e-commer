import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./models/productModel.js";

dotenv.config();

const MONGO_URI = "mongodb+srv://sithumkaveesha1212_db_user:Sithum%401@cluster0.e7swrai.mongodb.net/Ekart-YT?retryWrites=true&w=majority";

const products = [
  // iPhone
  {
    name: "iPhone 16 Pro Max",
    description: "The ultimate iPhone with titanium design and A18 Pro chip.",
    price: 385000,
    category: "iPhone",
    brand: "Apple",
    image: "https://specials-images.forbesimg.com/imageserve/66e076729528646f8ed882f0/Apple-iPhone-16-Pro-Max/960x0.jpg?format=jpg&width=960",
    images: [{ url: "https://specials-images.forbesimg.com/imageserve/66e076729528646f8ed882f0/Apple-iPhone-16-Pro-Max/960x0.jpg?format=jpg&width=960", publicId: "iphone16promax" }]
  },
  {
    name: "iPhone 15",
    description: "New design, Dynamic Island, and 48MP main camera.",
    price: 245000,
    category: "iPhone",
    brand: "Apple",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=2560&hei=1440&fmt=p-jpg&qlt=95&.v=1692923777972",
    images: [{ url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=2560&hei=1440&fmt=p-jpg&qlt=95&.v=1692923777972", publicId: "iphone15" }]
  },
  // Mac
  {
    name: "MacBook Pro M3 Max",
    description: "The most powerful laptop ever with up to 128GB RAM.",
    price: 980000,
    category: "Mac",
    brand: "Apple",
    image: "https://www.apple.com/v/macbook-pro/al/images/overview/welcome/welcome_hero_endframe__cbraw9v8m7u6_large.jpg",
    images: [{ url: "https://www.apple.com/v/macbook-pro/al/images/overview/welcome/welcome_hero_endframe__cbraw9v8m7u6_large.jpg", publicId: "macbookprom3" }]
  },
  {
    name: "MacBook Air M3",
    description: "Supercharged by M3, incredibly thin, and all-day battery.",
    price: 365000,
    category: "Mac",
    brand: "Apple",
    image: "https://www.apple.com/v/macbook-air/s/images/overview/design/design_hero__e65vj3ix9jme_large.jpg",
    images: [{ url: "https://www.apple.com/v/macbook-air/s/images/overview/design/design_hero__e65vj3ix9jme_large.jpg", publicId: "macbookairm3" }]
  },
  // iPad
  {
    name: "iPad Pro M4",
    description: "The thinnest Apple product ever, with Tandem OLED display.",
    price: 425000,
    category: "iPad",
    brand: "Apple",
    image: "https://www.apple.com/v/ipad-pro/aq/images/overview/closer-look/performance_hero__6m1d3k598mq6_large.jpg",
    images: [{ url: "https://www.apple.com/v/ipad-pro/aq/images/overview/closer-look/performance_hero__6m1d3k598mq6_large.jpg", publicId: "ipadprom4" }]
  },
  // Watch
  {
    name: "Apple Watch Ultra 2",
    description: "The most rugged and capable Apple Watch ever.",
    price: 285000,
    category: "Watch",
    brand: "Apple",
    image: "https://www.apple.com/v/apple-watch-ultra-2/e/images/overview/design/titanium_hero__eonqsqm3x9ue_large.jpg",
    images: [{ url: "https://www.apple.com/v/apple-watch-ultra-2/e/images/overview/design/titanium_hero__eonqsqm3x9ue_large.jpg", publicId: "watchultra2" }]
  },
  // AirPods
  {
    name: "AirPods Pro 2nd Gen",
    description: "Magical audio with 2x more Active Noise Cancellation.",
    price: 65000,
    category: "AirPods",
    brand: "Apple",
    image: "https://www.apple.com/v/airpods-pro/h/images/overview/magical-experience/case_hero__ex6j2f8z082a_large.jpg",
    images: [{ url: "https://www.apple.com/v/airpods-pro/h/images/overview/magical-experience/case_hero__ex6j2f8z082a_large.jpg", publicId: "airpodspro2" }]
  },
  // Accessories
  {
    name: "Magic Mouse",
    description: "Wireless and rechargeable, with a Multi-Touch surface.",
    price: 28000,
    category: "Accessories",
    brand: "Apple",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MK2E3?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1626420542000",
    images: [{ url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MK2E3?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1626420542000", publicId: "magicmouse" }]
  }
];

const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected for Seeding...");
        
        // Count products before seeding
        const existingProducts = await Product.countDocuments();
        console.log(`Found ${existingProducts} existing products.`);
        
        // Insert dummy products
        await Product.insertMany(products);
        console.log(`${products.length} Products Seeded successfully!`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
