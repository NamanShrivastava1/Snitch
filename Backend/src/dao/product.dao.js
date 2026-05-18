import productModel from "../models/product.model.js";

export const stockOfVariant = async (createProductValidator, variantID) => {
  const product = await productModel.findOne({
    _id: productId,
    "variants._id": variantID,
  });

  const stock = product.variants.find(
    (variant) => variant._id.toString() === variantId,
  ).stock;

  return stock;
};
