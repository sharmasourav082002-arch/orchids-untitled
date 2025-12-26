"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Plus, Eye } from 'lucide-react';
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
      className="group relative flex flex-col"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Quick Action Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/5">
          <Button 
            size="icon"
            className="h-10 w-10 rounded-full bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 shadow-xl"
            onClick={() => addToCart(product)}
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Button 
            size="icon"
            className="h-10 w-10 rounded-full bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 shadow-xl"
          >
            <Eye className="h-5 w-5" />
          </Button>
        </div>

        {/* Badge if needed */}
        {product.price > 100 && (
          <div className="absolute left-4 top-4 bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
            Premium
          </div>
        )}
      </div>

      <div className="flex flex-col pt-4 text-center">
        <h3 className="text-sm font-medium uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
          {product.name}
        </h3>
        <p className="mt-1 text-sm font-bold text-zinc-500">${product.price.toFixed(2)}</p>
        
        {/* Mock Color Swatches */}
        <div className="mt-3 flex justify-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-800 border border-zinc-200" />
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-400 border border-zinc-200" />
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-200 border border-zinc-200" />
        </div>
      </div>
    </motion.div>
  );
}
