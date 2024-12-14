//category types
import {Product} from './products.types';

export interface Category {
    id: string;
    name: string;
    description: string;
    products?: Product[];
}

export interface CategoryWithProducts extends Category {
    products?: Product[];
}

export interface CreateCategory{
    name: string;
    description?: string;
}

export interface UpdateCategory {
    name?: string;
    description?: string;
}