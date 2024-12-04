'use client';

import { Cart } from "@/app/types/cart.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import CartItem from "@/app/components/checkout/CartItem";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/app/hooks/useOrder";
import { useCart } from "@/app/hooks/useCart";
import { useRouter } from "next/navigation";
// import { toast } from 'react-hot-toast';

interface OrderSummaryProps {
  cart: Cart | null;
  totalPrice: number;
  selectedAddress: string | null;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cart,
  totalPrice,
  selectedAddress,
}) => {
  const { createNewOrder, createNewPaymentOrder, verifyPaymentOrder } = useOrder();
  const { clearCartItems } = useCart();
  const router = useRouter();

  const handleProceedToPayment = async () => {
    if (!cart || !selectedAddress) {
      // toast.error("Please select an address");
      return;
    }
    try {
      const orderResponse = await createNewOrder({
        cartId: cart.id,
        addressId: selectedAddress,
        totalAmount: totalPrice * 1.05, // include 5% tax
      });

      if (!orderResponse.payload.order) {
        throw new Error("Failed to create order");
      }

      console.log("Created order--->", orderResponse);

      // Initiate payment
      const paymentResponse = await createNewPaymentOrder(orderResponse.payload.order.id);

      if (!paymentResponse.payload.razorpayOrderId) {
        throw new Error("Failed to initiate payment");
      }

      // Open Razorpay payment modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: Math.round(totalPrice * 105), // Razorpay expects amount in paise
        currency: "INR",
        name: "Pro Lifts",
        description: "Purchase of products",
        order_id: paymentResponse.payload.razorpayOrderId,
        handler: async function (response: any) {
          try {
            await verifyPaymentOrder({
              razorpayOrderId: paymentResponse.payload.razorpayOrderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            console.log("Payment verified--->", response);
            // toast.success("Payment successful!");
            await clearCartItems();
            router.push("/order-confirmation");
          } catch (error) {
            console.error("Error verifying payment: ", error);
            // toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "Customer name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error creating payment order: ", error);
      // toast.error("An error occurred during the payment process. Please try again.");
    }
  };

  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="bg-gray-500">
        <CardTitle className="text-2xl">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="divide-y">
        {cart && cart.items.length > 0 ? (
          <>
            <div className="max-h-96 overflow-y-auto py-4">
              {cart.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className="py-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs: {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>Rs: {(totalPrice * 0.05).toFixed(2)}</span>
              </div>
              <motion.div
                className="flex justify-between font-bold text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span>Total</span>
                <span>Rs: {(totalPrice * 1.05).toFixed(2)}</span>
              </motion.div>
            </div>
          </>
        ) : (
          <p>Cart is empty. Please add items to your cart</p>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50">
        <Button
          className="w-full"
          disabled={!cart || cart.items.length === 0 || !selectedAddress}
          onClick={handleProceedToPayment}
        >
          Proceed to payment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;

