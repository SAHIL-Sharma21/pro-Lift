'use client'

import React from 'react'
import Image from 'next/image'
import {Product} from '@/app/types/products.types'
import { useDispatch } from 'react-redux'


interface ProductCardProps {
    product: Product
}

const ProductCard = ({product}: ProductCardProps) => {

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        //logic here for add to cart with redux
    }

  return (
   <>
    <div className='bg-gray-800 shadow-md rounded-lg overflow-hidden'>
        <Image 
        src={product.image}
        alt={product.name}
        width={300}
        height={300}
        className='w-full h-48 object-cover'
        />
        <div className='p-4'>
            <h2 className='font-bold text-xl mb-2'>{product.name}</h2>
            <p className='text-gray-700 text-base mb-4"'>{product.description}</p>
            <div className='flex justify-between items-center'>
                <span className='text-lg font-bold'>Rs: {product.price}</span>
                <button
                onClick={handleAddToCart}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                disabled={product.quantity === 0}
                >{product.quantity > 0 ? "Add To Cart" : "Out of stock"}</button>
            </div>
        </div>
    </div>
   </>
  )
}

export default ProductCard