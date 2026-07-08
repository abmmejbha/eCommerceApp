import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import dns from 'dns';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import { authenticate, authorizeAdmin } from './middlewares/authMiddleware.js';
import productRoutes from "./routes/product.route.js";
import categoryRoutes from "./routes/category.route.js";
import userRoutes from "./routes/user.route.js";
import orderRoutes from './routes/order.route.js'

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const app = express();

connectDB();



app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/orders', orderRoutes)

app.use(notFound);
app.use(errorHandler);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});