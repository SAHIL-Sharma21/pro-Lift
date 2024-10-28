//cart slice here
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "@/app/types/cart.types";

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  totalItems?: number;
  totalPrice?: number;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
  totalItems: 0,
  totalPrice: 0
};

//defining async thunks
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_BACKEND_URI}/cart/get-cart`
    );
    if (!response.ok) {
      throw new Error("Failed to get the user cart.");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error fetching cart:", error?.message);
    return;
  }
});

//TODO: we need cartId as in our backend we have middleware for that
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    try {
      const response = await fetch(`${process.env.NEXT_BACKEND_URI}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart.");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log("Error adding product to cart:", error?.message);
      return;
    }
  }
);

export const updateToCart = createAsyncThunk(
  "cart/updateToCart",
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_BACKEND_URI}/cart/update-cart/${productId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the cart.");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log("Error updating the cart: ", error?.message);
      return;
    }
  }
);

//remove from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ cartItemId }: { cartItemId: string }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_BACKEND_URI}/cart/delete-cart/${cartItemId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartItemId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item from the cart.");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log("Error removing item from the cart: ", error?.message);
      return;
    }
  }
);

//TODO: the cart id is required in backend but will come from the middleware need to implement it
export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  try {
    const responnse = await fetch(
      `${process.env.NEXT_BACKEND_URI}/cart/empty-cart`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      }
    );
  } catch (error: any) {
    console.log("Error clearing the cart: ", error?.message);
    return;
  }
});

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
        state.cart = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.cart = null;
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart";
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.loading = false;
        if(state.cart){
          const existingItemIndex = state.cart.items.findIndex((item) => item.id === action.payload.items[0].id);
          if(existingItemIndex !== -1){
            state.cart.items[existingItemIndex].quantity += action.payload.items[0].quantity;
          } else {
            state.cart.items.push(action.payload.items[0])
          }
          state.totalItems = state.cart.items.reduce((total, item) => total + item.quantity, 0);
          state.totalPrice = state.cart.items.reduce((total, item) => total + (item.quantity * item.product.price), 0);
        } else {
          state.cart = action.payload
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add product to cart";
      })
      .addCase(updateToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateToCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(updateToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update cart";
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeFromCart.fulfilled,
        (state, action: PayloadAction<string>) => {
          if (state.cart) {
            state.cart.items = state.cart.items.filter(
              (item) => item.id !== action.payload
            );
          }
        }
      )
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to remove item from cart";
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = null;
      });
  },
});

export default cartSlice.reducer;
