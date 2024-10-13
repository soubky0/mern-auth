import { Request } from "express";
import { UserDocument } from "./models/userModel"; // Adjust path based on your project

export interface UserRequest extends Request {
  user?: UserDocument;
}
