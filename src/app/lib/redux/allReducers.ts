'use client'

//import all slices here and then export
import { productSlice } from "./slices/productSlice";
import {cartSlice} from './slices/cartSlice';
import {authSlice} from './slices/authSlice';
import {categorySlice} from './slices/categorySlice';
import {addressSlice} from './slices/addressSlice';
import {orderSlice} from './slices/orderSlice';

export const allReducers = {
    product: productSlice.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    category: categorySlice.reducer,
    address: addressSlice.reducer,
    order: orderSlice.reducer
}