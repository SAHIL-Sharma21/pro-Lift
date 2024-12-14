"use client";

import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@/app/lib/redux/slices/productSlice";
import ProductCard from "@/app/components/ProductCard";
import { ProductSkeleton } from "@/app/components/ProductSkeleton";
import { ProductFilter } from "@/app/components/products/ProductFilters";
import { AppDispatch, RootState } from "@/app/lib/redux/store";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, PackageSearch } from "lucide-react";
import { useCart } from "@/app/hooks/useCart";
import { CategoryWithProducts } from "@/app/types/category.types";

export default function ProductPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  const [page, setPage] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { cart } = useCart();

  useEffect(() => {
    dispatch(fetchProducts({ limit: 10, page }));
  }, [dispatch, page]);

  useEffect(() => {
    if (cart && cart.items.length > 0) {
      setIsCartOpen(true);
    }
  }, [cart]);

  const categories: CategoryWithProducts[] = useMemo(() => {
    const categorySet = new Set(products.map((product) => product.category));
    return Array.from(categorySet).map((category) => ({
      id: category?.id || "",
      name: category?.name || "",
      description: category?.description || "",
      products: products.filter((p) => p.category?.id === category?.id),
    }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category?.id === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchTerm("");
    setPage(1);
  };

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Our Products</h1>
      <ProductFilter
        categories={categories}
        onCategoryChange={handleCategoryChange}
        onSearch={handleSearch}
      />
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          {selectedCategory !== "all" && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
              Category:{" "}
              {categories.find((c) => c.id === selectedCategory)?.name}
            </span>
          )}
          {searchTerm && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
              Search: {searchTerm}
            </span>
          )}
        </div>
        {(selectedCategory !== "all" || searchTerm) && (
          <Button onClick={resetFilters} variant="destructive" size="sm">
            Reset Filters
          </Button>
        )}
      </div>

      {loading && products.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                setIsCartOpen={setIsCartOpen}
              />
            ))}
          </div>
          {filteredProducts.length < products.length && (
            <div className="mt-8 flex justify-center">
              <Button onClick={loadMore} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <PackageSearch className="h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No products found
          </h2>
          <p className="text-gray-500 text-center max-w-md">
            We couldn't find any products matching your criteria. Please try a
            different category or search term.
          </p>
        </div>
      )}
    </div>
  );
}
