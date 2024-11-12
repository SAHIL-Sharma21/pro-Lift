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


export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    picture: string | null;
    role: 'ADMIN' | 'CUSTOMER';
    createdAt: string;
    updatedAt: string;
}

export interface LoginResponse{
    statusCode:number;
    data:{
        user: User;
        accessToken: string;
        refreshToken: string;
    },
    message: string;
    success: boolean;
}