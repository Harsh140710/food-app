import { foodModel } from "../models/food.model.js";

const createFood = async (req, res) => {
//   const { foodName, description } = req.body;
//   const { video } = req.file;

//   if (!foodName || !description || !foodPartner || !video) {
//     res.status(403).json({
//       message: "All Fields are required for creating food",
//     });
//   }
    
  console.log(req.foodPartner);

  res.send("Food item created")
};

export { createFood };
