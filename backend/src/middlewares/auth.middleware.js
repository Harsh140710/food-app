import { foodPartnerModel } from "../models/foodPartner.model.js";
import { userModel } from "../models/user.model.js"
import jwt from 'jsonwebtoken';

const authFoodPartnerMiddleware = async (req, res, next) => {

    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message: "Please login first",
        });
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const foodPartner = await foodPartnerModel.findById(decoded.id);

        req.foodPartner = foodPartner;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Token is not valid",
        });
    };
};

const authUserMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        res.status(402).json({
            message: "Please Login user first"
        });
    };

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        req.user = user;

        next();

    } catch (error) {
        res.status(402).json({
            message: "Invalid token"
        })
    }
}

export {
    authFoodPartnerMiddleware,
    authUserMiddleware
}