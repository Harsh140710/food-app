import mongoose from "mongoose";

const foodPartnerSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const foodPartnerModel = mongoose.model(
  "foodPartner",
  foodPartnerSchema
);
