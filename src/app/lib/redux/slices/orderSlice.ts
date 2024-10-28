//order slice

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {Order, VerifyPaymentData} from '@/app/types/order.types';


interface OrderState {
    orders: Order[];
    loading: boolean;
    error: string | null; 
    currentOrder: Order | null;
}

const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
    currentOrder: null
}

export const fetchOrders = createAsyncThunk('order/fetchOrders', async(_, {rejectWithValue}) => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_URI}/orders/get-orders`); //this have to make in backend
        if(!response.ok){
            throw new Error("Error fetching orders");
        }

        return await response.json();
    } catch (error: any) {
        console.log("Error fetching orders: ", error);
        rejectWithValue(error?.message);
    }
});


export const checkout = createAsyncThunk('order/checkout', async(guestId: {guestId?: string}, {rejectWithValue}) => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_URI}/orders/checkout`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(guestId)
        });
        if(!response.ok){
            throw new Error("Error fetching orders");
        }
        return await response.json();
    } catch (error: any) {
        console.log("Error fetching orders: ", error);
        rejectWithValue(error?.message);
    }
});

export const processPaymentAndOrderCreate = createAsyncThunk('order/processPayment', async(_, {rejectWithValue}) => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_URI}/orders/process-payment`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({})
        });

        if(!response.ok){
            throw new Error("Error fetching orders");
        }
        return await response.json();
    } catch (error: any) {
        console.log("Error fetching orders: ", error);
        rejectWithValue(error?.message);
    }
});


export const verifyPayment = createAsyncThunk('order/verifyPayment', async(paymaneData: VerifyPaymentData, {rejectWithValue}) => {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_URI}/orders/verify-payment`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(paymaneData)
        });

        if(!response.ok){
            throw new Error("Error fetching orders");
        }

        return await response.json();
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
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

export const {clearCurrentOrder} = orderSlice.actions;
export default orderSlice.reducer;