'use client'

import { useCart } from '@/app/hooks/useCart'
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { MinusCircle, PlusCircle, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const SidebarCart = () => {
    const {cart, loading, error, totalItems, totalPrice, removeItemFromCart, updateItemToCart} = useCart();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if(cart && cart.items.length > 0) {
            setIsOpen(true);
        }
    }, [cart]);


    const handleUpdateQuantity = async(cartItemId: string, newQuantity: number) => {
        //TODO: writing logic for this
    }

    const handleRemoveItem = async(cartItemId: string) => {
        //TODO: writing logic for this
    }


  return (
    <>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className='relative'>
                    <ShoppingCart className='h-4 w-4' />
                    {totalItems > 0 && (
                        <span className='absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center'>
                            {totalItems}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className='w-full sm:max-w-lg'>
                <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                {loading && <p>Loading...</p>}
                {error && <p className='text-red-500'>{error}</p>}
                {cart && cart.items.length === 0 && <p className='text-gray-500'>Your cart is empty</p>}
                {cart && cart.items.length > 0 && (
                    <div className='mt-8 space-y-4'>
                        {cart.items.map((item) => (
                            <div key={item.id} className='flex items-center space-x-4'>
                                <Image 
                                src={item.product.image} // error may come here
                                alt={item.product.name}
                                width={64}
                                height={64}
                                className='rounded-md'
                                />
                                <div className='flex-1'>
                                    <h3 className='text-sm font-medium'>{item.product.name}</h3>
                                    <p className='text-xs text-gray-500'>Rs: {item.product.price}</p>
                                    <div className='flex items-center space-x-2 mt-1'>
                                        <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                        >
                                            <MinusCircle className='h-4 w-4' />
                                        </Button>
                                        <span>{item.quantity}</span>
                                        <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <PlusCircle className='h-4 w-4' />
                                        </Button>
                                    </div>
                                </div>
                                <Button 
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveItem(item.id)}
                                >
                                    <Trash2 className='h-4 w-4' />
                                </Button>
                            </div>
                        ))}
                        <div className='border-t  pt-4'>
                            <div className='flex justify-between'>
                                <span className='font-medium'>Total:</span>
                                <span className='font-medium'>Rs.{totalPrice}</span>
                            </div>
                            <Button className='w-full mt-4'>Proceed to checkout</Button>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    </>
  )
}

export default SidebarCart