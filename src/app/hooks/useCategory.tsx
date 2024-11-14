'use client';

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/lib/redux/store';
import { useCallback } from 'react';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById
} from '@/app/lib/redux/slices/categorySlice';
import { CreateCategory, UpdateCategory } from '../types/category.types';

export const useCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error, selectedCategory } = useSelector((state: RootState) => state.category);

  const fetchAllCategories = useCallback(() => {
    return dispatch(getAllCategories());
  }, [dispatch]);

  const addCategory = useCallback((categoryData: CreateCategory) => {
    return dispatch(createCategory(categoryData));
  }, [dispatch]);

  const editCategory = useCallback((categoryData: UpdateCategory, categoryId: string) => {
    return dispatch(updateCategory({ payload: categoryData, categoryId }));
  }, [dispatch]);

  const removeCategory = useCallback((categoryId: string) => {
    return dispatch(deleteCategory(categoryId));
  }, [dispatch]);

  const fetchCategoryById = useCallback((categoryId: string) => {
    return dispatch(getCategoryById(categoryId));
  }, [dispatch]);

  return {
    categories,
    loading,
    error,
    fetchAllCategories,
    addCategory,
    editCategory,
    removeCategory,
    fetchCategoryById,
    selectedCategory
  };
}