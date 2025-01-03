//product slice here

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductUpdate } from "@/app/types/products.types";
import { apiCall } from "@/utils/apiCall";
import { RootState } from "../store";

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  totalPage?: number;
  currentPage?: number;
}
const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  totalPage: 1,
  currentPage: 1,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (
    { page = 1, limit = 10 }: { page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/get-allproducts?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();

      if (!data || !data.data) {
        throw new Error("Invalid data format recieved.");
      }
      return data;
    } catch (error) {
      console.log("Error fetching products:", error);
      rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch products"
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/create-product`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create product");
      }
      const data = await response.json();
      if (!data || !data.data) {
        throw new Error("Invalid data format recieved.");
      }
      return data.data;
    } catch (error) {
      console.log("Error creating product: ", error);
      rejectWithValue(
        error instanceof Error ? error.message : "Failed to create product"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (
    { payload, productId }: { payload: ProductUpdate; productId: string },
    { rejectWithValue, getState }
  ) => {
    try {
      const response = await apiCall(
        {
          url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/update-product/${productId}`,
          method: "PATCH",
          body: payload,
        },
        getState as () => RootState
      );
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.log("Error updating product: ", error);
      rejectWithValue(
        error instanceof Error ? error.message : "Failed to update product"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: string; state: RootState }
>("product/deleteProduct", async (productId, { rejectWithValue, getState }) => {
  try {
    const response = await apiCall(
      {
        url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/delete-product/${productId}`,
        method: "DELETE",
      },
      getState
    );

    // Check if response is a standard Response object
    if (response instanceof Response) {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete product");
      }
      await response.json();
    } else {
      // If response is not a standard Response object, assume it's already parsed
      console.log("Deleted data --->", response);
    }

    return { id: productId, status: 200 };
  } catch (error) {
    console.log("Error deleting product: ", error);
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to delete product"
    );
  }
});

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/get-product/${productId}`
      );

      if (!response.ok) {
        throw new Error("Failed to get product");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.log("Error fetching product: ", error);
      rejectWithValue(
        error instanceof Error ? error.message : "Failed to get product"
      );
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const products = action.payload.data?.products;
        if (Array.isArray(products)) {
          state.products = products;
          state.currentPage = action.payload.data?.currentPage || 1;
          state.totalPage = action.payload.data?.totalPage || 1;
        } else {
          state.products = [];
          console.error("Recieved invalid products data:", action.payload);
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.data) {
          state.products.push(action.payload.data);
        }
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create product";
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product.id === action.payload.data.id
        );
        if (index !== -1) {
          state.products[index] = action.payload.data;
        }
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update product";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.loading = false;
          console.log("action.payload-->", action.payload);
          if (action.payload && action.payload.id) {
            state.products = state.products.filter(
              (product) => product.id !== action.payload.id
            );
          } else {
            console.error(
              "Invalid payload received in deleteProduct.fulfilled:",
              action.payload
            );
          }
          state.error = null;
        }
      )
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete product";
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
        state.error = null;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to get product";
      });
  },
});

export default productSlice.reducer;
