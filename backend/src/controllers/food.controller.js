import { foodModel } from "../models/food.model.js";
import { uploadFile } from "../services/storage.service.js";
import { v4 as uuidV4 } from "uuid";

const createFood = async (req, res) => {
  const { name, description } = req.body;

  console.log(req.file)
  const fileUploadedResult = await uploadFile(req.file.buffer, uuidV4());

  const foodItem = await foodModel.create({
    name: name,
    description: description,
    video: fileUploadedResult.url,
    foodPartner: req.foodPartner._id
  });

  res.status(201).json({
    message: "Food item is cerated successfully.",
    foodItem
  });
};

const getFoodItem = async (req, res) => {
  const foodItems = await foodModel.find({});

  res.status(200).json({
    message: "Food items fetched successfully.",
    foodItems
  })
}

export { createFood, getFoodItem };
