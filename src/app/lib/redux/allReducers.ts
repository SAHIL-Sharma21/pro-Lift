'use client'

//import all slices here and then export
import { counterSice } from "./slices/counterslice";
import { productSlice } from "./slices/productSlice";
import {cartSlice} from './slices/cartSlice';

export const allReducers = {
    counter: counterSice.reducer,
    product: productSlice.reducer,
    cart: cartSlice.reducer
}