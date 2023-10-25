import * as express from "express";
const router = express.Router();
import { registerUser, loginUser,logoutUser } from "../controllers/authController";

export default router;

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
