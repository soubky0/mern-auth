import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import { UserDocument } from "../models/userModel";
import { Request, Response, NextFunction } from "express";
import { UserRequest } from "../types";

const protect = asyncHandler(
  async (req: UserRequest, res: Response, next: NextFunction) => {
    let token = req.cookies.jwt;

    if (token) {
      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("JWT_SECRET not defined");

      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

      const user = await User.findById(decoded.userId);

      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

export { protect };
