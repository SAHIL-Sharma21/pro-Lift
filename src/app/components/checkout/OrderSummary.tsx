'use client'

import { useOrder } from '@/app/hooks/useOrder';
import { Button } from '@/components/ui/button';
import React from 'react'

interface OrderSummaryProps {
    onNext: () => void;
    onPrev: () => void;
}

const OrderSummary = ({onNext, onPrev}: OrderSummaryProps) => {

  const {currentOrder, addresses} = useOrder();

  if(!currentOrder){
    return <div>No Order found</div>
  }

  return (
    <>
      <div className='space-y-4'>
        <h2 className='text-2xl font-bold'>Order Summary</h2>
        <div>
          <h3 className='font-semibold'>Items:</h3>
          {currentOrder.items.map((item) => (
            <div key={item.id} className='flex justify-between'>
              <span>{item.productId}</span> {/* have to debug heree*/}
              <span>Rs: {item.price * item.quantity}</span>
            </div>
          ))}
        </div>
        <div className='font-semibold'>
          Total: Rs: {currentOrder.totalAmount}
        </div>
        <div>
          <h3 className='font-semibold'>Shipping Address ID:</h3>
          <p>{addresses[0].id}</p>
        </div>
        <div className='flex justify-between'>
          <Button onClick={onPrev}>Back</Button>
          <Button onClick={onNext}>Proceed to checkout</Button>
        </div>
      </div>
    </>
  )
}

export default OrderSummary