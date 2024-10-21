//making category slices

import { Category, CreateCategory, UpdateCategory } from "@/app/types/category.types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface CategoryState {
    loading: boolean;
    error: string | null;
    categories: Category[];
    selectedCategory: Category | null;
}

const initialState: CategoryState = {
    categories: [],
    error: null,
    loading: false,
    selectedCategory: null,
};

export const addCategory = createAsyncThunk('category/createCategory', async(payload: CreateCategory, {rejectWithValue}) => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_URI}/categories/create-category`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        });

        if(!response.ok){
            throw new Error("Failed to create category");
        }
        return await response.json();
    } catch (error:any) {
        console.log("Error creating category: ", error?.message)
        return rejectWithValue(error?.message);
    }
});

export const updateCategory = createAsyncThunk('category/updateCategory', async({payload, categoryId}:{payload: UpdateCategory, categoryId: string}, {rejectWithValue}) => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_URI}/categories/update-category/${categoryId}`, {
            method: "PATCH",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(payload)
        });

        if(!response.ok){
            throw new Error("Failed to update category");
        }
        return await response.json();

    } catch (error: any) {
        console.log("Error upating category: ", error?.message)
        return rejectWithValue(error?.message);
    }
});

export const deleteCategory = createAsyncThunk('category/deleteCategory', async(categoryId: string, {rejectWithValue}) => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_URI}/categories/delete-category/${categoryId}`, {
            method: "DELETE",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({})
        });

        if(!response.ok){
            throw new Error("Failed to delete category");
        }
        return await response.json();
    } catch (error: any) {
        console.log("Error deleting category: ", error?.message);
        return rejectWithValue(error?.message);
    }
});

export const getAllCategories = createAsyncThunk('category/getAllCategories', async(_,{rejectWithValue}) => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_URI}/categories/get-allCategories`);
        if(!response.ok){
            throw new Error("Failed to get all categories");
        }
        return await response.json();
    } catch (error: any) {
        console.log("Error getting all categories: ", error?.message);
        return rejectWithValue(error?.message);
    }
});

export const getCategoryById = createAsyncThunk('category/getCategoryById', async(categoryId: string, {rejectWithValue}) => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_URI}/categories/get-category/${categoryId}`);

        if(!response.ok){
            throw new Error("Failed to get category by id");
        }
        return await response.json();
    } catch (error: any) {
        console.log("Error getting category by id: ", error?.message);
        rejectWithValue(error?.message);
    }
});


export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.push(action.payload);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string || "Failed to create category";
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
                state.error = action.error.message as string || "Failed to update category";
            })
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.filter((category) => category.id !== action.payload.id);
                if(state.selectedCategory?.id === action.payload.id){
                    state.selectedCategory = null;
                }
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string || "Failed to delete category";
            })
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string || "Failed to get all categories";
            })
            .addCase(getCategoryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCategory = action.payload;
            })
            .addCase(getCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string || "Failed to get category by id";
            })
    },
});

export const selectAllCategories = (state: {category: CategoryState}) => state.category.categories;
export const selectSelectedCategory = (state: {category: CategoryState}) => state.category.selectedCategory;
export const selectCategoryLoading = (state: {category: CategoryState}) => state.category.loading;
export const selectCategoryError = (state: {category: CategoryState}) => state.category.error;  

export default categorySlice.reducer;