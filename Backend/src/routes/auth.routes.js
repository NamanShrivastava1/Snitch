import { Router } from "express";
import {
  validateLoginUser,
  validateRegisterUser,
} from "../validators/auth.validator.js";
import { loginUser, registerUser } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", validateRegisterUser, registerUser);

authRouter.post("/login", validateLoginUser, loginUser);

export default authRouter;
