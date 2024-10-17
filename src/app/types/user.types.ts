export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export interface RegisterUserCredentials {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: string; //default set to CUSTOMER
    phoneNumber: string;
}

export interface LoginUserCredentials {
    email: string;
    password: string;
}
export interface ApiCallCredentials {
    url: string;
    method: string;
    body?: any;
    token?: string;
}