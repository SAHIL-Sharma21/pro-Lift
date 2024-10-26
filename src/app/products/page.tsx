"use client";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@/app/lib/redux/slices/productSlice";
import ProductCard from "@/app/components/ProductCard";
import { AppDispatch, RootState } from "../lib/redux/store";
import { useEffect } from "react";

export default function ProductPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.product
  );

useEffect(() => {
    dispatch(fetchProducts({limit: 10, page: 1}));
}, [dispatch])

//adding custom loader or designed page or showing loader to user 
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            <>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </>
          ) : (
            <>
              <h1>No Products Found</h1>
            </>
          )}
        </div>
      </div>
    </>
  );
}
