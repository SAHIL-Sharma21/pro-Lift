"use client";

//use cart hook here
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../lib/redux/store";
import { useCallback, useEffect } from "react";
import {
  fetchCart,
  addToCart,
  clearCart,
  removeFromCart,
  updateCartItem,
} from "@/app/lib/redux/slices/cartSlice";


export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { cart, loading, error, totalItems, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  const getCart = useCallback( async() => {
      try {
        return dispatch(fetchCart()).unwrap();
      } catch (error) {
        console.error(error instanceof Error ? error.message : "Failed to fetch cart");
      }
  }, [dispatch]);

  // cart is did not found.
  useEffect(() => {
    getCart();
  }, [getCart]);

  const addItemToCart = useCallback(
    ({ productId, quantity }: { productId: string; quantity: number }) => {
      return dispatch(addToCart({ productId, quantity }));
    },
    [dispatch]
  );

  const updateItemToCart = useCallback(
    ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) => {
      return dispatch(updateCartItem({ cartItemId, quantity }));
    },
    [dispatch]
  );

  const removeItemFromCart = useCallback(
    async (cartItemId: string) => {
      try {
        const resultAction = await dispatch(removeFromCart(cartItemId));
        if (removeFromCart.fulfilled.match(resultAction)) {
          // If the action was fulfilled, return a success object
          return { success: true, data: resultAction.payload };
        } else {
          // If the action was rejected, throw an error
          throw new Error(resultAction.error.message || "Failed to remove item from cart");
        }
      } catch (error) {
        console.error("Error removing item from cart:", error);
        throw error;
      }
    },
    [dispatch]
  );

  const clearCartItems = useCallback(() => {
    return dispatch(clearCart());
  }, [dispatch]);

  return {
    cart,
    loading,
    error,
    totalItems,
    totalPrice,
    getCart,
    addItemToCart,
    updateItemToCart,
    removeItemFromCart,
    clearCartItems,
  };
};
