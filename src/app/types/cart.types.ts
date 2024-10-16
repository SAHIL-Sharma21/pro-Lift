//cart type here
export interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    product: Product;
}

interface Product {
    name: string;
    price: number;
    image: string;
}

export interface Cart {
    id: string;
    items: CartItem[];
}