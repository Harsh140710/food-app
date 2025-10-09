import express from 'express';
import { authFoodPartnerMiddleware } from '../middlewares/auth.middleware.js';
import { createFood } from '../controllers/food.controller.js';

const router = express.Router();


router.post("/create", authFoodPartnerMiddleware, createFood);

export default router;