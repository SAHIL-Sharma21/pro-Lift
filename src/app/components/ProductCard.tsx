"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/app/types/products.types";
import { useCart } from "../hooks/useCart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductCard = ({ product, setIsCartOpen }: ProductCardProps) => {
  const { addItemToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await addItemToCart({
        productId: product.id,
        quantity: 1,
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
      setIsCartOpen(true);
    } catch (error) {
      toast({
        title: "Failed to add product to cart",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <motion.div
      whileHover={{ scale: 1.00 }}
      whileTap={{ scale: 0.95 }}
      transition={{type: "spring", stiffness: 300, damping: 20}}
      >
        <Link
          href={`/products/${product.id}`}
          passHref
          className="block h-full"
        >
          <Card className="overflow-hidden hover:scale-105  transition duration-300 cursor-pointer h-full flex flex-col">
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
            <CardContent className="p-4 flex flex-col flex-grow">
              <CardTitle className="mb-2">{product.name}</CardTitle>
              <p className="text-sm text-muted-foreground mb-4 flex-grow overflow-hidden">
                {product.description}
              </p>
              <div className="flex justify-between items-center mt-auto">
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
      </motion.div>
    </>
  );
};

export default ProductCard;
