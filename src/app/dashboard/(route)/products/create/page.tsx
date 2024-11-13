'use client'

import { useCategoryState, useCreateCategory, useGetAllCategories } from '@/app/hooks/useCategory';
import { useProduct } from '@/app/hooks/useProduct';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react'

function Create() {


    //for category
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const {loading, error: categoryError,create} = useCreateCategory();
    const {loading: categoryLoading, error: allCategoryError, fetchAll, categories} = useGetAllCategories();

    // useEffect(() => {
    //     fetchAll();
    // }, [fetchAll]);

    //for product
    const [productName, setProductName] = useState("");
    const [productDescrioption, setProductDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState<File | null>(null);
    const [quantity, setQuantity]= useState(0);
    const [selectCategoryId, setSelectCategoryId] = useState("");
    const {loading: productLoading, error: productError, addProducts} = useProduct();


    const [showProductDialog, setShowProductDialog] = useState(false);


    const handleCategorySubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await create({name: categoryName, description: categoryDescription});
            console.log("Category created-->", result)
            setShowProductDialog(true);
            fetchAll(); // fetching all categories -> gotcha moment will have to look 
        } catch (error) {
            // TODO: show notification or toast messages
            console.error("Error creating category: ", error);
        }
    }

    //for product
    const handleProductSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        //if id is not selected then this error.
        if(!selectCategoryId){
            console.error("No category selected");
            return;
        }

        try {
            const result = await addProducts({
                categoryId: selectCategoryId,
                name: productName,
                description: productDescrioption,
                price: price,
                image: imageUrl as File,
                quantity: quantity
            });
            console.log("Product created-->", result);
            setShowProductDialog(false);

            //TODO: show notification
        } catch (error) {
            // TODO: show notification or toast messages
            console.error("Error creating product: ", error);
        } finally {
            //reset the form
            resetProductForm();
        }
    }


    const resetProductForm = () => {
        setProductName("");
        setProductDescription("");
        setPrice(0);
        setImageUrl(null);
        setQuantity(0);
        setSelectCategoryId("");
    }


  return (
    <>
        <div className='max-w-4xl mx-auto mt-10 space-y-8 p-6 bg-gray-800 rounded-lg'>
            <h2 className='text-2xl text-white '>create product</h2>

            <form className='space-y-4'>
                <div className='space-y-2'>
                    <Label htmlFor='categoryName' className='text-white font-semibold' >Categogy Name</Label>
                    <Input
                    type='text'
                    id='categoryName'
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                    />
                </div>
                <div className='space-y-2'>
                    <Label htmlFor='categoryDescription' className='text-white font-semibold'>Categogy Description</Label>
                    <Input
                    type='text'
                    id='categoryDescription'
                    value={categoryDescription}
                    onChange={(e) => setCategoryDescription(e.target.value)}
                    required
                    />
                </div>
                <Button
                type='submit'
                disabled={loading}
                >
                    {categoryLoading ? "Creating..." : "Create Category"}
                </Button>
                {categoryError && (
                    <Alert variant="destructive">
                        <AlertCircle className='w-3 h-3'/>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{categoryError}</AlertDescription>
                    </Alert>
                )}
            </form>
            
            {/* dialog for  product  */}
            
            <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Product</DialogTitle>
                    </DialogHeader>
                    <form className='space-y-4'>
                        <div className='flex flex-col space-y-2'>
                            <Label htmlFor='category'>Category</Label>
                            <Select value={selectCategoryId} onValueChange={setSelectCategoryId}>
                                <SelectTrigger>
                                    <SelectValue placeholder='select a category' />
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
                        <div className='flex flex-col space-y-2'>
                            <Label htmlFor='productName'>Product Name</Label>
                            <Input
                            type='text'
                            id='productName'
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder='Enter product name'
                            required
                            />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <Label htmlFor='productDescription'>Product Description</Label>
                            <Input
                            type='text'
                            id='productDescription'
                            value={productDescrioption}
                            onChange={(e) => setProductDescription(e.target.value)}
                            placeholder='Enter product description'
                            required
                            />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <Label htmlFor='price'>Price</Label>
                            <Input
                            type='number'
                            id='price'
                            value={price}
                            onChange={(e) => setPrice(e.target.valueAsNumber)}
                            placeholder='Enter product price in Rs. (Indian Rupees)'
                            required
                            />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <Label htmlFor='productImage'>Product Image</Label>
                            <Input
                            type='file'
                            id='productImage'
                            onChange={(e) => setImageUrl(e.target.files ? e.target.files[0]: null)}
                            placeholder='Product Image'
                            required
                            />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <Label htmlFor='quantity'>Quantity</Label>
                            <Input
                            type='number'
                            id='quantity'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.valueAsNumber)}
                            placeholder='Product quantity'
                            required
                            />
                        </div>
                        <Button
                        type='submit'
                        disabled={productLoading}
                        >
                            {productLoading ? "Creating...": "Create Product"}
                        </Button>
                        {productError && (
                            <Alert variant="destructive" className='mt-4'>
                                <AlertCircle className='h-3 w-3' />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{productError}</AlertDescription>
                            </Alert>
                        )}
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    </>
  )
}

export default Create;