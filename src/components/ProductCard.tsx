"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col overflow-hidden rounded-xl border bg-white dark:bg-zinc-900"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center p-4 transition-transform duration-300 group-hover:translate-y-0">
          <Button 
            className="w-full gap-2 rounded-full shadow-lg"
            onClick={() => addToCart(product)}
          >
            <Plus className="h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            {product.category}
          </span>
          <p className="font-bold text-black dark:text-white">${product.price}</p>
        </div>
        <h3 className="mb-1 text-lg font-semibold leading-tight">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-zinc-500">{product.description}</p>
      </div>
    </motion.div>
  );
}
