import express from 'express';
import { foodPartnerLogin, foodPartnerRegister, loginUser, logOutFoodPartner, logOutUser, registerUser } from '../controllers/auth.controller.js';

const router = express.Router();

// create routes here

// normal user routes
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", logOutUser);


// food partner routes
router.post("/food-partner/register", foodPartnerRegister);
router.post("/food-partner/login", foodPartnerLogin);
router.get("/food-partner/logout", logOutFoodPartner);


export default router;