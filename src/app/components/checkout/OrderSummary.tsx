'use client'

import React from 'react'

interface OrderSummaryProps {
    onNext: () => void;
    onPrev: () => void;
}

const OrderSummary = ({onNext, onPrev}: OrderSummaryProps) => {
  return (
    <div>OrderSummary</div>
  )
}

export default OrderSummary