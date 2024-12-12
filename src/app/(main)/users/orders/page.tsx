"use client";

import { useOrder } from "@/app/hooks/useOrder";
import { AlertCircle, CheckCircle, CreditCard, Loader2, Package, XCircle } from 'lucide-react';
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/app/types/order.types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function UserOrders() {
  const { getAllOrders, orders, loading } = useOrder();
  
  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-orange-400" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-center items-center h-screen"
      >
        <Package className="h-16 w-16 text-zinc-400 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
        <p className="text-zinc-400 mb-4">
          Looks like you haven't placed any orders yet
        </p>
        <Button asChild>
          <Link href="/products">Start shopping</Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Your orders
      </motion.h1>
      <AnimatePresence>
        {orders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Order #{order.id.slice(0, 8)}</span>
                  <Badge variant={getOrderStatusVariant(order.status)}>
                    {order.status}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b dark:border-zinc-700">
                        <th className="py-2 px-4 font-semibold text-sm text-zinc-500 dark:text-zinc-400">
                          Product
                        </th>
                        <th className="py-2 px-4 font-semibold text-sm text-zinc-500 dark:text-zinc-400">
                          Quantity
                        </th>
                        <th className="py-2 px-4 font-semibold text-sm text-zinc-500 dark:text-zinc-400 text-right">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b last:border-b-0 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                          <td className="py-3 px-4">{item.product?.name || 'Product Unavailable'}</td>
                          <td className="py-3 px-4">{item.quantity}</td>
                          <td className="py-3 px-4 text-right">
                            Rs. {item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="font-semibold">
                        <td className="py-3 px-4" colSpan={2}>
                          Total
                        </td>
                        <td className="py-3 px-4 text-right">
                          Rs. {order.totalAmount}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2" />
                    <span className="font-semibold">Payment Status:</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div
                          className={`flex items-center px-3 py-1 rounded-full ${getPaymentStatusStyle(
                            order.paymentStatus
                          )}`}
                        >
                          {getPaymentStatusIcon(order.paymentStatus)}
                          <span className="ml-1 font-medium">
                            {order.paymentStatus}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {getPaymentStatusDescription(order.paymentStatus)}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-lg">
                  Rs.{order.totalAmount}
                </span>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function getPaymentStatusStyle(status: string | undefined): string {
  switch (status?.toUpperCase() ?? '') {
    case "SUCCESS":
      return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
    case "FAILED":
      return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
  }
}

function getPaymentStatusIcon(status: string | undefined) {
  switch (status?.toUpperCase() ?? '') {
    case "SUCCESS":
      return <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />;
    case "PENDING":
      return <AlertCircle className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />;
    case "FAILED":
      return <XCircle className="w-4 h-4 text-red-500 dark:text-red-400" />;
    default:
      return <AlertCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />;
  }
}

function getPaymentStatusDescription(status: string | undefined) {
  switch (status?.toUpperCase() ?? '') {
    case "SUCCESS":
      return "Payment successful";
    case "PENDING":
      return "Payment pending";
    case "FAILED":
      return "Payment failed";
    default:
      return "Payment status unknown";
  }
}

function getOrderStatusVariant(status: OrderStatus): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "PENDING":
      return "outline";
    case "PROCESSING":
      return "secondary";
    case "SHIPPED":
    case "COMPLETED":
      return "default";
    case "CANCELLED":
      return "destructive";
    default:
      return "default";
  }
}

export default UserOrders;

