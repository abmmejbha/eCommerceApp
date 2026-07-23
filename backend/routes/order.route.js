import express from "express";
import {
  createOrder,
  findOrderById,
  getUserOrders,
  getOrders,
} from "../controllers/order.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizeAdmin, getOrders);
router.route("/mine").get(authenticate, getUserOrders);
router.route("/:id").get(authenticate, findOrderById);

export default router;