import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import { foodPartnerModel } from "../models/foodPartner.model.js";

// normal user register
const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email) {
    return res.status(401).json({
      message: "FullName and Email is required.",
    });
  }

  const isUserAlreadyExists = await userModel.findOne({
    email,
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User is already Exists.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (password.length <= 6) {
    return res.status(401).json({
      message: "Password length must be greater than 6.",
    });
  }

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "User Registered Successfully.",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
};

// normal user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      message: "Email and Password is Required for Login.",
    });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password.",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password.",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Logged in Successfully.",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
};

// normal user logout
const logOutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(201).json({
    message: "User logged out successfully.",
  });
};

// food partner register
const foodPartnerRegister = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(401).json({
      message: "All fields are required.",
    });
  }

  const isFoodPartnerExists = await foodPartnerModel.findOne({
    email,
  });

  if (isFoodPartnerExists) {
    res.status(402).json({
      message: "Food Partner is already exists.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (password.length <= 6) {
    return res.status(402).json({
      message: "Password length must be greater than 6.",
    });
  }

  const foodPartner = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "Food partner is registered successfully.",
    foodPartner: {
      id: foodPartner._id,
      name: foodPartner.name,
      email: foodPartner.email,
    },
  });
};

// food partner login
const foodPartnerLogin = async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(401).json({
      message: "Email and Password is Required for Login.",
    });
  }

  const foodPartner = await foodPartnerModel.findOne({ email });

  if(!foodPartner) {
    res.status(401).json({
      message: "Email and Password is not valid.",
    });
  };

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

  if(!isPasswordValid) {
    res.status(401).json({
      message: "Email and Password is not valid.",
    });
  };


  const token = jwt.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "Food Partner Logged in Successfully.",
    foodPartner: {
      _id: foodPartner._id,
      email: foodPartner.email,
      name: foodPartner.name,
    },
  });
};

// food partner logout
const logOutFoodPartner = async (req, res) => {
  res.clearCookie("token");
  res.status(201).json({
    message: "Food Partner logged out successfully.",
  });
};

export { registerUser, loginUser, logOutUser, foodPartnerRegister, foodPartnerLogin, logOutFoodPartner };
