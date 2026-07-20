// Packages
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import dns from 'dns';
import path from 'path';
import cookieParser from 'cookie-parser';
// Middlewares
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import { authenticate, authorizeAdmin } from './middlewares/authMiddleware.js';
// Routes
import productRoutes from "./routes/product.route.js";
import categoryRoutes from "./routes/category.route.js";
import userRoutes from "./routes/user.route.js";
import orderRoutes from './routes/order.route.js'
import uploadRoutes from './routes/upload.route.js';

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const app = express();
connectDB();

const allowedOrigins = [
  process.env.CLIENT_URL || "https://ecommerce-app-mejbha.vercel.app",
  "http://localhost:5173",
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes);

app.use(notFound);
app.use(errorHandler);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});