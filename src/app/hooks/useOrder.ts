"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/lib/redux/store";
import { CreateOrderData, VerifyPaymentData } from "@/app/types/order.types";
import {
  getOrders,
  createOrder,
  createPaymentOrder,
  verifyPayment,
  clearCurrentOrder,
  getOrderById,
  getAdminOrder
} from "@/app/lib/redux/slices/orderSlice";
import { useCallback } from "react";

export const useOrder = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, orders, currentOrder } = useSelector(
    (state: RootState) => state.order
  );

  const getAllOrders = useCallback(() => {
    return dispatch(getOrders());
  }, [dispatch]);

  const getAllAdminOrder = useCallback(() => {
    return dispatch(getAdminOrder());
  }, [dispatch]);
  
  const createNewOrder = useCallback(
    (orderData: CreateOrderData) => {
      return dispatch(createOrder(orderData));
    },
    [dispatch]
  );

  const createNewPaymentOrder = useCallback(
    (orderId: string) => {
      return dispatch(createPaymentOrder(orderId));
    },
    [dispatch]
  );

  const verifyPaymentOrder = useCallback(
    (verifyData: VerifyPaymentData) => {
      return dispatch(verifyPayment(verifyData));
    },
    [dispatch]
  );

  const clearCurrentOrderAction = useCallback(() => {
    return dispatch(clearCurrentOrder());
  }, [dispatch]);

  const fetchOrderById = useCallback((orderId: string) => {
    return dispatch(getOrderById(orderId));
  }, [dispatch]);

  return {
    loading,
    error,
    orders,
    currentOrder,
    getAllOrders,
    createNewOrder,
    createNewPaymentOrder,
    verifyPaymentOrder,
    clearCurrentOrderAction,
    fetchOrderById,
    getAllAdminOrder
  };
};
