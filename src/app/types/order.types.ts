import { Address } from "./address.types";
import { Product } from "./products.types";
import { User } from "./user.types";

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  addressId: string;
  shippingAddress?: Address;
  user?: User;
  paymentDetails: {
    id: string;
    razorpayOrderId: string;
    razorpayPaymentId?: string;
    status: PaymentStatus;
  };
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "COMPLETED"
  | "CANCELLED";
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface CreateOrderData {
  cartId: string;
  addressId: string;
  totalAmount: number;
}

export interface VerifyPaymentData {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface SingleOrder {
  addressId: string;
  createdAt: string;
  id: string;
  items: OrderItem[];
  shippingAddress: Address;
  status: OrderStatus;
  totalAmount: number;
  user: User;
  updatedAt: string;
  userId: string;
}