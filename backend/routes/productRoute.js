import express from "express";
import { getProducts, seedProducts, getProductById, addProduct, deleteProduct, updateProduct } from "../controllers/productController.js";
import { isAuthenticated, isAdmin } from "../middleware/isAuthenticated.js";
import { upload } from "../utils/cloudinary.js";


const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", isAuthenticated, isAdmin, upload.array('images', 5), addProduct);
router.put("/:id", isAuthenticated, isAdmin, upload.array('images', 5), updateProduct);

router.delete("/:id", isAuthenticated, isAdmin, deleteProduct);
router.post("/seed", seedProducts);


export default router;
