import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/product.model.js';

// Create a new product 
export const addProduct = asyncHandler(async (req, res) => {

    const {name, description, price, quantity, category, image} = req.fields;

    if(!name || !description || !price || !quantity || !category){
        return res.status(400).json({error: "All fields are required"})
    }

    const product = new Product({... req.fields})
    await product.save()
    res.status(201).json(product)
})

// Read one product by ID
export const fetchProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error('Product not found')
    }
    res.json(product)
})

// Read all products
export const fetchProducts = asyncHandler(async (req, res) => {
    const pageSize = 6
    const keyword = req.query.keyword 
        ? { name: { $regex: req.query.keyword, $options: "i"}}
        : {}

    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize)

    res.json({products, page: 1, pages: Math.ceil(count / pageSize)})
})

//Update
export const updateProductDetails = asyncHandler(async(req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id, 
        {...req.fields}, 
        {new: true})
    res.json(product)
})

//Delete
export const removeProduct = asyncHandler(async(req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    if(!product){
        res.status(404)
        throw new Error('Product not found')
    }
    res.json({message: 'Product removed'})
})
