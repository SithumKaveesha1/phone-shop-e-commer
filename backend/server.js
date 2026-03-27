import express from "express";
import'dotenv/config'
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


const PORT = process.env.PORT || 8000; 

// Middleware
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
    console.log(`[REQ] ${req.method} ${req.url}`);
    next();
});

app.use(cors({

  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoute)

app.use('/api/products', productRoute)

// Catch-all 404 for unknown routes (ensure JSON return)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API Route not found"
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('[SERVER ERROR]:', err);
    if (err instanceof multer.MulterError) {
        console.error('[MULTER ERROR]:', err.code, err.field || '');
        return res.status(400).json({ success: false, message: `${err.message} (${err.field || ''})` });
    }
    return res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })


  .catch((err) => {
    console.log("DB connection error:", err.message);
  });
