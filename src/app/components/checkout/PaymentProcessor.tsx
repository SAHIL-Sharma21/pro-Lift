'use client'

import React from 'react'

interface PaymentProcessorProps {
    onPaymentSuccess: () => void;
    onPaymentFailure: () => void;
}

const PaymentProcessor = ({onPaymentSuccess, onPaymentFailure}: PaymentProcessorProps) => {
  return (
    <div>PaymentProcessor</div>
  )
}

export default PaymentProcessor