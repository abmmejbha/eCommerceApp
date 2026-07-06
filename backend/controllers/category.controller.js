import Category from "../models/category.model.js";

export const fetchCategories = asyncHandler(async(req, res) => {
    const categories = await Category.find({})
    res.json(categories)
})

