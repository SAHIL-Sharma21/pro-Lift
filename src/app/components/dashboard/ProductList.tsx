'use client'

import React, { useEffect } from 'react'
import { useProduct } from '@/app/hooks/useProduct'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'

export default function ProductList() {
  const { loading, error, getAllProducts, products } = useProduct();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  if (loading) return <div className="text-center p-4 text-white">Loading Products...</div>;
  if (error) return <div className="text-center p-4 text-red-400">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 text-white">
      <div className='space-y-4'>
        <h2 className='text-2xl font-bold mb-4'>Products</h2>
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-900">
                <TableHead className="font-semibold text-gray-200">Product Name</TableHead>
                <TableHead className="font-semibold text-gray-200">Price</TableHead>
                <TableHead className="font-semibold text-gray-200">Quantity</TableHead>
                <TableHead className="font-semibold text-gray-200">Category</TableHead>
                <TableHead className="font-semibold text-gray-200">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="border-b border-gray-700">
                  <TableCell className="text-white font-semibold">{product.name}</TableCell>
                  <TableCell className="text-gray-300 font-bold">Rs.{product.price}</TableCell>
                  <TableCell className="text-gray-300 font-semibold text-base">{product.quantity}</TableCell>
                  <TableCell className="text-gray-300">{product.categoryId}</TableCell>
                  <TableCell>
                    <div className='flex space-x-2'>
                      <Button variant="outline" size="icon" className="text-black hover:bg-gray-400 border-none hover:text-white">
                        <Pencil className='h-4 w-4' />
                      </Button>
                      <Button variant="outline" size="icon" className="bg-red-700 border-none   hover:bg-red-400 hover:text-white">
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}