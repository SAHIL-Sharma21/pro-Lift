'use client'

import { useOrder } from "@/app/hooks/useOrder";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function OrderPage(){
    const {orderId} = useParams();
    const {fetchOrderById, loading, error, currentOrder} = useOrder();
    console.log("orderId--->", orderId);

    useEffect(() => {
        fetchOrderById(orderId as string);
    }, [orderId, fetchOrderById]);

    console.log("currentOrder--->", currentOrder);
    return(
        <>
            <h2>single order</h2>
        </>
    );
}