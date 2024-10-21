//category types
import {Product} from './products.types';

export interface Category {
    id: string;
    name: string;
    description: string;
}

export interface CategoryWithProducts extends Category {
    products?: Product[];
}

