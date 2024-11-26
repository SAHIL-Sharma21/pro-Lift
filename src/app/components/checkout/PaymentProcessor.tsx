'use client'

import { useOrder } from '@/app/hooks/useOrder';
import React, { useEffect } from 'react'

interface PaymentProcessorProps {
    onPaymentSuccess: () => void;
    onPaymentFailure: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentProcessor = ({onPaymentSuccess, onPaymentFailure}: PaymentProcessorProps) => {

  const {currentOrder, razorpayOrderId, verifyPaymentAction, addresses} = useOrder();

  useEffect(() => {
    if(razorpayOrderId){
      const script = document.createElement('script');
      script.src = `https://checkout.razorpay.com/v1/checkout.js`;
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
          amount: currentOrder?.totalAmount! * 100, // razorpay expects amount in paise
          curreny: "INR",
          name: "Pro Lift",
          description: "Payment for order",
          order_id: razorpayOrderId,
          handler: function(response: any) {
            verifyPaymentAction({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              addressId: currentOrder?.id! // TODO:here to debug
            });
            onPaymentSuccess();
          },
          prefill:{
            name: "customer name",
            email: "customer@email.com",
            contact: "9999999999"
          },
          theme: {
            color: "#F3723A"
          }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      };
      
      return () => {
        document.body.removeChild(script);
      }
    }
  }, [razorpayOrderId, currentOrder, verifyPaymentAction, onPaymentSuccess]);

  return (
   <>
    <div className='text-center'>
      <h2 className='text-2xl font-bold mb-4'>Processing Payment</h2>
      <p>Please complete the payment in razorpay window.</p>
    </div>
   </>
  )
}

export default PaymentProcessor;