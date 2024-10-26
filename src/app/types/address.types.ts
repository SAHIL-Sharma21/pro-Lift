export interface Address {
    id: string;
    address1: string;
    city: string;
    country: string
    postalCode: string;
    userId: string
}

export interface AddressCreate {
    address1: string;
    city: string;
    country: string
    postalCode: string;
    userId: string
}

export interface AddressUpdate {
    address1?: string;
    city?: string;
    country?: string
    postalCode?: string;
}