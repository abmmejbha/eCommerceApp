import express from 'express';
import multer from 'multer';
const router = express.Router();

router
    .route('/')
    .get(fetchProducts)
    .post(authenticate, authorizeAdmin, multer(), addProduct)

router
    .route('/:id')
    .get(fetchProductById)
    .put(authenticate, authorizeAdmin, multer(), updateProductDetails)
    .delete(authenticate, authorizeAdmin, removeProduct)

export default router;