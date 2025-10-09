import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    "96a10a25955716b2e24e72962b5ee71aabfbff12"
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

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password.",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    "96a10a25955716b2e24e72962b5ee71aabfbff12"
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

export { registerUser, loginUser };
