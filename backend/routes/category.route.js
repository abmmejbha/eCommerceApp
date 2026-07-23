import express from "express";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  removeCategory,
} from "../controllers/category.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(fetchCategories)
  .post(authenticate, authorizeAdmin, createCategory);
router
  .route("/:id")
  .put(authenticate, authorizeAdmin, updateCategory)
  .delete(authenticate, authorizeAdmin, removeCategory);

export default router;
