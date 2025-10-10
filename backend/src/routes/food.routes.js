import express from 'express';
import { authFoodPartnerMiddleware } from '../middlewares/auth.middleware.js';
import { createFood } from '../controllers/food.controller.js';
import multer, { memoryStorage } from 'multer';


const upload = multer({
    storage: memoryStorage(),
})
 
const router = express.Router();


router.post("/", authFoodPartnerMiddleware, upload.single("video"), createFood);

export default router;