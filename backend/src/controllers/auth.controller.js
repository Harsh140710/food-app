import { userModel } from "../models/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    
    const {fullName, email, password} = req.body;

    if(!fullName || !email) {
        return res.status(401).json({
            message: "FullName and Email is required."
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        email
    });

    if(isUserAlreadyExists) {
        return res.status(400).json({
            message: "User is already Exists."
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id
    }, )

    return res.status(200).json({
        message: "User Registered Successfully.",
        user
    })
}