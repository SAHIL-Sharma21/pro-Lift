"use client";

import { CartItem as CartType } from "@/app/types/cart.types";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

interface CartItemProps {
  item: CartType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <motion.div
      className="flex justify-between items-center py-4 border-b last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-4">
        <Image
          src={item.product.image}
          alt={item.product.name}
          className="w-16 h-16 object-cover rounded-md"
          width={64}
          height={64}
        />
        <div>
          <h3 className="font-semibold">{item.product.name}</h3>
          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">Rs: {item.product.price * item.quantity}</p>
        <p className="text-sm text-gray-500">Rs: {item.product.price} each</p>
      </div>
    </motion.div>
  );
};

export default CartItem;
