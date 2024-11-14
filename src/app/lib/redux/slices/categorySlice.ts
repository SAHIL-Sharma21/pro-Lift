import { Category, CreateCategory, UpdateCategory } from "@/app/types/category.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { apiCall } from "@/utils/apiCall";

interface CategorySlice {
  loading: boolean;
  error: string | null
  categories: Category[];
  selectedCategory: Category | null;
}

const initialState: CategorySlice = {
  loading: false,
  error: null,
  categories: [],
  selectedCategory: null
}


export const createCategory = createAsyncThunk<Category, CreateCategory, { state: RootState }>(
  "category/createCategory",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const response = await apiCall({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/categories/create-category`,
        method: 'POST',
        body: payload,
      }, getState);
      return response;
    } catch (error: any) {
      console.log("Error creating category: ", error?.message);
      return rejectWithValue(error?.message);
    }
  }
);

export const updateCategory = createAsyncThunk<Category, { payload: UpdateCategory; categoryId: string }, { state: RootState }>(
  "category/updateCategory",
  async ({ payload, categoryId }, { rejectWithValue, getState }) => {
    try {
      const response = await apiCall({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/categories/update-category/${categoryId}`,
        method: 'PATCH',
        body: payload,
      }, getState);
      return response;
    } catch (error: any) {
      console.log("Error updating category: ", error?.message);
      return rejectWithValue(error?.message);
    }
  }
);

export const deleteCategory = createAsyncThunk<Category, string, { state: RootState }>(
  "category/deleteCategory",
  async (categoryId, { rejectWithValue, getState }) => {
    try {
      const response = await apiCall({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/categories/delete-category/${categoryId}`,
        method: 'DELETE',
      }, getState);
      return response;
    } catch (error: any) {
      console.log("Error deleting category: ", error?.message);
      return rejectWithValue(error?.message);
    }
  }
);

export const getAllCategories = createAsyncThunk<Category[], void, { state: RootState }>(
  "category/getAllCategories",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await apiCall({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/categories/get-allCategories`,
        method: 'GET',
      }, getState);
      return response;
    } catch (error: any) {
      console.log("Error getting all categories: ", error?.message);
      return rejectWithValue(error?.message);
    }
  }
);

export const getCategoryById = createAsyncThunk<Category, string, { state: RootState }>(
  "category/getCategoryById",
  async (categoryId, { rejectWithValue, getState }) => {
    try {
      const response = await apiCall({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/categories/get-category/${categoryId}`,
        method: 'GET',
      }, getState);
      return response;
    } catch (error: any) {
      console.log("Error getting category by id: ", error?.message);
      return rejectWithValue(error?.message);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories.push(action.payload);
      state.error = null;
    })
    .addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to create category";
    })
    .addCase(updateCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateCategory.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.categories.findIndex((category) => category.id === action.payload.id);
      if(index !== -1){
        state.categories[index] = action.payload;
      }
      if(state.selectedCategory?.id === action.payload.id){
        state.selectedCategory = action.payload;
      }
    })
    .addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update category";
    })
    .addCase(deleteCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = state.categories.filter((category) => category.id !== action.payload.id);
      if (state.selectedCategory?.id === action.payload.id) {
        state.selectedCategory = null;
      }
      state.error = null;
    })  
    .addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to delete category";
    })
    .addCase(getAllCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.error = null;
    })
    .addCase(getAllCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to get all categories";
    })
    .addCase(getCategoryById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getCategoryById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedCategory = action.payload;
      state.error = null;
    })
    .addCase(getCategoryById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to get category by id";
    })
  }
});


export const selectAllCategories = (state: RootState) => state.category.categories;
export const selectSelectedCategories = (state: RootState) => state.category.selectedCategory;
export const selectCategoryLoading = (state: RootState) => state.category.loading;
export const slectCategoryError = (state: RootState) => state.category.error;

export default categorySlice.reducer;