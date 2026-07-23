import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/profile.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 1. Auth & Public Routes
router.post("/register", registerUser);
router.post("/auth", loginUser);
router.post("/logout", logoutUser);

// 2. Profile Routes
router
  .route("/profile")
  .get(authenticate, getUserProfile)
  .put(authenticate, updateUserProfile);

// 3. Admin Only Routes
router
  .route("/")
  .get(authenticate, authorizeAdmin, getUsers) // GET /api/users
  .post(authenticate, authorizeAdmin, createUser); // POST /api/users

router
  .route("/:id")
  .put(authenticate, authorizeAdmin, updateUser) // PUT /api/users/:id
  .delete(authenticate, authorizeAdmin, deleteUser); // DELETE /api/users/:id

export default router;
