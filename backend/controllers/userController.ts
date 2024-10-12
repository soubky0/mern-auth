import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";

// @desc    Authenticate User
// @route   POST /api/users/auth
// @access  Public
export const authUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: "User Registered" });
});

// @desc    Register User
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const user = await User.create({ name, email, password });
    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Failed to create user");
    }
  }
);

// @desc    Logout User
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: "Logout user" });
});

// @desc    Get User Profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({ message: "Get user profile" });
  }
);

// @desc    Update User Profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({ message: "Update user profile" });
  }
);
