"use client";

import { OrderSkeleton } from "@/app/components/dashboard/OrderSkeleton";
import { useOrder } from "@/app/hooks/useOrder";
import {
  OrderStatus,
  PaymentStatus,
  SingleOrder,
} from "@/app/types/order.types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface FullOrder extends SingleOrder {
  payment?: {
    id: string;
    amount: string;
    razorpayOrderId: string;
    razorpayPaymentId?: string;
    status: PaymentStatus;
    currency: string;
  };
}

export default function OrderPage() {
  const { orderId } = useParams();
  const { fetchOrderById, loading, error, currentOrder } = useOrder();
  const [orderWithPayment, setOrderWithPayment] = useState<FullOrder | null>(
    null
  );

  useEffect(() => {
    if (orderId && typeof orderId === "string") {
      fetchOrderById(orderId);
    }
  }, [orderId, fetchOrderById]);

  if (loading) {
    return <OrderSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!currentOrder) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Order not found</AlertDescription>
      </Alert>
    );
  }

  const orderToDisplay = orderWithPayment || (currentOrder as FullOrder);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Order Details</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <CurrentOrder order={orderToDisplay} />
        <CustomerDetails order={orderToDisplay} />
      </div>
      <OrderItems order={orderToDisplay} />
    </div>
  );
}

function CurrentOrder({ order }: { order: FullOrder }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>Order ID: {order.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Status:</span>
            <OrderStatusBadge status={order.status} />
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Total Amount:</span>
            <span>Rs:{order.totalAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Order Date:</span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Payment Status:</span>
            <span>{order.payment?.status || "N/A"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CustomerDetails({ order }: { order: FullOrder }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">User Name: </span>{" "}
            {order.user.firstName} {order.user.lastName}
          </p>
          <p>
            <span className="font-semibold">Address ID:</span> {order.addressId}
          </p>
          <p>
            <span className="font-semibold">Payment ID:</span>{" "}
            {order.payment?.id || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Razorpay Order ID:</span>{" "}
            {order.payment?.razorpayOrderId || "N/A"}
          </p>
          {order.payment?.razorpayPaymentId && (
            <p>
              <span className="font-semibold">Razorpay Payment ID:</span>{" "}
              {order.payment.razorpayPaymentId}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function OrderItems({ order }: { order: FullOrder }) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Order Items</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product ID</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>Rs:{item.price}</TableCell>
                {/* total amout we have add tax p[rice here ] */}
                <TableCell className="font-semibold">
                  Rs:{Math.round(item.price * item.quantity * 105) / 100}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const statusColors: Record<OrderStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PROCESSING: "bg-blue-100 text-blue-800",
    SHIPPED: "bg-purple-100 text-purple-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  return <Badge className={statusColors[status]}>{status}</Badge>;
}
