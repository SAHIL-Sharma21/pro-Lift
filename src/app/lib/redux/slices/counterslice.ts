'use client';

import {createSlice} from '@reduxjs/toolkit';

export interface CounterState {
    value: number;
}

const initialState = {
    value: 0,
}


export const counterSice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmounnt: (state, action) => {
            state.value += action.payload
        }
    }
});


export const {increment, decrement, incrementByAmounnt} = counterSice.actions;
export default counterSice.reducer;