'use client'

import CartComponent from '@/app/components/cart/CartPage';
import CheckoutFlow from '@/app/components/checkout/CheckoutFlow';
import { useAuth } from '@/app/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useState } from 'react';


export default function CartPage(){

    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const {isAuthenticated, user} = useAuth();
    console.log("isAuthenticated-->", isAuthenticated);
    console.log("user-->", user);

    return(
        <div className="container mx-auto py-8 px-4">
            {isCheckingOut ? (
                <CheckoutFlow />
            ) : (
                <>
                    <CartComponent />
                    <Button
                    onClick={() => setIsCheckingOut(true)}
                    className='mt-4'
                    disabled={!isAuthenticated}
                    >
                        {isAuthenticated ? "Proceed to checkout" : "Please login to checkout" }
                    </Button>
                </>
            )}
        </div>
    );
}