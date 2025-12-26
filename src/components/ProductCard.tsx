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
      whileHover={{ 
        rotateY: 15, 
        rotateX: -5,
        scale: 1.02,
        z: 50,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      viewport={{ once: true }}
      style={{ perspective: 1000 }}
      className="group relative flex flex-col transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)] rounded-2xl p-4 bg-white dark:bg-zinc-900"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-zinc-100">
        <motion.img 
          src={product.image_url} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ transformStyle: "preserve-3d" }}
        />
        
        {/* Quick Action Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/10 backdrop-blur-[2px]">
          <motion.div whileHover={{ scale: 1.1, z: 20 }}>
            <Button 
              size="icon"
              className="h-12 w-12 rounded-full bg-white text-black hover:bg-black hover:text-white transition-all duration-300 shadow-2xl"
              onClick={() => addToCart(product)}
            >
              <Plus className="h-6 w-6" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, z: 20 }}>
            <Button 
              size="icon"
              className="h-12 w-12 rounded-full bg-white text-black hover:bg-black hover:text-white transition-all duration-300 shadow-2xl"
            >
              <Eye className="h-6 w-6" />
            </Button>
          </motion.div>
        </div>

        {/* Badge */}
        {product.price > 100 && (
          <div className="absolute left-4 top-4 bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white rounded-full">
            Premium
          </div>
        )}
      </div>

      <div className="flex flex-col pt-5 text-center">
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
          {product.name}
        </h3>
        <p className="mt-2 text-lg font-black text-zinc-900 dark:text-white">${product.price.toFixed(2)}</p>
        
        {/* Mock Color Swatches */}
        <div className="mt-4 flex justify-center gap-2">
          {['bg-zinc-800', 'bg-zinc-400', 'bg-zinc-200'].map((color, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.5, z: 10 }}
              className={`h-3 w-3 rounded-full ${color} border border-white dark:border-zinc-700 shadow-sm`} 
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
