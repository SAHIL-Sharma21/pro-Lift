"use client";

//cart component here
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../lib/redux/store";
import {
  addToCart,
  updateToCart,
  removeFromCart,
  clearCart,
  fetchCart,
} from "@/app/lib/redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart, error, loading } = useSelector(
    (state: RootState) => state.cart
  );

  if (loading) return <div>Loading.....</div>;

  if (error) return <div>Error:{error}</div>;
  if (!cart) return <div>Your Cart is empty</div>;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {cart.items.length > 0 ? (
          <>
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4"
              >
                <div>
                  <h2 className="font-bold">{item.product.name}</h2>
                  <p>
                    Rs: {item.product.price} * {item.quantity}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    className="bg-gray-200 px-2 py-1 rounded"
                    onClick={() =>
                      dispatch(
                        updateToCart({
                          productId: item.id,
                          quantity: item.quantity - 1,
                        })
                      )
                    }
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="bg-gray-200 px-2 py-1 rounded"
                    onClick={() =>
                      dispatch(
                        updateToCart({
                          productId: item.id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                  >
                    +
                  </button>
                  <button
                    className="ml-4 text-red-500"
                    onClick={() =>
                      dispatch(removeFromCart({ cartItemId: item.id }))
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6 flex justify-between items-start">
              <h2 className="text-2xl font-bold">
                Total: Rs:{" "}
                {cart.items.reduce(
                  (total, item) => total + item.product.price * item.quantity,
                  0
                )}
              </h2>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
            </div>
          </>
        ) : (
          <div>Your cart is empty</div>
        )}
      </div>
    </>
  );
};

export default Cart;
