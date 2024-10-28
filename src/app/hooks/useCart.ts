'use client'

//use cart hook here
import {useDispatch, useSelector} from 'react-redux';
import { AppDispatch, RootState } from '../lib/redux/store';
import { useCallback } from 'react';
import {fetchCart, addToCart, clearCart, removeFromCart, updateToCart} from '@/app/lib/redux/slices/cartSlice';

export const useCart = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {cart, loading, error} = useSelector((state: RootState) => state.cart);

    const getCart = useCallback(() => {
        return dispatch(fetchCart());
    }, [dispatch]);

    const addItemToCart = useCallback(({productId, quantity}:{productId: string, quantity: number}) => {
        return dispatch(addToCart({productId, quantity}));
    }, [dispatch]);

    const updateItemToCart = useCallback(({productId, quantity}:{productId: string, quantity: number}) => {
        return dispatch(updateToCart({productId, quantity}));
    }, [dispatch]);

    const removeItemFromCart = useCallback((productId: string) => {
        return dispatch(removeFromCart({cartItemId: productId}));
    }, []);

    const clearCartItems = useCallback(() => {
        return dispatch(clearCart());
    }, [dispatch]);


    return {
        cart,
        loading,
        error,
        getCart,
        addItemToCart,
        updateItemToCart,
        removeItemFromCart,
        clearCartItems
    };
}