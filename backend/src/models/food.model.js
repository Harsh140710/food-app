import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    video: {
      type: String,
      required: true,
    },

    foodPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodPartner"
    }
  },
  {
    timestamps: true,
  }
);

export const foodModel = mongoose.model("food", foodSchema)