"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { SafeImage } from '@/components/SafeImage';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  image_url: string;
  category?: string;
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const discount = product.original_price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100) 
    : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        rotateY: 15, 
        rotateX: -5,
        scale: 1.05,
        z: 50,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      viewport={{ once: true }}
      style={{ perspective: 1500, transformStyle: "preserve-3d" }}
      className="group relative flex flex-col transition-all duration-500 hover:shadow-[0_40px_80px_rgba(255,255,255,0.1)] rounded-3xl p-5 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 hover:border-zinc-700"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-800">
        <SafeImage 
          src={product.image_url} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Quick Action Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-all duration-500 group-hover:opacity-100 bg-black/40 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0, y: 20 }}
            whileInView={{ scale: 1, y: 0 }}
            whileHover={{ scale: 1.2, y: -5 }}
          >
            <Button 
              size="icon"
              className="h-14 w-14 rounded-full bg-white text-black hover:bg-amber-400 hover:text-black transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              onClick={() => addToCart(product)}
            >
              <Plus className="h-6 w-6" />
            </Button>
          </motion.div>
          <motion.div 
            initial={{ scale: 0, y: 20 }}
            whileInView={{ scale: 1, y: 0 }}
            whileHover={{ scale: 1.2, y: -5 }}
            transition={{ delay: 0.1 }}
          >
            <Button 
              size="icon"
              className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-xl text-white hover:bg-white hover:text-black transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/30"
            >
              <Eye className="h-6 w-6" />
            </Button>
          </motion.div>
        </div>

        {/* Premium & Discount Badges */}
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {product.price > 500 && (
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 backdrop-blur-md px-4 py-2 text-[9px] font-black uppercase tracking-widest text-black rounded-full shadow-lg"
            >
              <Sparkles className="h-3 w-3" />
              Premium
            </motion.div>
          )}
          {discount > 0 && (
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 bg-white backdrop-blur-md px-4 py-2 text-[9px] font-black uppercase tracking-widest text-black rounded-full shadow-lg border border-white/50"
            >
              {discount}% OFF
            </motion.div>
          )}
        </div>

        {/* 3D Floating Element */}
        <motion.div 
          animate={{ y: [0, -10, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-4 right-4 h-3 w-3 bg-white/30 rounded-full blur-[1px]"
        />
      </div>

      <div className="flex flex-col pt-6 text-center">
        <h3 className="text-sm font-black uppercase tracking-widest text-white group-hover:text-amber-400 transition-colors">
          {product.name}
        </h3>
        <div className="mt-3 flex items-center justify-center gap-3">
          <motion.p 
            className="text-xl font-black text-white"
            whileHover={{ scale: 1.1 }}
          >
            ₹{Number(product.price).toLocaleString('en-IN')}
          </motion.p>
          {product.original_price && (
            <p className="text-sm font-medium text-zinc-500 line-through">
              ₹{Number(product.original_price).toLocaleString('en-IN')}
            </p>
          )}
        </div>
        
        {/* Color Swatches with 3D Effect */}
        <div className="mt-5 flex justify-center gap-3">
          {[
            'bg-gradient-to-br from-zinc-700 to-zinc-900', 
            'bg-gradient-to-br from-zinc-500 to-zinc-700', 
            'bg-gradient-to-br from-zinc-300 to-zinc-500'
          ].map((color, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.8, y: -5, boxShadow: "0 10px 20px rgba(255,255,255,0.2)" }}
              className={`h-4 w-4 rounded-full ${color} border-2 border-zinc-700 shadow-lg cursor-pointer`} 
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
