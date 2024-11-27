'use client'

import { useOrder } from '@/app/hooks/useOrder';
import { Button } from '@/components/ui/button';
import React from 'react'

interface OrderSummaryProps {
    onNext: () => void;
    onPrev: () => void;
}

const OrderSummary = ({onNext, onPrev}: OrderSummaryProps) => {

  const {currentOrder, addresses, selectedAddressId} = useOrder();

  if(!currentOrder){
    return <div>No Order found</div>
  }

  //to get the selected address array
  const selectAddress = addresses.find((address) => address.id === selectedAddressId);

  return (
    <>
      <div className='space-y-4'>
        <h2 className='text-2xl font-bold'>Order Summary</h2>
        <div>
          <h3 className='font-semibold'>Items:</h3>
          {currentOrder.items.map((item) => (
            <div key={item.id} className='flex justify-between'>
              <span>{item.product.name}</span> 
              <span>Rs: {item.product.price * item.quantity}</span>
            </div>
          ))}
        </div>
        <div className='font-semibold'>
          Total: Rs: {currentOrder.totalAmount}
        </div>
        <div>
          <h3 className='font-semibold'>Shipping Address:</h3>
          {selectAddress ? (
            <>
              <p>{selectAddress.address1}</p>
              <p>{selectAddress.city}, {selectAddress.state}</p>
              <p>{selectAddress.country}, {selectAddress.postalCode}</p>
            </>
          ) : (
            <p>No Address Selected</p>
          )}
        </div>
        <div className='flex justify-between'>
          <Button onClick={onPrev}>Back</Button>
          <Button onClick={onNext} disabled={!selectAddress} >Proceed to checkout</Button>
        </div>
      </div>
    </>
  )
}

export default OrderSummary