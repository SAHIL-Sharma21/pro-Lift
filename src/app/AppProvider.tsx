'use client'

import React, { useEffect, useState } from "react";
import { store } from "./lib/redux/store";
import {Provider} from 'react-redux';
import Navbar from "./components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function AppProvider({children}: {children: React.ReactNode}){

    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const handleError = (error: ErrorEvent) => {
            console.log("Caught an error:", error);
            setHasError(true);
        };

        window.addEventListener("error", handleError);

        return () => {
            window.removeEventListener("error", handleError);
        };
    }, []);

    if(hasError){
        return <div>Something went wrong. Please refresh the page.</div>
    }

    return (
        <Provider store={store}>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
                <Navbar/>
                {children}
                <Toaster />
                <Footer/>
            </GoogleOAuthProvider>
        </Provider>
    );
}