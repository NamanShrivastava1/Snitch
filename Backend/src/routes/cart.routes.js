import express from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import {
  validateAddToCart,
  validateIncrementCartItemQuantity,
} from "../validators/cart.validator.js";
import {
  addToCart,
  createOrderController,
  getCart,
  incrementCartItemQuantity,
  verifyOrderController,
} from "../controllers/cart.controller.js";
const cartRouter = express.Router();

/**
 * @route POST /api/cart/add/:productId/:variantId
 * @desc Add items to cart
 * @access Private
 * @argument productId - ID of product to add
 * @argument VariantId - ID of variant to add
 * @argument quantity - Quantity of the item to add (optional, default: 1)
 */
cartRouter.post(
  "/add/:productId/:variantId",
  authenticateUser,
  validateAddToCart,
  addToCart,
);

/**
 * @route POST /api/cart/
 * @desc Get user's cart
 * @access Private
 */
cartRouter.get("/", authenticateUser, getCart);

/**
 * @route PATCH /api/cart/quantity/increment/:productId/:variantId
 * @desc Update item quantity in cart
 * @access Private
 * @argument productId - ID of product to add
 * @argument VariantId - ID of variant to add
 * @argument quantity - New quantity of item (required)
 */
cartRouter.patch(
  "/quantity/increment/:productId/:variantId",
  authenticateUser,
  validateIncrementCartItemQuantity,
  incrementCartItemQuantity,
);

/**
 * @route PATCH /api/cart/payment/create/order
 */
cartRouter.post(
  "/payment/create/order",
  authenticateUser,
  createOrderController,
);

cartRouter.post(
  "/payment/verify/order",
  authenticateUser,
  verifyOrderController,
);

export default cartRouter;
