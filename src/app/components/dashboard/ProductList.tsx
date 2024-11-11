'use client'

import React, { useEffect } from 'react'
import {useProduct} from '@/app/hooks/useProduct'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'

const ProductList = () => {

  const {loading, error, getAllProducts, products} = useProduct();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);


  if(loading) return <div>Loading Products...</div>;
  if(error) return <div>Error: {error}</div>;


  return (
    <>
      <div className='space-y-4'>
        {/* <h2 className='text-2xl font-bold'>Products</h2> */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>Rs.{product.price.toFixed(2)}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.categoryId}</TableCell> {/* TODO: add category name here no id*/}
                <TableCell>
                  <div className='flex space-x-2'>
                    <Button variant="outline" size="icon">
                      <Pencil className='h-4 w-4' />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default ProductList;