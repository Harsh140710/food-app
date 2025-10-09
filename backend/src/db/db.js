import mongoose from "mongoose";

const connectDB = () => {
  mongoose.connect("mongodb://localhost:27017/food-app")
    .then(() => {
      console.log("MongoDB Connected. ");
    })
    .catch((err) => {
      console.log("Error : ", err);
    });
};

export default connectDB;