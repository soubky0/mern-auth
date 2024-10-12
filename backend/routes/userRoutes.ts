import { Router } from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController";

const router = Router();

router.post("/", registerUser);
router.post("/logout", logoutUser);
router.post("/auth", authUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);

export default router;
