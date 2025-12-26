"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Trash2, Plus, Minus, Search, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const { cartCount, openDrawer } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-xl dark:bg-black/70 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-500">
      <div className="container mx-auto flex h-24 items-center justify-between px-6">
        {/* Left Side: Mobile Menu & Search */}
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
            <Button variant="ghost" size="icon" className="hidden md:flex bg-zinc-50 dark:bg-zinc-900 rounded-full h-12 w-12 shadow-inner">
              <Search className="h-5 w-5" />
            </Button>
          </motion.div>
          <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
            <Link href="#" className="hover:text-black dark:hover:text-white transition-all hover:tracking-[0.3em]">Discover</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-all hover:tracking-[0.3em]">Shop</Link>
          </div>
        </div>

        {/* Center: Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <motion.div 
            whileHover={{ scale: 1.05, letterSpacing: "0.2em" }}
            className="text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-black via-zinc-500 to-black dark:from-white dark:via-zinc-400 dark:to-white drop-shadow-2xl"
          >
            LUXE MARKET
          </motion.div>
        </Link>

        {/* Right Side: Account & Cart */}
        <div className="flex items-center gap-3 md:gap-6">
          <motion.div whileHover={{ scale: 1.1, rotate: -5 }}>
            <Button variant="ghost" size="icon" className="hidden md:flex bg-zinc-50 dark:bg-zinc-900 rounded-full h-12 w-12 shadow-inner">
              <User className="h-5 w-5" />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ y: -2 }}>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={openDrawer}
              className="relative h-14 w-14 rounded-2xl bg-black text-white dark:bg-white dark:text-black shadow-[0_10px_20px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_20px_rgba(255,255,255,0.1)] transition-transform active:scale-95"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white border-4 border-white dark:border-black shadow-lg">
                  {cartCount}
                </span>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
