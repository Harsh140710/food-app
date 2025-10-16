import { foodModel } from "../models/food.model.js";
import { likesModel } from "../models/likes.model.js";
import { saveModel } from "../models/save.model.js";
import { userModel } from "../models/user.model.js";
import { uploadFile } from "../services/storage.service.js";
import { v4 as uuidV4 } from "uuid";

const createFood = async (req, res) => {
  const { name, description } = req.body;

  console.log(req.file);
  const fileUploadedResult = await uploadFile(req.file.buffer, uuidV4());

  const foodItem = await foodModel.create({
    name: name,
    description: description,
    video: fileUploadedResult.url,
    foodPartner: req.foodPartner._id,
  });

  res.status(201).json({
    message: "Food item is cerated successfully.",
    foodItem,
  });
};

const getFoodItem = async (req, res) => {
  const foodItems = await foodModel.find({});

  res.status(200).json({
    message: "Food items fetched successfully.",
    foodItems,
  });
};

const likeFood = async (req, res) => {
  const { foodId } = req.body;

  if (!foodId) {
    return res.status(400).json({ message: "Food id is required." });
  }

  const user = req.user;

  const isAlreadyLiked = await likesModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadyLiked) {
    await likesModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: -1 },
    });

    return res.status(200).json({
      success: true,
      liked: false,
      message: "Food disliked Successfully.",
    });
  }

  const like = await likesModel.create({
    user: user._id,
    food: foodId,
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { likeCount: 1 },
  });

  res.status(201).json({
    success: true,
    liked: true,
    message: "Food liked successfully.",
    like,
  });
};

const saveFood = async (req, res) => {
  const { foodId } = req.body;

  if (!foodId) {
    return res.status(400).json({ message: "Food id is required." });
  }

  const user = req.user;

  const isAlreadySaved = await saveModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadySaved) {
    await saveModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { saveCount: -1 },
    });

    return res.status(200).json({
      success: true,
      saved: false,
      message: "Food unsaved Successfully.",
    });
  }

  const save = await saveModel.create({
    user: user._id,
    food: foodId,
  });

  await foodModel.findByIdAndUpdate(foodId, {
    $inc: { saveCount: 1 },
  });

  res.status(201).json({
    success: true,
    saved: true,
    message: "Food saved successfully.",
    save,
  });
};

const getSavedFood = async (req, res) => {
  const user = req.user;

  const savedFoods = await saveModel.find({ user: user._id }).populate("food");

  if (!savedFoods || savedFoods.length === 0) {
    return res.status(404).json({
      message: "No saved foods found",
    });
  }

  res.status(200).json({
    message: "Saved food retrieved successfully.",
    savedFoods,
  });
};

export { createFood, getFoodItem, likeFood, saveFood, getSavedFood };
