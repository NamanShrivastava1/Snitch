import { Router } from "express";
import multer from "multer";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  getAllProducts,
  getAllProductsBySeller,
} from "../controllers/product.controller.js";
import { createProductValidator } from "../validators/product.validator.js";

const productRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});
/**
 * @route POST /api/products
 * @desc Create a new product
 * @access Private (Seller only)
 */
productRouter.post(
  "/",
  authenticateSeller,
  upload.array("images", 7),
  createProductValidator,
  createProduct,
);

/**
 * @route GET /api/products/seller
 * @desc Get all products for a specific seller
 * @access Private (Seller only)
 */
productRouter.get("/seller", authenticateSeller, getAllProductsBySeller);

/**
 * @route GET /api/products
 * @desc Get all products
 * @access Public
 */
productRouter.get("/", getAllProducts);

export default productRouter;
