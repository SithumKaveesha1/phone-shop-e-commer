import { Product } from "../models/productModel.js";
import { cloudinary } from "../utils/cloudinary.js";

const MOCK_PRODUCTS = [
  { name: 'iPhone Air 256 GB: Thinnest iPhone Ever', price: 119901, category: 'Mobile', brand: 'Apple', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&q=80' },
  { name: 'iPhone 17 Pro 1 TB: 15.93 cm (6.3)', price: 174900, category: 'Mobile', brand: 'Apple', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80' },
  { name: 'boAt Rockerz 421 (2025 Launch), 40Hr', price: 2999, category: 'Headphone', brand: 'boAt', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80' },
  { name: 'Apple 2025 MacBook Air (13-inch)', price: 83990, category: 'Laptop', brand: 'Apple', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80' },
  { name: 'Samsung Galaxy S24 Ultra 5G AI', price: 74999, category: 'Mobile', brand: 'Samsung', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80' },
  { name: 'Samsung 108 cm (43 inches) Crystal 4K', price: 26990, category: 'TV', brand: 'Samsung', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80' },
  { name: 'OnePlus Nord Buds 2r True Wireless', price: 1399, category: 'Headphone', brand: 'OnePlus', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80' },
  { name: 'HP 15, 13th Gen Intel Core i5-1334U', price: 51990, category: 'Laptop', brand: 'HP', image: 'https://images.unsplash.com/photo-1531297179061-0b5c1addb50a?w=500&q=80' },
  { name: 'ASUS Vivobook 15, Smartchoice, Intel', price: 48990, category: 'Laptop', brand: 'ASUS', image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&q=80' },
  { name: 'OnePlus 13R | Smarter with OnePlus AI', price: 38990, category: 'Mobile', brand: 'OnePlus', image: 'https://images.unsplash.com/photo-1598327105666-5b89351cb31b?w=500&q=80' },
];

export const getProducts = async (req, res) => {
  try {
    console.log("Fetching collection:", Product.collection.name);
    const products = await Product.find({}).sort({ createdAt: -1 });
    console.log("Total products in store:", products.length);
    return res.status(200).json({ success: true, products });
  } catch (error) {

    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const seedProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(MOCK_PRODUCTS);
    return res.status(201).json({ success: true, message: "Products seeded!", products: createdProducts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand } = req.body;
    
    if (!name || !price || !category || !brand) {
      return res.status(400).json({ success: false, message: "Name, Price, Category, and Brand are required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "At least one product image is required" });
    }

    const imagesArray = req.files.map(file => ({
      url: `http://localhost:8005/uploads/${file.filename}`,
      publicId: file.filename
    }));

    const newProduct = await Product.create({
      name,
      description,
      price: Number(price),
      image: imagesArray[0].url,
      imagePublicId: imagesArray[0].publicId,
      images: imagesArray,
      category,
      brand
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully!",
      product: newProduct
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, brand } = req.body;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const updateData = {
            name: name || product.name,
            description: description || product.description,
            price: price ? Number(price) : product.price,
            category: category || product.category,
            brand: brand || product.brand
        };

        if (req.files && req.files.length > 0) {
            // Remove OLD images from local storage
            for (const img of product.images) {
                await cloudinary.uploader.destroy(img.publicId);
            }
            // Also destroy single publicId if it exists and not in images array (unlikely but safe)
            if (product.imagePublicId && !product.images.find(i => i.publicId === product.imagePublicId)) {
                await cloudinary.uploader.destroy(product.imagePublicId);
            }

            const imagesArray = req.files.map(file => ({
              url: `http://localhost:8005/uploads/${file.filename}`,
              publicId: file.filename
            }));

            updateData.image = imagesArray[0].url;
            updateData.imagePublicId = imagesArray[0].publicId;
            updateData.images = imagesArray;
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

        return res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            product: updatedProduct
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Delete all images from local storage safely
    if (product.images && product.images.length > 0) {
        for (const img of product.images) {
            if (img.publicId) {
                await cloudinary.uploader.destroy(img.publicId);
            }
        }
    } else if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
    }

    await Product.findByIdAndDelete(req.params.id);
    
    return res.status(200).json({ success: true, message: "Product deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



