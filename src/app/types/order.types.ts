//order types

export interface OrderItem {
    id: string;
    productId: string;
    quantity: number;
    price: number;
}


export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
}