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
  const {loading, error, initiateCheckout, processPaymentAction, verifyPaymentAction,selectedAddressId }= useOrder();
  const {getAllAdress} = useAddress();
  const {isAuthenticated} = useAuth();

  const router = useRouter();

  useEffect(() => {
    if(isAuthenticated){
      getAllAdress().catch((err) => {
        console.log("Error getting addresses: ", err);        
      })
    }
  }, [isAuthenticated]);


  const nextStep = () => setSetp(prev => prev + 1);
  const prevStep = () => setSetp(prev => prev - 1);

  const handleCheckout = async() => {
    if(selectedAddressId){
      try {
        await initiateCheckout();
        nextStep();
      } catch (error) {
        console.log("checkout Failed: ", error);
        alert("Checkout failed, please try again");
      }
    } else {
      alert("Please select an address before checkout");
    }
  }

  const handlePaymentSuccess = async() => {
    console.log("Payment successful");
    try {
      await processPaymentAction();
      router.push("/order-confirmation");
    } catch (error) {
      console.log("Error processing payment: ", error);
      alert("There was an error processing your payment, please try again");
    }
  }

  const handlePaymentFailure = () => {
    console.log("Payment failed");
    //TODO: show callback or new page 
    alert("Payment failed, please try again");
    setSetp(2); // go back to order summary
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
        return <OrderSummary onNext={handleCheckout} onPrev={prevStep}/>;
      case 3:
        return <PaymentProcessor onPaymentSuccess={handlePaymentSuccess} onPaymentFailure={handlePaymentFailure} />;
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