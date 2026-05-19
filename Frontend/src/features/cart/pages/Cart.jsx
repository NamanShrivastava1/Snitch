import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCart } from "../hook/usecart";
import { Link, useNavigate } from "react-router";

const tokens = {
  surface: "#fbf9f6",
  surfaceLow: "#f5f3f0",
  surfaceLowest: "#ffffff",
  surfaceHigh: "#eae8e5",
  surfaceHighest: "#e4e2df",
  onSurface: "#1b1c1a",
  secondary: "#7A6E63",
  muted: "#B5ADA3",
  primary: "#C9A96E",
  outlineVariant: "#d0c5b5",
};

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const { handleGetCart, handleIncrementCartItem } = useCart();

  const navigate = useNavigate();

  console.log(cart)

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    handleGetCart();
  }, []);

  const changeQty = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] ?? 1) + delta),
    }));
  };

  const getVariantDetails = (product, variantId) => {
    if (!product?.variants || !variantId) return null;

    return product.variants.find(
      (variant) => variant._id.toString() === variantId.toString(),
    );
  };

  const getDisplayImage = (product, variant) => {
    if (variant?.images?.length) {
      return variant.images[0].url;
    }

    if (product?.images?.length) {
      return product.images[0].url;
    }

    return null;
  };

  const formatCurrency = (amount, currency = "INR") =>
    `${currency} ${Number(amount).toLocaleString("en-IN")}`;

  if (!cart?.items?.length) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: tokens.surface }}
      >
        <div className="text-center">
          <h1 className="text-5xl mb-4">Your Cart is Empty</h1>

          <Link
            to="/"
            className="px-6 py-3 text-white"
            style={{ backgroundColor: tokens.onSurface }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-10"
      style={{ backgroundColor: tokens.surface }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT */}
          <div className="w-full lg:w-[65%]">
            <h1 className="text-5xl mb-10">Your Selection</h1>

            <div className="flex flex-col gap-6">
              {cart.items.map((item) => {
                const {
                  product,
                  variant: variantId,
                  price,
                  product: { _id },
                } = item;

                const variantDetail = getVariantDetails(product, variantId);

                const imageUrl = getDisplayImage(product, variantDetail);

                const displayPrice =
                  price || variantDetail?.price || product?.price;

                const variantPrice = variantDetail?.price;

                const qty = quantities[_id] ?? item.quantity ?? 1;

                const attributes = variantDetail?.attributes ?? {};

                const stock = variantDetail?.stock;

                return (
                  <div
                    key={_id}
                    className="flex gap-6 p-6"
                    style={{
                      backgroundColor: tokens.surfaceLow,
                    }}
                  >
                    {/* IMAGE */}
                    <div className="w-36 h-44 overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product?.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                    </div>

                    {/* INFO */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-3xl mb-3">{product?.title}</h2>

                        {/* ATTRIBUTES */}
                        {Object.keys(attributes).length > 0 && (
                          <div className="flex gap-2 flex-wrap mb-3">
                            {Object.entries(attributes).map(([key, val]) => (
                              <span
                                key={key}
                                className="px-3 py-1 text-xs text-white"
                                style={{
                                  backgroundColor: tokens.primary,
                                }}
                              >
                                {val}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* PRICE */}
                        <p className="mb-2 font-medium">
                          {displayPrice
                            ? formatCurrency(
                                displayPrice.amount,
                                displayPrice.currency,
                              )
                            : "—"}
                        </p>

                        {/* STOCK */}
                        {stock !== undefined && (
                          <p className="text-sm text-gray-500 mb-3">
                            {stock > 0 ? `${stock} in stock` : "Out of stock"}
                          </p>
                        )}

                        {/* PRICE DIFFERENCE */}
                        {displayPrice?.amount &&
                          variantPrice?.amount &&
                          displayPrice.amount !== variantPrice.amount && (
                            <>
                              {displayPrice.amount > variantPrice.amount ? (
                                <p className="text-green-700 text-sm font-bold">
                                  You will get this at{" "}
                                  {formatCurrency(
                                    variantPrice.amount,
                                    variantPrice.currency,
                                  )}{" "}
                                  and save{" "}
                                  {Math.abs(
                                    variantPrice.amount - displayPrice.amount,
                                  )}
                                </p>
                              ) : (
                                <p className="text-red-600 text-sm font-bold">
                                  Warning this product will cost you{" "}
                                  {Math.abs(
                                    variantPrice.amount - displayPrice.amount,
                                  )}{" "}
                                  more.
                                </p>
                              )}
                            </>
                          )}
                      </div>

                      {/* QUANTITY */}
                      <div className="flex items-center justify-between mt-5">
                        <div className="flex items-center border">
                          <button
                            onClick={() => changeQty(_id, -1)}
                            className="px-4 py-2"
                          >
                            -
                          </button>

                          <span className="px-4">{qty}</span>

                          <button
                            onClick={() =>
                              handleIncrementCartItem({
                                productId: _id,
                                variantId,
                              })
                            }
                            className="px-4 py-2"
                          >
                            +
                          </button>
                        </div>

                        <button className="text-sm text-gray-500">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-[35%]">
            <div
              className="p-8 sticky top-10"
              style={{
                backgroundColor: tokens.surfaceLowest,
              }}
            >
              <h2 className="text-3xl mb-6">Order Summary</h2>

              <div className="flex justify-between mb-4">
                <span>Subtotal</span>

                <span>{formatCurrency(cart?.totalPrice || 0)}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Shipping</span>

                <span>
                  {cart?.totalPrice >= 15000
                    ? "Free"
                    : "Calculated at checkout"}
                </span>
              </div>

              <hr className="my-6" />

              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total</span>

                <span>{formatCurrency(cart?.totalPrice || 0)}</span>
              </div>

              <button
                className="w-full py-4 text-white"
                style={{
                  backgroundColor: tokens.onSurface,
                }}
                onClick={() => alert("Checkout Coming Soon")}
              >
                Proceed to Checkout
              </button>

              <button
                className="w-full py-4 mt-3 border"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
