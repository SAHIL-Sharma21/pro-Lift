//making store
'use client';

import {configureStore} from '@reduxjs/toolkit';
import {counterSice} from './slices/counterslice';


export const store = configureStore({
    reducer: {
        counter: counterSice.reducer

    },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
