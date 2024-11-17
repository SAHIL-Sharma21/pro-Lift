"use client";

import { useCart } from "@/app/hooks/useCart";
import { useProduct } from "@/app/hooks/useProduct";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Package, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function ProductPage() {
  const params = useParams();
  const { loading, error, selectedProduct, fetchProductById } = useProduct();
  const {addItemToCart} = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        if(params.id){
            fetchProductById(params.id as string);
        }
    }, [params.id]);

    const handleAddToCart = () => {
      if(selectedProduct){
        const result = addItemToCart({productId: selectedProduct.id, quantity: 1});
        if(!result){
          throw new Error("Failed to add product to cart");
          //TODO: notfication
        }
        //handle notification here
      }
    }


  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <Skeleton className="w-full md:w-1/2 h-[400px] rounded-lg" />
              <div className="w-full md:w-1/2 space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <Link href="/products">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product not found
          </h2>
          <Link href="/products">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <Link href="/products">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to products
          </Button>
        </Link>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 relative">
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse justify-center items-center">
                      <Skeleton className="h-full w-full" />
                    </div>
                  )}
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className={`object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100': 'opacity-0'}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
              </div>

              {/* product details  */}
              <div className="w-full md:w-1/2">
                <h1 className="text-2xl font-bold mb-2">
                  {selectedProduct.name}
                </h1>
                <p className="text-gray-600 mb-6">
                  {selectedProduct.description}
                </p>
                <p className="text-3xl font-bold text-primary mb-4">
                  Rs: {selectedProduct.price}
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <Package className="h-6 w-6 text-gray-500" />
                  <span className="text-gray-600 text-sm">
                    In Stock: {selectedProduct.quantity}
                  </span>
                </div>
                <Button className="w-full sm:w-auto" onClick={handleAddToCart}>
                  {" "}
                  {/* here i have to call the function to add to cart the product */}
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default ProductPage;
