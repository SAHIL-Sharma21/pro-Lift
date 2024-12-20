import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Address, AddressCreate, AddressUpdate} from '@/app/types/address.types';
import { apiCall } from '@/utils/apiCall';
import { RootState } from '../store';


interface AddressState {
    loading: boolean;
    error: string | null;
    addresses: Address[];
}

const initialState: AddressState = {
    addresses: [],
    loading: false,
    error: null
};


export const createAddress = createAsyncThunk('address/createAddress', async(payload: AddressCreate, {rejectWithValue, getState}) => {
    try {
        const response = await apiCall({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/address/create`,
            method: "POST",
            body: payload,
        }, getState as () => RootState);
        if(!response.ok){
            throw new Error("Failed to create address");
        }
        const data = await response.json();
        return data.data;
    } catch (error: any) {
        console.log("Error creating address: ", error);
        rejectWithValue(error?.message);
    }
});


export const updateAddress = createAsyncThunk('address/updateAddress', async({payload, addressId}: {payload: AddressUpdate, addressId: string}, {rejectWithValue, getState}) => {
    try {
        const response = await apiCall({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/address/updateAddress/${addressId}`,
            method: "PATCH",
            body: payload,
        }, getState as () => RootState);

        if(!response.ok){
            throw new Error("Failed to update address");
        }
        const data = await response.json();
        console.log("updated data--->", data);
        return data.data;
    } catch (error: any) {
        console.log("Error updating address: ", error);
        rejectWithValue(error?.message);
    }
});

export const deleteAddress = createAsyncThunk('address/deleteAddress', async(addressId: string, {rejectWithValue, getState}) => {
    try {
        const response = await apiCall({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/address/deleteAddress/${addressId}`,
            method: "DELETE",
        }, getState as () => RootState);

        if(!response.ok){
            throw new Error("Failed to delete address");
        }
        const data = await response.json();
        console.log("deleted data--->", data);
        return data.data;
    } catch (error: any) {
        console.log("Error deleting address: ", error);
        rejectWithValue(error?.message);
    }
});


export const getAllAddresses = createAsyncThunk('address/getAllAddresses', async(_, {rejectWithValue, getState}) => {
    try {
        const response = await apiCall({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/address/allAddress`,
            method: "GET",
        }, getState as () => RootState);

        if(!response.ok){
            throw new Error("Failed to get all addresses");
        }
        const data = await response.json();
        return data.data || [];
    } catch (error: any) {
        console.log("Error getting all addresses: ", error);
        rejectWithValue(error?.message);
    }
});


export const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.addresses.push(action.payload);
                state.error = null;
            })
            .addCase(createAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string  || "Failed to create address";
            })
            .addCase(updateAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.addresses.findIndex((address) => address.id === action.payload.id);
                if(index !== -1){
                    state.addresses[index] = action.payload;
                }
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string || "Failed to update address";
            })
            .addCase(deleteAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.addresses = state.addresses.filter((address) => address.id !== action.payload.id)
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string || "Failed to delete address";
            })
            .addCase(getAllAddresses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllAddresses.fulfilled, (state, action) => {
                state.loading = false;
                state.addresses = action.payload;
            })
            .addCase(getAllAddresses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string || "Failed to get all addresses";
            })
    }
});