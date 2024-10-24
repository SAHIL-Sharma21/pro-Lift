'use client'

import React, { use, useEffect } from 'react'
import {useProduct} from '@/app/hooks/useProduct'
import {Table, TableBody, TableHead, TableHeader, TableRow} from '@/components/ui/table'

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
        <h2 className='text-2xl font-bold'>Products</h2>
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

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default ProductList