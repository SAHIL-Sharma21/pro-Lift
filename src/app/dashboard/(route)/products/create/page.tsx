'use client'


import { useCategory } from '@/app/hooks/useCategory'
import { useProduct } from '@/app/hooks/useProduct'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function ProductCreate() {

    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState<File | null>(null);
    const [quantity, setQuantity] = useState(0);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");

    const {loading, addProducts} = useProduct();
    const {categories, fetchAllCategories} = useCategory();
    const router = useRouter();

    useEffect(() => {
        fetchAllCategories();
    }, [fetchAllCategories]);


    const handleCreateProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!selectedCategoryId){
            console.error("No category selected");
            return;
        }

        try {
            const result = await addProducts({
                name: productName,
                description: productDescription,
                price,
                image: imageUrl as File,
                quantity,
                categoryId: selectedCategoryId
            });
            console.log("Product created-->", result);
            router.push("/dashboard/products");
        } catch (error) {
            console.error("Error creating product: ", error);
        } finally {
            resetForm();
        }
    }


    const resetForm = () => {
        setProductName("");
        setProductDescription("");
        setPrice(0);
        setImageUrl(null);
        setQuantity(0);
        setSelectedCategoryId("");
    }


  return (
   <>
    <div className='max-w-md mx-auto mt-10'>
        <h1 className='text-3xl font-bold mb-6'>Create Product</h1>
        <form className='space-y-4' onSubmit={handleCreateProduct}>
            <div className='space-y-2'>
                <Label>Category</Label>
                <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className='space-y-2'>
                <Label htmlFor='productName'>Product Name</Label>
                <Input 
                id='productName'
                type='text'
                placeholder='Product Name'
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                />
            </div>
            <div className='space-y-2'>
                <Label htmlFor='productName'>Product Description</Label>
                <Textarea 
                id='productName'
                placeholder='Product Description'
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                required
                />
            </div>
            <div className='space-y-2'>
                <Label htmlFor='price'>Price</Label>
                <Input 
                id='price'
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.valueAsNumber)}
                required
                />
            </div>
            <div className='space-y-2'>
                <Label htmlFor='productImage'>Product Image</Label>
                <Input 
                id='productImage'
                type='file'
                onChange={(e) => setImageUrl(e.target.files ? e.target.files[0] : null)}
                required
                />
            </div>
            <div className='space-y-2'>
                <Label htmlFor='quantity'>Quantity</Label>
                <Input 
                id='quantity'
                type='number'
                value={quantity}
                onChange={(e) => setQuantity(e.target.valueAsNumber)}
                required
                />
            </div>
            <Button
            type='submit'
            disabled={loading}
            >
                {loading ? "Creating..." : "Create Product"}                        
            </Button>
        </form>
    </div>
   </>
  )
}

export default ProductCreate