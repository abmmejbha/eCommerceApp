import express from "express";
import multer from "multer";
const router = express.Router();
import {
  fetchProducts,
  fetchProductById,
  addProduct,
  updateProductDetails,
  removeProduct,
} from "../controllers/product.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { fetchTopProducts } from "../controllers/product.controller.js";
import formidable from "express-formidable";

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

router.get("/top", fetchTopProducts);

router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

export default router;
