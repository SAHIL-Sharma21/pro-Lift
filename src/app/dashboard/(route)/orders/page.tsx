'use client'

import { useOrder } from "@/app/hooks/useOrder"
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect } from "react";

export default function OrdersPage() {

    const {loading, error, getAllOrders, orders} = useOrder();

    useEffect(() => {
        getAllOrders();
    }, [getAllOrders]);

    if(loading) return <div>Loading orders....</div>
    if(error) return <div>Error: {error}</div>

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Orders</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>OrderId</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>TotalAmount</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* length is not comming as undefined  have to debug here*/}
                    {orders.length > 0 ? (
                        <>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell>Rs:{order.totalAmount}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm">View Details</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </>
                    ) : (
                        <>
                            <h1>No Orders are there</h1>
                        </>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}