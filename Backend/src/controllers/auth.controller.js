import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";

async function sendTokenResponse(user, res) {
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.status(200).json({ token });
}

export const registerUser = async (req, res) => {
  const { email, contact, password, fullname } = req.body;

  try {
    const existingUser = await userModel.findOne({
      $or: [{ email }, { contact }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or contact already exists" });
    }

    const user = userModel.create({
      email,
      contact,
      password,
      fullname,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user" });
  }
};
