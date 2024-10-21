//making category slices

import { Category } from "@/app/types/category.types";
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

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
});

export default categorySlice.reducer;