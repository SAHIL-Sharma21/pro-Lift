"use client";

import {
  CreateOrderData,
  Order,
  VerifyPaymentData,
} from "@/app/types/order.types";
import { apiCall } from "@/utils/apiCall";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  currentOrder: Order | null;
}

const initialState: OrderState = {
  loading: false,
  error: null,
  orders: [],
  currentOrder: null,
};

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await apiCall(
        {
          url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/orders/`,
          method: "GET",
        },
        getState as () => RootState
      );

      if (!response.ok) {
        throw new Error("Failed to get orders");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to get orders"
      );
    }
  }
);

export const getAdminOrder = createAsyncThunk(
  "order/getAdminOrder",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await apiCall(
        {
          url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/orders/admin/allOrders`,
          method: "GET",
        },
        getState as () => RootState
      );

      if (!response.ok) {
        throw new Error("Failed to get Admin orders");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to get Admin orders"
      );
    }
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData: CreateOrderData, { rejectWithValue, getState }) => {
    try {
      const response = await apiCall(
        {
          url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/orders/create`,
          method: "POST",
          body: orderData,
        },
        getState as () => RootState
      );

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error creating order: ", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to create order"
      );
    }
  }
);

export const createPaymentOrder = createAsyncThunk(
  "order/createPaymentOrder",
  async (orderId: string, { rejectWithValue, getState }) => {
    try {
      const response = await apiCall(
        {
          url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/payments/create-order`,
          method: "POST",
          body: { orderId },
        },
        getState as () => RootState
      );
      if (!response.ok) {
        throw new Error("Failed to create payment order");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error creating payment order: ", error);
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to create payment order"
      );
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "order/verifyPayment",
  async (paymentData: VerifyPaymentData, { rejectWithValue, getState }) => {
    try {
      const response = await apiCall(
        {
          url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/payments/verify`,
          method: "POST",
          body: paymentData,
        },
        getState as () => RootState
      );
      if (!response.ok) {
        throw new Error("Failed to verify payment");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error verifying payment: ", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to verify payment"
      );
    }
  }
);

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (orderId: string, { rejectWithValue, getState }) => {
    try {
      const response = await apiCall(
        {
          url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/orders/admin/order/${orderId}`,
          method: "GET",
        },
        getState as () => RootState
      );

      if (!response.ok) {
        throw new Error("Failed to get order");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to get order"
      );
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to get orders";
      })
      .addCase(getAdminOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getAdminOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to get admin orders";
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload.order);
        state.currentOrder = action.payload.order;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create order";
      })
      .addCase(createPaymentOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = {
          ...state.currentOrder!,
          paymentDetails: action.payload,
        };
        state.error = null;
      })
      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create payment order";
      })
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state) => {
        state.loading = false;
        state.currentOrder = {
          ...state.currentOrder!,
          status: "PROCESSING",
          paymentDetails: {
            ...state.currentOrder!.paymentDetails,
            status: "COMPLETED",
          },
        };
        state.error = null;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to verify payment";
      })
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.error = null;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to get order";
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
