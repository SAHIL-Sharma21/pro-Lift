'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import ProductList from '@/app/components/dashboard/ProductList';


export default function ProductsPage() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Products</h1>
                <Button asChild>
                    <Link href="/dashboard/products/create">Add New Product</Link>
                </Button>
                <ProductList />
            </div>
        </div>
    )
}