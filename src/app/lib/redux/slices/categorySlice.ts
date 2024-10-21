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

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
});

export default categorySlice.reducer;