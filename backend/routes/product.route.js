import express from 'express';
import multer from 'multer';
const router = express.Router();
import {fetchProducts, fetchProductById, addProduct, updateProductDetails, removeProduct} from '../controllers/product.controller.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { fetchTopProducts } from '../controllers/product.controller.js';

router
    .route('/')
    .get(fetchProducts)
    .post(authenticate, authorizeAdmin, multer, addProduct)
    
router.get("/top", fetchTopProducts);

router
    .route('/:id')
    .get(fetchProductById)
    .put(authenticate, authorizeAdmin, multer, updateProductDetails)
    .delete(authenticate, authorizeAdmin, removeProduct)


export default router;