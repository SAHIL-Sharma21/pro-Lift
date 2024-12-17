'use client'

import React, { useEffect, useState } from "react";
import { store } from "./lib/redux/store";
import {Provider} from 'react-redux';
import Navbar from "./components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./components/Footer";

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
            <Navbar/>
            {children}
            <Toaster />
            <Footer/>
        </Provider>
    );
}