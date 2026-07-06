import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './routes/user.route.js';
import dns from 'dns';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import { authenticate, authorizeAdmin } from './middleware/authMiddleware.js';
import {productRouter} from './routes/product.route.js';
import productRoutes from "./routes/product.route.js";
import categoryRoutes from "./routes/category.route.js";


dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const app = express();

connectDB();



app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(notFound);
app.use(errorHandler);

app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes);





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});