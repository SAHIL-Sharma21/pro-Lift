//order slice

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {Order} from '@/app/types/order.types';


interface OrderState {
    orders: Order[];
    loading: boolean;
    error: string | null; 
}

const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null
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

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
});


export default orderSlice.reducer;