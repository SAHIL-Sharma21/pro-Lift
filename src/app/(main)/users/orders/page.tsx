'use client';

import { useOrder } from '@/app/hooks/useOrder';
import {  ChevronDown, Loader2, Package } from 'lucide-react';
import React, { useEffect } from 'react'
import {motion, AnimatePresence} from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { OrderStatus } from '@/app/types/order.types';

function UserOrders() {

   const {getAllOrders, orders, loading} = useOrder();

   useEffect(() => {
    getAllOrders();
   }, [getAllOrders])

   if(loading) {
    return (
        <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-orange-400" />
      </div>
    );
   }

   if(orders.length === 0) {
    return (
        <motion.div
        initial={{opacity:0, y:20}}
        animate={{opacity:1, y:0}}
        transition={{duration: 0.5}}
        className='flex flex-col justify-center items-center h-screen'
        >
            <Package className='h-16 w-16 text-zinc-400 mb-4'/>
            <h2 className='text-2xl font-semibold mb-2'>No orders yet</h2>
            <p className='text-zinc-400 mb-4'>Looks like you haven't placed any orders yet</p>
            <Button asChild>
                <Link href="/products">Start shopping</Link>
            </Button>
        </motion.div>
    );
   }

  return (
    <>
        <div className='container mx-auto px-4 py-8'>
            <motion.h1
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            className='text-3xl font-bold mb-6'
            >
                Your orders
            </motion.h1>
            <AnimatePresence>
                {orders.map((order) => (
                    <motion.div
                    key={order.id}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -20}}
                    transition={{duration: 0.3, delay: 0.1}}
                    >
                        <Card className='mb-6'>
                            <CardHeader>
                                <CardTitle className='flex justify-between items-center'>
                                    <span>Order #{order.id}</span>
                                    <Badge variant={getOrderStatusVariant(order.status)}>{order.status}</Badge>
                                </CardTitle>
                                <CardDescription>Placed on {new Date(order.createdAt).toLocaleDateString()}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Accordion type='single' collapsible>
                                    <AccordionItem value='items'>
                                        <AccordionTrigger>
                                            Order items 
                                            <ChevronDown className='ml-2 h-4 w-4'/>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className='space-y-2'>
                                                {order.items.map((item) => (
                                                    <li key={item.id} className='flex justify-center items-center'>
                                                        <span>{item.product.name}</span>
                                                        <span>{item.quantity}</span>
                                                        <span>Rs.{item.price}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                            <CardFooter className='flex justify-between'>
                                <span className='font-semibold'>Total:</span>
                                <span className='font-bold text-lg'>Rs.{order.totalAmount}</span>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    </>
  )
}

function getOrderStatusVariant(status: OrderStatus): "outline" | "default" | "destructive" | "secondary" {
    switch (status) {
      case "PENDING":
        return "outline";
      case "PROCESSING":
        return "default";
      case "SHIPPED":
        return "secondary";
      case "COMPLETED":
        return "secondary";
      case "CANCELLED":
        return "destructive";
      default:
        return "outline";
    }
  }

export default UserOrders;