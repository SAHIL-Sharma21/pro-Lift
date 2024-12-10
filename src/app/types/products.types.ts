//products types which will fetch from the backend

import { Category} from "./category.types";

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId?: string;
    image: string;
    quantity: number;
    category?: Category;
    createdAt: string;
    updatedAt: string;
}

export interface ProductCreate {
    name: string;
    description: string;
    price: number;
    categoryId: string;
    image: string | null;
    quantity: number;
}

export interface ProductUpdate {
    name?: string;
    description?: string;
    price?: number;
    categoryId?: string;
    image?: string | null;
    quantity?: number;
}