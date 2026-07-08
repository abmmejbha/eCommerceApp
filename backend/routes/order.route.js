import express from 'express'
import {createOrder} from "../controllers/order.controller.js"
import {authenticate} from '../middlewares/authMiddleware.js'
import {getUserOrders, findOrderById} from "../controllers/order.controller.js"

const router = express.Router()


router.route('/').post(authenticate, createOrder)
router.route("/mine").get(authenticate, getUserOrders);
router.route("/:id").get(authenticate, findOrderById);




export default router