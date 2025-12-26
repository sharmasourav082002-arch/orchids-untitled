"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Trash2, Plus, Minus } from 'lucide-react';
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
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const { cartCount, cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-black/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          AURA
        </Link>

        <div className="flex items-center gap-4">
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
              <SheetHeader>
                <SheetTitle className="text-xl font-bold">Shopping Cart</SheetTitle>
              </SheetHeader>
              <Separator className="my-4" />
              
              <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  {cart.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex h-full flex-col items-center justify-center gap-2 text-zinc-500"
                    >
                      <ShoppingBag className="h-12 w-12 opacity-20" />
                      <p>Your cart is empty</p>
                    </motion.div>
                  ) : (
                    <ScrollArea className="h-full pr-4">
                      <div className="flex flex-col gap-6">
                        {cart.map((item) => (
                          <motion.div 
                            key={item.id}
                            layout
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex gap-4"
                          >
                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border">
                              <img 
                                src={item.image_url} 
                                alt={item.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex flex-1 flex-col justify-between">
                              <div className="flex justify-between gap-2">
                                <h3 className="font-medium leading-tight">{item.name}</h3>
                                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 rounded-md border p-1">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-6 w-6"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-4 text-center text-sm">{item.quantity}</span>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-6 w-6"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
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
                <>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <Link href="/checkout" className="block w-full">
                      <Button className="w-full py-6 text-lg font-semibold uppercase tracking-widest">
                        Checkout
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
