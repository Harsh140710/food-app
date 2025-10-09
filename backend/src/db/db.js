import mongoose from "mongoose";

const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("MongoDB Connected. ");
    })
    .catch((err) => {
      console.log("Error : ", err);
    });
};

export default connectDB;