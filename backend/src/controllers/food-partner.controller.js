import { foodPartnerModel } from "../models/foodPartner.model.js";
import { foodModel } from "../models/food.model.js";

const getFoodPartnerById = async (req ,res) => {
    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    const foodItemsByFoodPartner = await foodModel.find({foodPartner: foodPartnerId});

    if(!foodPartner) {
        res.status(404).json({
            message: "Food Partner is not found."
        });
    };

    res.status(200).json({
        message: "Food Partner is retrieved successfully.",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPartner
        }
    });
}

export {
    getFoodPartnerById
}