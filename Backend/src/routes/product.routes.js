import { Router } from "express";
import multer from "multer";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import { createProduct } from "../controllers/product.controller.js";
import { createProductValidator } from "../validators/product.validator.js";

const productRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

productRouter.post(
  "/",
  authenticateSeller,
  createProductValidator,
  upload.array("images", 7),
  createProduct,
);

export default productRouter;
