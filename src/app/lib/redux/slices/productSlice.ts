//product slice here

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductCreate, ProductUpdate } from "@/app/types/products.types";

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
  async ({page = 1, limit = 10}:{page?: number, limit?: number}, {rejectWithValue}) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/get-allproducts?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      console.log(data.data);
      return data;
    } catch (error: any) {
      console.log("Error fetching products:", error?.message);
      rejectWithValue(error?.message);
    }
  }
);

export const createProduct = createAsyncThunk('product/createProduct', async(payload: ProductCreate, {rejectWithValue}) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/products/create-product`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
    });

    if(!response.ok){
      throw new Error("Failed to create product");
    }
    return await response.json();
  } catch (error:any) {
    console.log("Error creating product: ", error);
    rejectWithValue(error?.message);
  }
});

export const updateProduct = createAsyncThunk('product/updateProduct', async({payload, productId}: {payload: ProductUpdate, productId: string}, {rejectWithValue}) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/products/update-product/${productId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
    });

    if(!response.ok){
      throw new Error("Failed to update product");
    }
    return await response.json();
  } catch (error: any) {
    console.log("Error updating product: ", error);
    rejectWithValue(error?.message);
  }
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async(productId: string, {rejectWithValue}) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/products/delete-product/${productId}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({})
    });

    if(!response.ok){
      throw new Error("Failed to delete product");
    }
    return await response.json();
  } catch (error: any) {
    console.log("Error deleting product: ", error);
    rejectWithValue(error?.message);
  }
});

export const getProductById = createAsyncThunk('product/getProductById', async(productId: string, {rejectWithValue}) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/products/get-product/${productId}`);

    if(!response.ok){
      throw new Error("Failed to get product");
    }
    return await response.json();
  } catch (error: any) {
    console.log("Error fetching product: ", error);
    rejectWithValue(error?.message);
  }
});

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
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any>) => {
        state.products = action.payload.data?.products || [];
        state.loading = false;
        state.error = null;
        state.currentPage = action.payload.data?.page || 1;
        state.totalPage = action.payload.data?.totalPage || 1;
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
        state.products.push(action.payload.data);
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
        const index = state.products.findIndex((product) => product.id === action.payload.data.id);
        if(index !== -1){
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
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((product) => product.id !== action.payload.data.id);
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete product";
      })
      .addCase(getProductById. pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload.data;
        state.error = null;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to get product";
      })
  },
});

export default productSlice.reducer;
