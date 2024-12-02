'use client';

import { Cart } from '@/app/types/cart.types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'
import CartItem from '@/app/components/checkout/CartItem';
import {motion} from 'framer-motion';
import { Button } from '@/components/ui/button';


interface OrderSummaryProps {
    cart: Cart | null;
    totalPrice: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({cart, totalPrice}) => {
  return (
    <>
        <Card className='mb-6 overflow-hidden'>
            <CardHeader className='bg-gray-500'>
                <CardTitle className='text-2xl'>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className='divide-y'>
                {cart && cart.items.length > 0 ? (
                    <>
                    <div className='max-h-96 overflow-y-auto py-4'>
                        {cart.items.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                    <div className='py-4 space-y-2'>
                        <div className='flex justify-between'>
                            <span>Subtotal</span>
                            <span>Rs: {totalPrice}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span>Tax (5%)</span>
                            <span>Rs: {(totalPrice * 0.05).toFixed(2)}</span>
                        </div>
                        <motion.div
                        className='flex justify-between font-bold text-lg'
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3, duration: 0.5}}
                        >
                            <span>Total</span>
                            <span>Rs: {(totalPrice * 1.05).toFixed(2)}</span>
                        </motion.div>
                    </div>
                    </>
                ): (
                    <>
                        <p>Cart is empty. Please add items to your cart</p>
                    </>
                )}
            </CardContent>
            <CardFooter className='bg-gray-50'>
                <Button
                className='w-full'
                disabled={!cart || cart.items.length === 0}
                >
                    Proceed to payment
                </Button>
            </CardFooter>
        </Card>
    </>
  )
}

export default OrderSummary