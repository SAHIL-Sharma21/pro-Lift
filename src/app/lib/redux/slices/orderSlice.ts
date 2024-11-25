'use client'
//order slice
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {Order, VerifyPaymentData} from '@/app/types/order.types';
import {Address} from '@/app/types/address.types';

interface OrderState {
    orders: Order[];
    loading: boolean;
    error: string | null; 
    currentOrder: Order | null;
    addresses: Address[];
    selectedAddressId: string | null;
    razorpayOrderId: string | null;
}

const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
    currentOrder: null,
    addresses: [],
    selectedAddressId: null,
    razorpayOrderId: null
}

export const fetchOrders = createAsyncThunk('order/fetchOrders', async(_, {rejectWithValue}) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/orders/get-orders`, {
            credentials: "include"
        }); //this have to make in backend
        if(!response.ok){
            throw new Error("Error fetching orders");
        }
        const data = await response.json();
        console.log(data);
        return data; //here the data will be in .data
    } catch (error: any) {
        console.log("Error fetching orders: ", error);
        rejectWithValue(error?.message);
    }
});


export const checkout = createAsyncThunk('order/checkout', async(guestId: string | undefined, {rejectWithValue}) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/orders/checkout`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({guestId}),
            credentials: "include"
        });
        if(!response.ok){
            throw new Error("Error fetching orders");
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error: any) {
        console.log("Error fetching orders: ", error);
        rejectWithValue(error?.message);
    }
});

export const processPaymentAndOrderCreate = createAsyncThunk('order/processPayment', async(_, {rejectWithValue}) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/orders/process-payment`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        });

        if(!response.ok){
            throw new Error("Error fetching orders");
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error: any) {
        console.log("Error fetching orders: ", error);
        rejectWithValue(error?.message);
    }
});


export const verifyPayment = createAsyncThunk('order/verifyPayment', async(paymaneData: VerifyPaymentData, {rejectWithValue}) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/orders/verify-payment`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(paymaneData),
            credentials: "include"
        });

        if(!response.ok){
            throw new Error("Error fetching orders");
        }
        const data = await response.json();
        console.log(data);// debugging line
        return data;
    } catch (error: any) {
        console.log("Error fetching orders: ", error);
        rejectWithValue(error?.message);
    }
});



export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        clearCurrentOrder: (state) => {
            state.currentOrder = null;
        }, 
        setSelectedAddress: (state, action) => {
            state.selectedAddressId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                console.log("fetched orders-->", action.payload);
                state.orders = action.payload;
                state.error = null;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch orders";
            })
            .addCase(checkout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkout.fulfilled, (state, action) => {
                state.loading = false;
                console.log("checkout-->", action.payload);
                state.currentOrder = action.payload;
                state.error = null;
            })
            .addCase(checkout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to checkout";
            })
            .addCase(processPaymentAndOrderCreate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(processPaymentAndOrderCreate.fulfilled, (state, action) => {
                state.loading = false;
                console.log("processPaymentAndOrderCreate-->", action.payload);
                state.currentOrder = action.payload;
                state.error = null;
            })
            .addCase(processPaymentAndOrderCreate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to checkout";
            })
            .addCase(verifyPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyPayment.fulfilled, (state, action) => {
                state.loading = false;
                console.log("verifyPayment-->", action.payload);
                state.currentOrder = action.payload;
                state.orders.push(action.payload);
                state.error = null;
            })
            .addCase(verifyPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to checkout";
            })
    }
});

export const {clearCurrentOrder, setSelectedAddress} = orderSlice.actions;
export default orderSlice.reducer;