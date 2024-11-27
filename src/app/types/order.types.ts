//order types

import { Product } from "./products.types";

export interface OrderItem {
    id: string;
    productId: string;
    quantity: number;
    price: number;
    product: Product;
}


export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    addressId: string;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
}

export interface VerifyPaymentData {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    addressId: string;
}