'use client'

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/app/lib/redux/store';
import { useCallback } from 'react';
import {getAllAddresses, createAddress, deleteAddress, updateAddress} from '@/app/lib/redux/slices/addressSlice';
import {AddressCreate, AddressUpdate} from '@/app/types/address.types';

export const useAddress = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {addresses, loading, error} = useSelector((state: RootState) => state.address);

    const getAllAdress = () => {
        return dispatch(getAllAddresses());
    }

    const addAddress = useCallback((payload: AddressCreate) => {
        return dispatch(createAddress(payload));
    }, [dispatch]);

    const update = useCallback((payload: AddressUpdate, addressId: string) => {
        return dispatch(updateAddress({payload, addressId}))
    }, [dispatch]);

    const deleteAdd = useCallback((addressId: string) => {
        return dispatch(deleteAddress(addressId));
    }, [dispatch]);

    return {
        addresses,
        loading,
        error,
        getAllAdress,
        addAddress,
        update,
        deleteAdd
    };
};