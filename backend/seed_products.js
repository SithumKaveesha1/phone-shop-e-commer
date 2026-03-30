import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./models/productModel.js";

dotenv.config();

const MONGO_URI = "mongodb+srv://sithumkaveesha1212_db_user:Sithum%401@cluster0.e7swrai.mongodb.net/Ekart-YT?retryWrites=true&w=majority";

const products = [
  // iPhones
  { 
    name: "iPhone 16 Pro Max", 
    description: "Titanium, A18 Pro, 5x Telephoto", 
    price: 409990, 
    category: "iPhone", 
    brand: "Apple", 
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-1-202409?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1723146433543", 
    colors: ["#D1BBB0", "#BEBEBE", "#F2F2F2", "#3C3C3D"],
    images: [
      { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-1-202409?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1723146433543", publicId: "desert" },
      { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-2-202409?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1723146433543", publicId: "natural" },
      { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-5-202409?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1723146433543", publicId: "white" },
      { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-6-202409?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1723146433543", publicId: "black" }
    ] 
  },
  { name: "iPhone 16 Pro", description: "Pro cameras, Pro performance", price: 349990, category: "iPhone", brand: "Apple", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-select-202409?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1723146433543", images: [{url: "...", publicId: "..."}] },
  { name: "iPhone 16 Plus", description: "Bigger screen, better battery", price: 284900, category: "iPhone", brand: "Apple", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch?wid=2560&hei=1440&fmt=p-jpg&qlt=95&.v=1692923777972", images: [{url: "...", publicId: "..."}] },
  { 
    name: "iPhone 16", 
    description: "Everything you need and more", 
    price: 239990, 
    category: "iPhone", 
    brand: "Apple", 
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1724688741366", 
    colors: ["#637599", "#78948F", "#D597A8", "#F2F2F2", "#3C3C3D"],
    images: [
      { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1724688741366", publicId: "ultramarine" },
      { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-teal?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1724688742878", publicId: "teal" },
      { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-pink?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1724688740510", publicId: "pink" },
      { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-white?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1724688740130", publicId: "white" },
      { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-black?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1724688741334", publicId: "black" }
    ] 
  },
  { name: "iPhone 15 Pro Max", description: "A17 Pro Titanium beauty", price: 374990, category: "iPhone", brand: "Apple", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-blacktitanium?wid=2560&hei=1440&fmt=p-jpg&qlt=95&.v=1692846357018", images: [{url: "...", publicId: "..."}] },
  { name: "iPhone 15", description: "Dynamic Island, 48MP Camera", price: 245000, category: "iPhone", brand: "Apple", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=2560&hei=1440&fmt=p-jpg&qlt=95&.v=1692923777972", images: [{url: "...", publicId: "..."}] },
  { name: "iPhone 14", description: "Still a classic powerhouse", price: 184990, category: "iPhone", brand: "Apple", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-blue?wid=2560&hei=1440&fmt=p-jpg&qlt=95&.v=1661026582305", images: [{url: "...", publicId: "..."}] },
  { name: "iPhone 13", description: "Incredible value, amazing battery", price: 154990, category: "iPhone", brand: "Apple", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-blue?wid=2560&hei=1440&fmt=p-jpg&qlt=95&.v=1654900508544", images: [{url: "...", publicId: "..."}] },

  // Macs
  { name: "MacBook Pro 16 M3 Max", description: "Unstoppable performance", price: 1249990, category: "Mac", brand: "Apple", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-pro-16-select-m3-max-spaceblack-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290", images: [{url: "...", publicId: "..."}] },
  { 
    name: "MacBook Pro 14 M3", 
    description: "Built for creators", 
    price: 549000, 
    category: "Mac", 
    brand: "Apple", 
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202310?wid=904&hei=840&fmt=p-jpg&qlt=95&.v=1697311054290",
    colors: ["#2E2E2E", "#E3E3E3"], // Space Black, Silver
    images: [
      { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202310?wid=904&hei=840&fmt=p-jpg&qlt=95&.v=1697311054290", publicId: "spaceblack" },
      { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-silver-select-202310?wid=904&hei=840&fmt=p-jpg&qlt=95&.v=1697311054320", publicId: "silver" }
    ]
  },
  { 
    name: "MacBook Air 13 M3", 
    description: "Thinner, lighter, faster", 
    price: 369000, 
    category: "Mac", 
    brand: "Apple", 
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=904&hei=840&fmt=p-jpg&qlt=95&.v=1708364044110",
    colors: ["#2E3641", "#F2E4CE", "#545456", "#E3E3E3"], // Midnight, Starlight, Space Gray, Silver
    images: [
      { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=904&hei=840&fmt=p-jpg&qlt=95&.v=1708364044110", publicId: "midnight" },
      { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-starlight-select-202402?wid=904&hei=840&fmt=p-jpg&qlt=95&.v=1708364044110", publicId: "starlight" },
      { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-spacegray-select-202402?wid=904&hei=840&fmt=p-jpg&qlt=95&.v=1708364044110", publicId: "spacegray" },
      { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-silver-select-202402?wid=904&hei=840&fmt=p-jpg&qlt=95&.v=1708364044110", publicId: "silver" }
    ]
  },
  { name: "iMac 24 M3", description: "Colorful, powerful, all-in-one", price: 429000, category: "Mac", brand: "Apple", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202310?wid=904&hei=840&fmt=p-jpg&qlt=95&.v=1697305316985", images: [{url: "...", publicId: "..."}] },
  { name: "Mac Mini M2", description: "Tiny footprint, giant performance", price: 215000, category: "Mac", brand: "Apple", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-mini-hero-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1670038220710", images: [{url: "...", publicId: "..."}] },

  // iPads
  { name: "iPad Pro 13-inch M4", description: "Thinner than thin", price: 425000, category: "iPad", brand: "Apple", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-m4-finish-select-202405-spaceblack-wifi?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1713302525141", images: [{url: "...", publicId: "..."}] },
  { name: "iPad Air 11-inch M2", description: "Performance in the air", price: 245000, category: "iPad", brand: "Apple", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-select-202405-11inch-blue-wifi?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1713302525141", images: [{url: "...", publicId: "..."}] },
  { name: "iPad Mini 6", description: "Mega power, mini sized", price: 185000, category: "iPad", brand: "Apple", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-select-202109?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1631751017000", images: [{url: "...", publicId: "..."}] },

  // Watch
  { name: "Watch Ultra 2", description: "Adventure ready", price: 284900, category: "Watch", brand: "Apple", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/adventure-ultra-2-finish-select-202409-49mm-natural-titanium-alpine-loop-navy-s?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1724424368143", images: [{url: "...", publicId: "..."}] },
  { name: "Watch Series 10", description: "Thinner, faster, brighter", price: 164900, category: "Watch", brand: "Apple", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/s10-alum-jet-black-sport-band-black-s10?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1724874400511", images: [{url: "...", publicId: "..."}] },

  // AirPods & Others
  { name: "AirPods Pro 2", description: "Magic audio", price: 74900, category: "AirPods", brand: "Apple", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1694014871985", images: [{url: "...", publicId: "..."}] },
  { 
    name: "AirPods Max", 
    description: "Studio sound reinvented", 
    price: 184900, 
    category: "AirPods", 
    brand: "Apple", 
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-202409-midnight?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1724927449514",
    colors: ["#3C3C3D", "#E3DECC", "#637599", "#786E83", "#E9A083"], // Midnight, Starlight, Blue, Purple, Orange
    images: [
      { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-202409-midnight?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1724927449514", publicId: "midnight" },
      { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-202409-starlight?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1724927448259", publicId: "starlight" },
      { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-202409-blue?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1724927448373", publicId: "blue" },
      { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-202409-purple?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1724927448550", publicId: "purple" },
      { url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-202409-orange?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1724927448726", publicId: "orange" }
    ]
  },

  // Accessories
  { 
    name: "iPhone 16 Pro MagSafe Silicone Case", 
    description: "Midnight, Silky-soft finish, MagSafe", 
    price: 18900, 
    category: "Accessories", 
    brand: "Apple", 
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MYT73?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1723835694119", 
    colors: ["#3C3C3D", "#637599", "#78948F"], // Midnight, Ultramarine, Teal
    images: [{url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MYT73?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1723835694119", publicId: "midnight"}] 
  },
  { 
    name: "MagSafe Charger", 
    description: "Fast wireless charging up to 15W", 
    price: 14900, 
    category: "Accessories", 
    brand: "Apple", 
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1600366914000", 
    images: [{url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1600366914000", publicId: "magsafe"}] 
  },
  { 
    name: "20W USB-C Power Adapter", 
    description: "Fast, efficient charging", 
    price: 9500, 
    category: "Accessories", 
    brand: "Apple", 
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MU7W2?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1537233802052", 
    images: [{url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MU7W2?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1537233802052", publicId: "adapter"}] 
  },
  { 
    name: "AirTag (4 Pack)", 
    description: "Lose your knack for losing things", 
    price: 36900, 
    category: "Accessories", 
    brand: "Apple", 
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX542?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1617761671000", 
    images: [{url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX542?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1617761671000", publicId: "airtag"}] 
  },
  { 
    name: "FineWoven Wallet with MagSafe", 
    description: "Midnight, Supports Find My", 
    price: 21900, 
    category: "Accessories", 
    brand: "Apple", 
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MT243?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1693003923308", 
    colors: ["#3C3C3D", "#4C3E3A", "#535C4E"], // Midnight, Mulberry, Evergreen
    images: [{url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MT243?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1693003923308", publicId: "wallet"}] 
  }
];

const seedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected...");
        await Product.deleteMany({}); // Clear existing to prevent duplicates
        console.log("Deleted old products.");
        await Product.insertMany(products);
        console.log(`${products.length} Products Seeded successfully!`);
        process.exit();
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
