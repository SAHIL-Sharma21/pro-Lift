'use client'

import React, { useState } from 'react'
import AddressSection from '@/app/components/checkout/AddressSection';
import AddresForm from '@/app/components/checkout/AddressForm';
import { useAddress } from '@/app/hooks/useAddress';
import OrderSummary from '@/app/components/checkout/OrderSummary';
import { useCart } from '@/app/hooks/useCart';
import Script from 'next/script';

function CheckoutPage() {

  const [isNewAddress, setIsNewAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const {cart, totalPrice} = useCart();

  const {getAllAdress} = useAddress();


  const handleAddressAdd = () => {
    setIsNewAddress(false);
    getAllAdress();
  }

  return (
    <div className='container mx-auto p-6'>

      <Script 
      src='https://checkout.razorpay.com/v1/checkout.js'
      strategy='lazyOnload'
      />

      <h1 className='text-2xl font-bold mb-6'>Checkout</h1>

      {/* address section  */}
      <AddressSection 
      selectedAddress={selectedAddress}
      onSelectedAddress={setSelectedAddress}
      onNewAddress={() => setIsNewAddress(true)}
      />

      {isNewAddress && (
        <AddresForm onAddressAdded={handleAddressAdd} />
      )}

      {/* OrderSummary  */}
      <OrderSummary cart={cart} totalPrice={totalPrice} selectedAddress={selectedAddress} />

    </div>
  )
}

export default CheckoutPage;