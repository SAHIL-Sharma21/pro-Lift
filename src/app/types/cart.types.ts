import { Product } from "./products.types";

//cart type here
export interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    product: Product;
}

export interface Cart {
    id: string;
    items: CartItem[];
}