import { Router } from "express";
import {
  validateLoginUser,
  validateRegisterUser,
} from "../validators/auth.validator.js";
import {
  loginUser,
  registerUser,
  googleAuthCallback,
} from "../controllers/auth.controller.js";
import passport from "passport";
import { config } from "../config/config.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", validateRegisterUser, registerUser);

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post("/login", validateLoginUser, loginUser);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect:
      config.NODE_ENV === "development"
        ? "http://localhost:5173/login"
        : "/login",
  }),
  googleAuthCallback,
);

export default authRouter;
