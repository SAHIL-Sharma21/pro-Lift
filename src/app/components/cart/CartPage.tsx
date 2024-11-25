'use client';

import { useCart } from '@/app/hooks/useCart';
import { useOrder } from '@/app/hooks/useOrder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeftCircle, MinusCircle, PlusCircle, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback } from 'react'
import debounce from 'lodash/debounce';


const CartPage = () => {

    const {loading, error, cart, totalItems, totalPrice, removeItemFromCart, getCart, updateItemToCart, clearCartItems} = useCart();
    const {loading: checkOutLoading, error: checkOutError} = useOrder();


    const handleRemoveFromCart = async(cartItemId: string) => {
        if(cart){
            const cartItem = cart.items.find((item) => item.id === cartItemId);
            if(cartItemId){
                try {
                    await removeItemFromCart(cartItem?.id!)
                    await getCart();
                    alert("Product removed from cart");
                } catch (error) {
                    console.error("Failed to remove product from cart:", error);
                    alert("Failed to remove product from cart");
                }
            }
        }
    }

    const debounceCartUpdate = useCallback(
        debounce(async(cartItemId: string, quantity: number) => {
            try {
                await updateItemToCart({cartItemId, quantity});
                await getCart();
            } catch (error) {
                console.error("Failed to update the cart item:", error);
                alert("Failed to update the cart item");
            }
        }, 500), 
        [updateItemToCart, getCart]
    );

    const handleUpdateQuantity = async(cartItemId: string, newQuantity: number) => {
        if(newQuantity > 0){
            debounceCartUpdate(cartItemId, newQuantity);
        }
    }


    const handleClearCart = async() => {
        try {
            await clearCartItems();
            await getCart();
        } catch (error) {
            console.error("Failed to clear the cart:", error);
            alert("Failed to clear the cart");//TODO: remove this alert in future.
        }
    }


    if(loading){
        return (
            <div className='container mx-auto py-8 px-4'>
                <Card className='max-w-4xl mx-auto'>
                    <CardContent className='p-6'>
                        <div className='flex flex-col md:flex-row gap-8'>
                            <Skeleton className='w-full md:w-1/2 h-[400px] rounded-lg' />
                            <div className='w-full md:w-1/2 space-y-4'>
                                <Skeleton className='h-8 w-3/4'/>
                                <Skeleton className='h-6 w-1/4'/>
                                <Skeleton className='h-24 w-full'/>
                                <Skeleton className='h-10 w-32'/>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }


    if(error){
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <div className='text-center'>
                    <h2 className='text-2xl font-bold text-red-600 mb-4'>Error</h2>
                    <p className='text-gray-600'>{error}</p>
                    <Link href="/products">
                        <Button className='mt-4' variant="outline">
                            <ArrowLeftCircle className='mr-2 h-4 w-4' />
                            Back to products
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }


  return (
    <>
        <div className='mx-auto py-10'>
            <Card className='bg-card text-card-foreground'>
                <CardHeader>
                    <CardTitle className='text-3xl font-bold'>
                        Your Cart
                    </CardTitle>
                </CardHeader>
                <div className='flex flex-col h-[calc(100vh-200px)]'>
                    <CardContent className='flex-grow overflow-hidden'>
                        {cart?.items.length === 0 ? (
                            <div className='flex flex-col items-center justify-center h-full'>
                                <p className='text-center text-muted-foreground mb-4'>Your Cart is empty</p>
                                <Button variant="outline">
                                    <Link href="/products">
                                        Back to Products
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <ScrollArea className='h-full pr-4'>
                                {cart?.items.map((item) => (
                                    <div key={item.id} className='flex items-center space-x-4 py-4'>
                                        <Image 
                                        src={item.product.image}
                                        alt={item.product.name}
                                        height={150}
                                        width={150}
                                        className='h-24 w-24 rounded-md object-cover'
                                        />
                                        <div className='flex-1'>
                                            <h3 className='font-semibold text-lg'>{item.product.name}</h3>
                                            <p className='text-sm text-muted-foreground'>Rs:{item.product.price}</p>
                                            <div className='flex items-center space-x-2 mt-2'>
                                                <Button
                                                variant="outline"
                                                size="icon"
                                                disabled={item.quantity === 1}
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <MinusCircle className='h-4 w-4' />
                                                </Button>
                                                <span className='w-8 text-center'>{item.quantity}</span>
                                                <Button
                                                variant="outline"
                                                size="icon"
                                                disabled={item.quantity === item.product.quantity}
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} 
                                                >
                                                    <PlusCircle className='h-4 w-4' />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className='text-right'>
                                            <p className='font-semibold'>Rs:{item.product.price * item.quantity}</p>
                                            <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleRemoveFromCart(item.id)} 
                                            >
                                                <Trash2 className='h-4 w-4 text-red-500'/>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                        )}
                    </CardContent>
                    <Separator />
                    <div className='p-6 bg-background'>
                        <div className='flex justify-between w-full text-lg font-semibold mb-4'>
                            <span>Total:</span>
                            <span>Rs:{totalPrice}</span>
                        </div>
                        <div className='flex space-x-2 w-full'>
                            <Button
                            variant="destructive"
                            className='flex-1'
                            disabled={cart?.items.length === 0}
                            onClick={handleClearCart}
                            >
                                Clear Cart
                            </Button>
                            <Button
                            className='flex-1'
                            disabled={cart?.items.length === 0 || checkOutLoading}
                            onClick={() => {}}
                            >
                                {checkOutLoading? "Processing..." : "Proceed to Checkout"}
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    </>
  )
}

export default CartPage;