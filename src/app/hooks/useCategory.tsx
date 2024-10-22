"use client";

//category hooks
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../lib/redux/store";
import {
  addCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  selectAllCategories,
  selectCategoryError,
  selectCategoryLoading,
  selectSelectedCategory,
} from "../lib/redux/slices/categorySlice";
import { useCallback } from "react";

export const useCreateCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectCategoryLoading);
  const error = useSelector(selectCategoryError);

  const create = useCallback(
    (categoryData: { name: string; description?: string }) => {
      return dispatch(addCategory(categoryData));
    },
    [dispatch]
  );

  return { create, loading, error };
};

export const useUpdateCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectCategoryLoading);
  const error = useSelector(selectCategoryError);

  //gotcha moment
  const update = useCallback(
    (
      categoryData: { name?: string; description?: string },
      categoryId: string
    ) => {
      return dispatch(
        updateCategory({ payload: categoryData, categoryId: categoryId })
      );
    },
    [dispatch]
  );

  return { update, loading, error };
};

export const useDeleteCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectCategoryLoading);
  const error = useSelector(selectCategoryError);

  const remove = useCallback(
    (categoryId: string) => {
      return dispatch(deleteCategory(categoryId));
    },
    [dispatch]
  );

  return { remove, loading, error };
};

export const useGetAllCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectAllCategories);
  const error = useSelector(selectCategoryError);
  const loading = useSelector(selectCategoryLoading);

  const fetchAll = useCallback(() => {
    return dispatch(getAllCategories());
  }, [dispatch]);

  return { fetchAll, categories, error, loading };
};

export const useGetCategoryById = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectCategoryLoading);
  const error = useSelector(selectCategoryError);
  const selectedCategory = useSelector(selectSelectedCategory);

  const fetchById = useCallback(
    (categoryId: string) => {
      return dispatch(getCategoryById(categoryId));
    },
    [dispatch]
  );

  return { fetchById, loading, error, selectedCategory };
};

//hook for accessing category state
export const useCategoryState = () => {
  const categories = useSelector(selectAllCategories);
  const loading = useSelector(selectCategoryLoading);
  const error = useSelector(selectCategoryError);
  const selectCategory = useSelector(selectSelectedCategory);

  return { categories, loading, error, selectCategory };
};
