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
  const { cartCount, cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const freeShippingThreshold = 149;
  const progress = Math.min((cartTotal / freeShippingThreshold) * 100, 100);
  const remaining = Math.max(freeShippingThreshold - cartTotal, 0);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md dark:bg-black/95">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Left Side: Mobile Menu & Search */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-zinc-500">
            <Link href="#" className="hover:text-black transition-colors">Discover</Link>
            <Link href="#" className="hover:text-black transition-colors">Shop</Link>
          </div>
        </div>

        {/* Center: Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-3xl font-serif tracking-tight">
          AURA
        </Link>

        {/* Right Side: Account & Cart */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="h-5 w-5" />
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white dark:bg-white dark:text-black">
                    {cartCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col sm:max-w-md">
              <SheetHeader className="border-b pb-4">
                <SheetTitle className="text-xl font-bold uppercase tracking-widest">Your Cart ({cartCount})</SheetTitle>
              </SheetHeader>
              
              {/* Free Shipping Progress */}
              <div className="py-6 px-1">
                <p className="mb-2 text-sm text-zinc-600">
                  {remaining > 0 
                    ? `Need $${remaining.toFixed(2)} more for free shipping` 
                    : "You've earned free shipping!"}
                </p>
                <Progress value={progress} className="h-1.5 bg-zinc-100" />
              </div>

              <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  {cart.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex h-full flex-col items-center justify-center gap-4 text-zinc-400"
                    >
                      <ShoppingBag className="h-16 w-16 stroke-[1]" />
                      <p className="text-sm font-medium">Your cart is empty</p>
                      <Link href="/#products">
                        <Button variant="outline" className="rounded-none uppercase tracking-widest px-8">
                          Continue Shopping
                        </Button>
                      </Link>
                    </motion.div>
                  ) : (
                    <ScrollArea className="h-full pr-4">
                      <div className="flex flex-col gap-8 pb-8">
                        {cart.map((item) => (
                          <motion.div 
                            key={item.id}
                            layout
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex gap-4"
                          >
                            <div className="h-24 w-20 shrink-0 overflow-hidden bg-zinc-100">
                              <img 
                                src={item.image_url} 
                                alt={item.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex flex-1 flex-col justify-between py-1">
                              <div>
                                <div className="flex justify-between gap-2">
                                  <h3 className="text-sm font-bold uppercase tracking-tight">{item.name}</h3>
                                  <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                                <p className="text-xs text-zinc-500 mt-1">Standard Size</p>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 border px-2 py-1">
                                  <button 
                                    className="p-1 hover:text-zinc-400"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="w-4 text-center text-xs font-bold">{item.quantity}</span>
                                  <button 
                                    className="p-1 hover:text-zinc-400"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                                <button 
                                  className="text-xs font-medium text-zinc-400 underline hover:text-black"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </AnimatePresence>
              </div>

              {cart.length > 0 && (
                <div className="border-t pt-6 space-y-4">
                  <div className="flex justify-between text-base font-bold uppercase tracking-widest">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 text-center uppercase tracking-widest">
                    Taxes, discounts and shipping calculated at checkout
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="rounded-none uppercase tracking-widest text-xs h-12">
                      View Cart
                    </Button>
                    <Link href="/checkout">
                      <Button className="w-full rounded-none uppercase tracking-widest text-xs h-12 bg-black text-white hover:bg-zinc-800">
                        Check Out
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
