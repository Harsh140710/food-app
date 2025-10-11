import express from 'express';
import { authFoodPartnerMiddleware, authUserMiddleware } from '../middlewares/auth.middleware.js';
import { createFood, getFoodItem } from '../controllers/food.controller.js';
import multer, { memoryStorage } from 'multer';


const upload = multer({
    storage: memoryStorage(),
})
 
const router = express.Router();


router.post("/", authFoodPartnerMiddleware, upload.single("video"), createFood);
router.get("/", authUserMiddleware, getFoodItem);

export default router;