import { Router } from "express";
import {
  validateLoginUser,
  validateRegisterUser,
} from "../validators/auth.validator.js";
import {
  loginUser,
  registerUser,
  googleAuthCallback,
  getMe,
} from "../controllers/auth.controller.js";
import passport from "passport";
import { config } from "../config/config.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

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

/**
 * @route GET /api/auth/me
 * @desc Get current logged in user
 * @access Private
 */
authRouter.get("/me", authenticateUser, getMe);

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
