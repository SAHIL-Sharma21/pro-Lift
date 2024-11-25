'use client'

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/app/lib/redux/store';
import { useCallback } from 'react';
import {VerifyPaymentData} from '@/app/types/order.types';
import {fetchOrders, checkout, clearCurrentOrder, processPaymentAndOrderCreate, verifyPayment, setSelectedAddress} from '@/app/lib/redux/slices/orderSlice';


export const useOrder = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {loading, error, currentOrder, orders,addresses,razorpayOrderId, selectedAddressId} = useSelector((state: RootState) => state.order);


    const getOrders = useCallback(() => {
        return dispatch(fetchOrders());
    }, [dispatch]);

    const initiateCheckout = useCallback(() => {
        return dispatch(checkout());
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

    const setSelectedAddressAction = useCallback((addressId: string) => {
        return dispatch(setSelectedAddress(addressId));
    }, [dispatch]);

    return {
        loading,
        error,
        currentOrder,
        orders,
        addresses, 
        razorpayOrderId,
        selectedAddressId,
        getOrders,
        initiateCheckout,
        processPaymentAction,
        verifyPaymentAction,
        clearCurrentOrderAction,
        setSelectedAddressAction
    };
}