import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["iPhone", "Mac", "iPad", "Watch", "AirPods", "Accessories", "Mobile", "Headphone", "Laptop", "TV"],
    },
    storage: {
      type: String,
      default: "none",
    },
    brand: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      default: 10,
    },
    imagePublicId: {
      type: String,
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true }
      }
    ],
  },

  { timestamps: true }
);

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
