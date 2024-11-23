"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/app/types/products.types";
import { useCart } from "../hooks/useCart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductCard = ({ product, setIsCartOpen }: ProductCardProps) => {
  const { addItemToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await addItemToCart({ productId: product.id, quantity: 1 });
      setIsCartOpen(true);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      alert("Failed to add product to cart");
    }
  };

  return (
    <>
      <Link href={`/products/${product.id}`} passHref>
        <Card className="overflow-hidden hover:scale-105  transition duration-300 cursor-pointer">
          <CardHeader className="p-0">
            <div className="relative h-48 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="mb-2">{product.name}</CardTitle>
            <p className="text-sm text-muted-foreground mb-4">
              {product.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Rs: {product.price}</span>
              <Button
                onClick={handleAddToCart}
                disabled={product.quantity === 0}
              >
                {product.quantity > 0 ? "Add to cart" : "Out of stock"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default ProductCard;
