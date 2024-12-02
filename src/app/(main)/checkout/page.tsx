'use client'

import React, { useState } from 'react'
import AddressSection from '@/app/components/checkout/AddressSection';
import AddresForm from '@/app/components/checkout/AddressForm';
import { useAddress } from '@/app/hooks/useAddress';


function page() {

  const [isNewAddress, setIsNewAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const {getAllAdress} = useAddress();


  const handleAddressAdd = () => {
    setIsNewAddress(true);
    getAllAdress();
  }



  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Checkout</h1>

      {/* address section  */}
      <AddressSection 
      selectedAddress={selectedAddress}
      onSelectedAddress={setSelectedAddress}
      onNewAddress={handleAddressAdd}
      />

      {isNewAddress && (
        <AddresForm onAddressAdded={handleAddressAdd} />
      )}

    </div>
  )
}

export default page