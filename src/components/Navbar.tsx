"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, Search, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function Navbar() {
  const { cartCount, openDrawer } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-zinc-950/50 backdrop-blur-2xl border-b border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
      <div className="container mx-auto flex h-24 items-center justify-between px-6">
        {/* Left Side: Mobile Menu & Search */}
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
            <Menu className="h-6 w-6" />
          </Button>
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
            <Button variant="ghost" size="icon" className="hidden md:flex bg-white/5 hover:bg-white/10 rounded-full h-12 w-12 border border-white/10 text-white">
              <Search className="h-5 w-5" />
            </Button>
          </motion.div>
          <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            <Link href="#" className="hover:text-white transition-all hover:tracking-[0.3em]">Discover</Link>
            <Link href="#" className="hover:text-white transition-all hover:tracking-[0.3em]">Shop</Link>
          </div>
        </div>

        {/* Center: Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <motion.div 
            whileHover={{ scale: 1.05, letterSpacing: "0.2em" }}
            className="text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            LUXE MARKET
          </motion.div>
        </Link>

        {/* Right Side: Account & Cart */}
        <div className="flex items-center gap-3 md:gap-6">
          <motion.div whileHover={{ scale: 1.1, rotate: -5 }}>
            <Button variant="ghost" size="icon" className="hidden md:flex bg-white/5 hover:bg-white/10 rounded-full h-12 w-12 border border-white/10 text-white">
              <User className="h-5 w-5" />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ y: -2 }}>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={openDrawer}
              className="relative h-14 w-14 rounded-2xl bg-white text-black hover:bg-zinc-200 shadow-[0_10px_30px_rgba(255,255,255,0.2)] transition-transform active:scale-95"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-black border-2 border-zinc-950 shadow-lg"
                >
                  {cartCount}
                </motion.span>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
