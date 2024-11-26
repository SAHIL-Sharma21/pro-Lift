'use client'

import { useAddress } from '@/app/hooks/useAddress';
import { useAuth } from '@/app/hooks/useAuth';
import { useOrder } from '@/app/hooks/useOrder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import AddressForm from '@/app/components/checkout/AddressForm';
import OrderSummary from '@/app/components/checkout/OrderSummary'; 
import PaymentProcessor from '@/app/components/checkout/PaymentProcessor';


const CheckoutFlow = () => {

  const [setp, setSetp] = useState(1);
  const {loading, error, currentOrder, initiateCheckout, processPaymentAction, verifyPaymentAction }= useOrder();
  const {getAllAdress} = useAddress();
  const {isAuthenticated} = useAuth();

  const router = useRouter();

  useEffect(() => {
    if(isAuthenticated){
      getAllAdress();
    }
  }, [isAuthenticated, getAllAdress]);


  const nextStep = () => setSetp(prev => prev + 1);
  const prevStep = () => setSetp(prev => prev - 1);

  const handleCheckout = async() => {
    await initiateCheckout();
    nextStep();
  }

  const paymentFailure = () => {

  }

  const handlePayment = async() => {
    await processPaymentAction();
    nextStep();
  }

  if(!isAuthenticated){
    return(
      <Card className='w-full max-w-2xl mx-auto'>
        <CardHeader>
          <CardTitle>Please Login to Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You need to login to checkout</p>
          <Button variant="link" onClick={() => router.push("/auth/login")}>Login</Button>
        </CardContent>
      </Card>
    );
  }


  const renderStep = () => {
    switch(setp){
      case 1:
        return <AddressForm onNext={nextStep} />;
      case 2:
        return <OrderSummary onNext={nextStep} onPrev={prevStep}/>;
      case 3:
        return <PaymentProcessor onPaymentSuccess={handlePayment} onPaymentFailure={paymentFailure} />;
      default:
        return <div>Invalid step</div>;
    }
  };


  if(loading){
    return (
      <div>Loading...</div>
    )
  }

  if(error){
    return (
      <div>Error: {error}</div>
    )
  }

  return (
    <>
      <Card className='w-full max-w-2xl mx-auto'>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
      </Card>
    </>
  )
}

export default CheckoutFlow;