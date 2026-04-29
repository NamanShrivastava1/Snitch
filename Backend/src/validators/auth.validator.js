import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export const validateRegisterUser = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("contact")
    .notEmpty()
    .withMessage("Contact is required")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Contact must be a valid phone number"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("fullname")
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters long"),

  validateRequest,
];
