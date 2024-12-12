"use client";

import { useCart } from "@/app/hooks/useCart";
import { useProduct } from "@/app/hooks/useProduct";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  MinusCircle,
  Package,
  PlusCircle,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import debounce from "lodash/debounce";
import { useToast } from "@/hooks/use-toast";

function ProductPage() {
  const params = useParams();
  const { loading, error, selectedProduct, fetchProductById } = useProduct();
  const {
    addItemToCart,
    loading: cartLoading,
    removeItemFromCart,
    updateItemToCart,
    totalPrice,
    cart,
    getCart,
  } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [localCartLoading, setLocalCartLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (params.id) {
      fetchProductById(params.id as string);
    }
  }, [params.id, fetchProductById]);

  useEffect(() => {
    if (!cart) {
      getCart();
    }
  }, [cart, getCart]);

  const debouncedUpdateCart = useCallback(
    debounce(async (cartItemId: string, newQuantity: number) => {
      setLocalCartLoading(true);
      try {
        const response = await updateItemToCart({
          cartItemId,
          quantity: newQuantity,
        });
        if (response.meta.requestStatus === "fulfilled") {
          toast({
            title: "Cart updated",
            description: "The cart has been updated successfully.",
            variant: "default",
            className: "bg-green-100 border-green-400 text-green-900",
          });
        } else {
          toast({
            title: "Failed to update cart",
            description: "Failed to update the cart.",
            variant: "destructive",
          });
        }
        await getCart();
      } catch (error) {
        console.error("Failed to update cart:", error);
        toast({
          title: "Failed to update cart",
          description: "Failed to update the cart.",
          variant: "destructive",
        });
      } finally {
        setLocalCartLoading(false);
      }
    }, 500),
    [updateItemToCart, getCart]
  );

  const handleAddToCart = async () => {
    if (selectedProduct) {
      setLocalCartLoading(true);
      try {
        const response = await addItemToCart({
          productId: selectedProduct.id,
          quantity,
        });
        if (response.meta.requestStatus === "fulfilled") {
          toast({
            title: "Product added to cart",
            description: "The product has been added to your cart.",
            variant: "default",
            className: "bg-green-100 border-green-400 text-green-900",
          });
        } else {
          toast({
            title: "Failed to add product to cart",
            description: "Please try again later.",
            variant: "destructive",
          });
        }
        await getCart();
        setQuantity(1);
      } catch (error: any) {
        console.error("Failed to add product to cart:", error);
        toast({
          title: "Failed to add product to cart",
          description: error.message || "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLocalCartLoading(false);
      }
    }
  };

  const isInCart =
    selectedProduct &&
    cart?.items.some((item) => item.productId === selectedProduct.id);

  const handleRemoveFromCart = async () => {
    if (selectedProduct && cart) {
      const cartItem = cart.items.find(
        (item) => item.productId === selectedProduct.id
      );
      if (cartItem) {
        setLocalCartLoading(true);
        try {
          const response = await removeItemFromCart(cartItem.id);
          if (response.meta.requestStatus === "fulfilled") {
            toast({
              title: "Product removed from cart",
              description: "The product has been removed from your cart.",
              variant: "default",
              className: "bg-green-100 border-green-400 text-green-900",
            });
          } else {
            toast({
              title: "Failed to remove product from cart",
              description: "Please try again later.",
              variant: "destructive",
            });
          }
          await getCart();
          setQuantity(1);
        } catch (error: any) {
          console.error("Failed to remove product from cart:", error);
          toast({
            title: "Failed to remove product from cart",
            description: error.message || "Please try again later.",
            variant: "destructive",
          });
        } finally {
          setLocalCartLoading(false);
        }
      }
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (
      selectedProduct &&
      newQuantity >= 1 &&
      newQuantity <= selectedProduct.quantity
    ) {
      setQuantity(newQuantity);
      if (isInCart && cart) {
        const cartItem = cart.items.find(
          (item) => item.productId === selectedProduct.id
        );
        if (cartItem) {
          debouncedUpdateCart(cartItem.id, newQuantity);
        }
      }
    }
  };

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
                    className={`object-cover transition-opacity duration-300 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
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

                <div className="flex items-center gap-4 mb-6">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity === 1 || localCartLoading}
                    aria-label="Decrement quantity"
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={
                      quantity === selectedProduct.quantity || localCartLoading
                    }
                    aria-label="Increment quantity"
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="w-full sm:w-auto"
                    onClick={handleAddToCart}
                    disabled={
                      localCartLoading || cartLoading || (isInCart as boolean)
                    }
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {localCartLoading || cartLoading
                      ? "Processing..."
                      : isInCart
                      ? "In Cart"
                      : "Add to cart"}
                  </Button>

                  {isInCart && (
                    <Button
                      variant="destructive"
                      className="w-full sm:w-auto"
                      onClick={handleRemoveFromCart}
                      disabled={localCartLoading || cartLoading}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      {localCartLoading || cartLoading
                        ? "Processing..."
                        : "Remove from cart"}
                    </Button>
                  )}
                </div>
                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">Cart Summary</h2>
                  <p className="text-lg">Total Price: Rs:{totalPrice}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default ProductPage;
