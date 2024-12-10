'use client';
//use product hoooks
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '@/app/lib/redux/store';
import { useCallback } from 'react';
import {fetchProducts, createProduct, deleteProduct, getProductById, updateProduct} from '@/app/lib/redux/slices/productSlice';
import { ProductUpdate, ProductCreate} from '../types/products.types';


export const useProduct = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {products, loading, error,  selectedProduct, currentPage, totalPage} = useSelector((state: RootState) => state.product);

    const getAllProducts = useCallback((page?: number, limit?: number) => {
        return dispatch(fetchProducts({page, limit}));
    }, [dispatch]);

    const addProducts = useCallback((formData: FormData) => {
        return dispatch(createProduct(formData))
    }, [dispatch]);

    //may error can come
    const editProduct = useCallback((productData: ProductUpdate, productId: string) => {
        return dispatch(updateProduct({productId, payload: productData}));
    }, [dispatch]);

    const removeProduct = useCallback(async (productId: string) => {
        try {
            const result = await dispatch(deleteProduct(productId)).unwrap();
            if (result && result.id) {
                return { status: 200, id: result.id };;
            } else {
                throw new Error('Delete operation did not return expected result');
            }
        } catch (error: any) {
            console.error('Failed to delete product:', error);
            throw error;
        }
    }, [dispatch]);


    const fetchProductById = useCallback((productId: string) => {
        return dispatch(getProductById(productId));
    }, [dispatch]);

    return {
        products,
        loading,
        error,
        getAllProducts,
        addProducts,
        editProduct,
        removeProduct,
        fetchProductById,
        selectedProduct,
        currentPage,
        totalPage
    };
}