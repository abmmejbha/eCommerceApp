import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/user.controller.js';
import { getUserProfile, updateUserProfile } from '../controllers/profile.controller.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { registerUser, loginUser, logoutUser } from '../controllers/user.controller.js';


const router = express.Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/register', registerUser);
router.post('/auth', loginUser);
router.post("/logout", logoutUser);

router.route("/profile")
    .get(authenticate, getUserProfile)
    .put(authenticate, updateUserProfile)

router.route('/')
    .get(authenticate, authorizeAdmin, getUsers)


export default router;