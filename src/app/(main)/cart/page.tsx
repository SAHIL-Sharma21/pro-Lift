'use client'

import CartComponent from '@/app/components/cart/CartPage';
import { Card } from '@/components/ui/card';

export default function CartPage(){
    return(
        <div className='flex items-center justify-center min-h-screen  bg-slate-900 p-4 overflow-hidden'>
            <Card className='w-full max-w-4xl h-[calc(100vh-2rem)] flex flex-col'>
                <div className='flex-grow overflow-auto p-4'>
                    <CartComponent/>
                </div>
            </Card>
        </div>
    );
}