import Category from "../models/category.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const fetchCategories = asyncHandler(async(req, res) => {
    const categories = await Category.find({})
    res.json(categories)
})

export const createCategory = asyncHandler(async(req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Category name is required" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
        return res.status(400).json({ error: "Category already exists" });
    }

    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
});

export const updateCategory = asyncHandler(async(req, res) => {
    const { name } = req.body; 
    if (!name) {
        return res.status(400).json({ error: "Category name is required" });
    }   
    const category = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!category) {
        return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
});

export const removeCategory = asyncHandler(async(req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
        return res.status(404).json({ error: "Category not found" });
    }
    res.json({ message: "Category removed" });
});
