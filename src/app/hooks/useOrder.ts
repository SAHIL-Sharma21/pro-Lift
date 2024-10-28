'use client'

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/app/lib/redux/store';
import { useCallback } from 'react';
import {VerifyPaymentData} from '@/app/types/order.types';
import {fetchOrders, checkout, clearCurrentOrder, processPaymentAndOrderCreate, verifyPayment} from '@/app/lib/redux/slices/orderSlice';


export const useOrder = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {loading, error, currentOrder, orders} = useSelector((state: RootState) => state.order);


    const getOrders = useCallback(() => {
        return dispatch(fetchOrders());
    }, [dispatch]);

    const initiateCheckout = useCallback((guestId: {guestId?: string}) => {
        return dispatch(checkout(guestId));
    }, [dispatch]);

    const processPaymentAction = useCallback(() => {
        return dispatch(processPaymentAndOrderCreate());
    }, [dispatch]);


    const verifyPaymentAction = useCallback((verifyData: VerifyPaymentData) => {
        return dispatch(verifyPayment(verifyData));
    }, [dispatch]);

    const clearCurrentOrderAction = useCallback(() => {
        return dispatch(clearCurrentOrder())
    }, [dispatch]); 


    return {
        loading,
        error,
        currentOrder,
        orders,
        getOrders,
        initiateCheckout,
        processPaymentAction,
        verifyPaymentAction,
        clearCurrentOrderAction
    };
}