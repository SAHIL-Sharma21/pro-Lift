//products types which will fetch from the backend

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId?: string;
    image: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
}