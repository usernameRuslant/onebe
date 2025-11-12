import { Router } from 'express';
import authenticate from '../middleware/authenticate.js';
import { getCurrentUser } from '../controllers/userControllers.js';

const userRoutes = Router();

userRoutes.get('me', authenticate, getCurrentUser);

export default userRoutes;
