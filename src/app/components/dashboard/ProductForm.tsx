'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import React, { useState } from 'react'
import {useProduct} from '@/app/hooks/useProduct';

interface ProductCreationProps {
  categoryId: string,
  onComplete: () => void
}

const ProductForm = ({categoryId, onComplete}: ProductCreationProps) => {

  const [productName, setProductName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState<File | null>(null);
  const [quantity, setQuantity] = useState(0);
  const {addProducts, loading, error} = useProduct();
 // we have to create the cutrom hooks for this

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(!categoryId){
      // TODO: show notification
      console.log("No category selected");
      return;
    }

    try {
      //crerate the product funtionality or hooks
      const result = addProducts({categoryId, description, name: productName, price, image: imageUrl as File, quantity});
      console.log(result);
      onComplete();
    } catch (error:any) {
      // TODO: show notification
      console.log("Error creating product: ", error);
      return;
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='flex flex-col space-y-2'>
          <Label htmlFor='name'>Product Name</Label>
          <Input
          type='text'
          id='name'
          placeholder='Enter product name'
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          />
        </div>
        <div className='flex flex-col space-y-2'>
          <Label htmlFor='description'>Product Description</Label>
          <Input
          type='text'
          id='description'
          placeholder='Enter product description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          />
        </div>
        <div className='flex flex-col space-y-2'>
          <Label htmlFor='name'>Price</Label>
          <Input
          type='number'
          id='price'
          placeholder='Enter product price'
          value={price}
          onChange={(e) => setPrice(e.target.valueAsNumber)}
          required
          step="0.01"
          />
        </div>
        <div className='flex flex-col space-y-2'>
          <Label htmlFor='name'>Product Image</Label>
          <Input
          type='file'
          id='image'
          placeholder='product image'
          onChange={(e) => setImageUrl(e.target.files? e.target.files[0] : null)}
          required
          />
        </div>
        <div className='flex flex-col space-y-2'>
          <Label htmlFor='name'>Quantity</Label>
          <Input
          type='number'
          id='quantity'
          placeholder='Enter quantity'
          value={quantity}
          onChange={(e) => setQuantity(e.target.valueAsNumber)}
          required
          />
        </div>
        <Button
        type='submit'
        disabled={loading}
        >
          {loading ? "Creating...": "create product"}
        </Button>
        {error && (
          <Alert variant="destructive" className='mt-4'>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </form>
    </>
  )
}

export default ProductForm;