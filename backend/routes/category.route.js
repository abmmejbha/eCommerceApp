import express from 'express';
import { fetchCategories } from '../controllers/category.controller.js';

const router = express.Router();

router.route('/').get(fetchCategories);

export default router