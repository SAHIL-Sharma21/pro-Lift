'use client'

import { Button } from "@/components/ui/button"

import ProductList from '@/app/components/dashboard/ProductList';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { useCategory } from "@/app/hooks/useCategory";


export default function ProductsPage() {

    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");

    const {loading, addCategory } = useCategory();


    const handleCreateCategory = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await addCategory({
                name: categoryName,
                 description: categoryDescription
            });

            if(result.meta.requestStatus === "rejected"){
                throw new Error("Failed to create category");
            }
        } catch (error) {
            console.error("Error creating category: ", error);
        } finally {
            setCategoryName("");
            setCategoryDescription("");
        }
    }


    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center">
                    <h1 className="text-3xl font-bold">Products</h1>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button>Create category</Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <form className="space-y-4" onSubmit={handleCreateCategory}>
                                    <div className="space-y-2">
                                        <Label htmlFor="categoryName">Category Name</Label>
                                        <Input 
                                        id="categoryName"
                                        type="text"
                                        placeholder="Category Name"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="categoryDescription">Category Description</Label>
                                        <Input 
                                        id="categoryDescription"
                                        type="text"
                                        placeholder="Enter category description"
                                        value={categoryDescription}
                                        onChange={(e) => setCategoryDescription(e.target.value)}
                                        required
                                        />
                                    </div>
                                    <Button
                                    type="submit"
                                    disabled={loading}
                                    >
                                        {loading ? "creating..." : "Create Category"}
                                    </Button>
                                </form>
                            </PopoverContent>
                        </Popover>
                        <Button asChild>
                            <Link href="/dashboard/products/create">Create Product</Link>
                        </Button>
                    </div>
                </div>
                <ProductList />
            </div>
        </>
    )
}