import express from 'express';
import { foodPartnerRegister, loginUser, logOutUser, registerUser } from '../controllers/auth.controller.js';

const router = express.Router();

// create routes here

// normal user routes
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", logOutUser);


// food partner routes
router.post("/food-partner/register", foodPartnerRegister);


export default router;