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
      return dispatch(fetchCart());
  }, [dispatch]);

  //cart is did not found.
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
    (cartItemId: string) => {
      return dispatch(removeFromCart(cartItemId));
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
