import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "@/app/types/cart.types";

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
  totalItems: 0,
  totalPrice: 0,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/cart/get-cart`, {
          credentials: "include",
        }
      );
      if (!response.ok) {
        if(response.status === 400){
          return {items: [], id: null}
        }
        throw new Error("Failed to get the user cart");
      }
      const data = await response.json();
      return data.data;
    } catch (error: any) {
      console.error("Error fetching cart:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity }: { productId: string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/cart/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, quantity }),
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to add product to cart.");
      const data = await response.json();
      return data.data;
    } catch (error: any) {
      console.error("Error adding product to cart:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (
    { cartItemId, quantity }: { cartItemId: string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/cart/update-cart/${cartItemId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to update the cart item.");
      const data = await response.json();
      return data.data;
    } catch (error: any) {
      console.error("Error updating the cart item:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (cartItemId: string, { rejectWithValue }) => {
    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/cart/delete-cart/${cartItemId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorData = data;
        throw new Error(
          errorData.message || "Failed to remove item from the cart."
        );
      }
      return data.data.updatedCart.id;
    } catch (error: any) {
      console.error("Error removing item from the cart:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/cart/empty-cart`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to clear the cart");
      const data = await response.json();
      return data.data;
    } catch (error: any) {
      console.error("Error clearing the cart:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.totalItems =
          action.payload?.items.reduce(
            (total: number, item: CartItem) => total + item.quantity,
            0
          ) || 0;
        state.totalPrice =
          action.payload?.items.reduce(
            (total: number, item: CartItem) =>
              total + item.quantity * item.product.price,
            0
          ) || 0;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.cart = null;
        state.error = action.error.message || "Failed to fetch cart";
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addToCart.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          state.loading = false;
          if (!state.cart) {
            state.cart = { id: action.payload.id, items: [action.payload] };
          } else {
            const existingItemIndex = state.cart.items.findIndex(
              (item) => item.productId === action.payload.productId
            );
            if (existingItemIndex !== -1) {
              state.cart.items[existingItemIndex].quantity +=
                action.payload.quantity;
            } else {
              state.cart.items.push(action.payload);
            }
          }
          state.totalItems = state.cart.items.reduce(
            (total, item) => total + item.quantity,
            0
          );
          state.totalPrice = state.cart.items.reduce(
            (total, item) => total + item.quantity * item.product.price,
            0
          );
          state.error = null;
        }
      )
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add product to cart";
      })
      .addCase(
        updateCartItem.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          if (state.cart) {
            const index = state.cart.items.findIndex(
              (item) => item.id === action.payload.id
            );
            if (index !== -1) {
              state.cart.items[index] = action.payload;
              state.totalItems = state.cart.items.reduce(
                (total, item) => total + item.quantity,
                0
              );
              state.totalPrice = state.cart.items.reduce(
                (total, item) => total + item.quantity * item.product.price,
                0
              );
            }
          }
        }
      )
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeFromCart.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          if (state.cart) {
            state.cart.items = state.cart.items.filter(
              (item) => item.id !== action.payload
            );
            state.totalItems = state.cart.items.reduce(
              (total, item) => total + item.quantity,
              0
            );
            state.totalPrice = state.cart.items.reduce(
              (total, item) => total + item.quantity * item.product.price,
              0
            );
            if(state.cart.items.length === 0){
              state.cart = null;
            }
          }
        }
      )
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to remove product from cart";
      })
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = null;
        state.totalItems = 0;
        state.totalPrice = 0;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to clear cart";
      });
  },
});

export default cartSlice.reducer;
