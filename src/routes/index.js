import express from 'express';

import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import recipeRoutes from './recipeRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import ingredientRoutes from './ingredientRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/categories', categoryRoutes);
router.use('/ingredients', ingredientRoutes);

export default router;
