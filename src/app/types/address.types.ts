export interface Address {
    id: string;
    AddressLine1: string;
    city: string;
    state: string;
    country: string
    postalCode: string;
    userId: string
}

export interface AddressCreate {
    addressLine1: string;
    city: string;
    state: string;
    country: string
    postalCode: string;
    userId?: string
}

export interface AddressUpdate {
    address1?: string;
    city?: string;
    state?: string;
    country?: string
    postalCode?: string;
}