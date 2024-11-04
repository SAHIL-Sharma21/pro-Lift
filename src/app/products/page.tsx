"use client";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@/app/lib/redux/slices/productSlice";
import ProductCard from "@/app/components/ProductCard";
import { AppDispatch, RootState } from "../lib/redux/store";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import LogoutBtn from '@/app/components/LogoutBtn';

export default function ProductPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  const [page, setPage] = useState(1);
  const {user} = useAuth();

useEffect(() => {
    dispatch(fetchProducts({limit: 10, page}));
}, [dispatch])

const loadMore = () => {
  setPage(prevPage => prevPage + 1);
}

//adding custom loader or designed page or showing loader to user 
  if (loading) return <div>Loading...</div>;
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl text-center font-bold mb-6">Our Products</h1>
        {user ? <LogoutBtn /> : "Login"}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-8 flex justify-center">
                <Button onClick={loadMore} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                      Loading...
                    </>
                  ) : (
                    'Load More'
                  )}
                </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700">No products found</h2>
          </div>
        )}
      </div>
    </>   
  );
}
