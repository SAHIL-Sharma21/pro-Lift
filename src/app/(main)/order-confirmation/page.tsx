'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import {motion} from 'framer-motion';
import React, { useEffect, useState } from 'react'
import {  CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOrder } from '@/app/hooks/useOrder';
import dynamic from 'next/dynamic';

const ReactConfietti = dynamic(() => import('react-confetti'), {ssr: false});

const OrderConfirmPage = () => {
  const router = useRouter();
  const {currentOrder} = useOrder();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className='min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-4 relative overflow-hidden'>
        {showConfetti && <ReactConfietti />}
        <Card className='w-full max-w-md z-10'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold text-center'>order Confirmation!</CardTitle>
          </CardHeader>
          <CardContent>
              <motion.div
              initial={{scale: 0}}
              animate={{scale: 1}}
              transition={{type: "spring", stiffness: 260, damping: 20}}
              className='flex justify-center'
              >
                  <CheckCircle className='w-24 h-24 text-green-500 mx-auto'/>
              </motion.div>
              <p className='text-center text-gray-600'>
                Thank you for your purchase! Your orderhas been successfully placed and its being processed.
              </p>
              <div className='bg-gray-100 p-4 rounded-lg'>
                <h3 className='font-semibold mb-2'>Order Details</h3>
                <p >Order ID: {currentOrder?.id || "#12345"}</p>
                <p>Estimated Delivery: 3-5 business days</p>
              </div>
          </CardContent>
          <CardFooter className='flex justify-between'>
              <Button
              className='w-full'
              onClick={() => router.push("/products")}
              >
                Continue shopping
              </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default OrderConfirmPage;
