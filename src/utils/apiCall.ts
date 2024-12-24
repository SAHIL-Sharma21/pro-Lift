//cutsom api call method wirh bearer token

import {RootState} from '@/app/lib/redux/store';

interface ApiCallOptions {
    url: string;
    method: "GET" | "POST" | "PATCH" | "DELETE";
    body?: object;
}

export const apiCall  = async(options: ApiCallOptions, getState: () => RootState) => {
    const state = getState();
    const token = state.auth.accessToken;
    const cartId = localStorage.getItem("cartId");

    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    }

    if(token){
        headers["Authorization"] = `Bearer ${token}`
    }

    if(cartId){
        headers["X-Cart-Id"] = cartId;
    }

    const response = await fetch(options.url, {
        method: options.method,
        headers: headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
        credentials: "include"
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred");
    }
    
    return response;
}