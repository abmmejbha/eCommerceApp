import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import { calcPrices } from "../utils/calcPrices.js";

function calcPrice(orderItem) {
  const itemsPrice = orderItems.reduce(acc);
}

// 1. createOrder 
const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ error: "No items found" });
    }

    // Step 1: Fetch the original product data from DB that the client sent
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    // Step 2: Take the price of each item from DB, not from the client
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id,
      );

      if (!matchingItemFromDB) {
        throw new Error(`Product not found: ${itemFromClient._id}`);
      }

      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price, // This is the main trick
        _id: undefined,
      };
    });

    // Step 3: Calculate itemsPrice/tax/shipping/total with this correct price
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; // <-- createOrder function end

// 2. findOrderById 
const findOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email",
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: "Order পাওয়া যায়নি" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3 getUserOrders 
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createOrder, findOrderById, getUserOrders };
