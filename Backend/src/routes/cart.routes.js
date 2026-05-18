import express from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validateAddToCart } from "../validators/cart.validator.js";
import { addToCart } from "../controllers/cart.controller.js";
const cartRouter = express.Router();

/**
 * @route POST /api/cart/add/:productId/:variantId
 * @desc Add items to cart
 * @access Private
 * @argument productId - ID of product to add
 * @argument VariantId - ID of variant to add
 * @argument quantity - Quantity of the item to add (optional, default: 1)
 */
cartRouter.post("/", authenticateUser, validateAddToCart, addToCart);

export default cartRouter;
