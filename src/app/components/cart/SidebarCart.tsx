"use client";

import { useCart } from "@/app/hooks/useCart";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { debounce } from "lodash";
import { MinusCircle, PlusCircle, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";

const SidebarCart = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    cart,
    loading,
    error,
    totalItems,
    totalPrice,
    removeItemFromCart,
    updateItemToCart,
    getCart,
    clearCartItems,
  } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (cart && cart.items.length > 0) {
      setIsOpen(true);
    }
  }, [cart, setIsOpen]);

  const debounceCartUpdate = useCallback(
    debounce(async (cartItemId: string, quantity: number) => {
      try {
        const response = await updateItemToCart({ cartItemId, quantity });
        if (response.meta.requestStatus === "fulfilled") {
          toast({
            title: "Cart item updated",
            description: "The cart item has been updated successfully.",
            variant: "default",
            className: "bg-green-100 border-green-400 text-green-900",
          });
        } else {
          toast({
            title: "Failed to update the cart item",
            description: "Please try again later.",
            variant: "destructive",
          });
        }
        await getCart();
      } catch (error: any) {
        console.error("Failed to update the cart item:", error);
        toast({
          title: "Failed to update the cart item",
          description: error.message || "Please try again later.",
          variant: "destructive",
        });
      }
    }, 500),
    [updateItemToCart, getCart]
  );

  const handleUpdateQuantity = async (
    cartItemId: string,
    newQuantity: number
  ) => {
    try {
      if (newQuantity > 0) {
        debounceCartUpdate(cartItemId, newQuantity);
      }
    } catch (error: any) {
      console.error("Failed to update the cart item:", error);
      toast({
        title: "Failed to update the cart item",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveItem = async (cartItemId: string) => {
    if (cart) {
      try {
        const response = await removeItemFromCart(cartItemId);
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
      } catch (error: any) {
        console.error("Failed to remove product from cart:", error);
        toast({
          title: "Failed to remove product from cart",
          description: error.message || "Please try again later.",
          variant: "destructive",
        });
      }
    }
  };

  const handleViewCart = () => {
    router.push("/cart");
    setIsOpen(false);
  };

  const handleClearCart = async () => {
    try {
      const response = await clearCartItems();
      if (response.meta.requestStatus === "fulfilled") {
        toast({
          title: "Cart cleared",
          description: "The cart has been cleared successfully.",
          variant: "default",
          className: "bg-green-100 border-green-400 text-green-900",
        });
      } else {
        toast({
          title: "Failed to clear the cart",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
      await getCart();
    } catch (error) {
      console.error("Failed to clear the cart:", error);
      toast({
        title: "Failed to clear the cart",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <div className="relative cursor-pointer p-2 rounded-full hover:bg-zinc-600 transition-colors">
            <ShoppingCart className="h-4 w-4 text-zinc-100" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-600 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>
              View and manage items in your shopping cart
            </SheetDescription>
          </SheetHeader>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {cart && cart.items.length === 0 && (
            <p className="text-gray-500">Your cart is empty</p>
          )}
          {cart && cart.items.length > 0 && (
            <div className="mt-8 space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <Image
                    src={item.product.image} // error may come here
                    alt={item.product.name}
                    width={64}
                    height={64}
                    className="rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.product.name}</h3>
                    <p className="text-xs text-gray-500">
                      Rs: {item.product.price}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={item.quantity === 1}
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={item.quantity === item.product.quantity}
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="border-t  pt-4">
                <div className="flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="font-medium">Rs.{totalPrice}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <Button className="w-full mt-4" onClick={handleViewCart}>
                    View Cart
                  </Button>
                  <Button
                    className="w-full mt-4"
                    variant="destructive"
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SidebarCart;
