"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard, MessageSquare, Truck, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CartDrawer() {
  const { cart, isDrawerOpen, closeDrawer, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  const FREE_SHIPPING_THRESHOLD = 149.0;
  const progress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[101] h-full w-full max-w-md bg-white shadow-2xl dark:bg-zinc-950 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-6 dark:border-zinc-800">
              <h2 className="text-xl font-black uppercase tracking-tighter">Your cart({cartCount})</h2>
              <button
                onClick={closeDrawer}
                className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Free Shipping Bar */}
            <div className="px-6 py-4 border-b dark:border-zinc-800">
              <p className="text-xs font-bold uppercase tracking-widest mb-3 text-zinc-500">
                {remaining > 0 
                  ? `Need £${remaining.toFixed(2)} GBP for free shipping` 
                  : "You've unlocked free shipping!"}
              </p>
              <div className="relative h-2 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className={`absolute top-0 left-0 h-full transition-all duration-500 ${progress >= 100 ? 'bg-green-500' : 'bg-zinc-900 dark:bg-white'}`}
                />
                <div className="absolute top-0 right-0 h-full flex items-center pr-2">
                  <div className="bg-white dark:bg-black border dark:border-zinc-800 text-[8px] font-black px-1 rounded-sm shadow-sm">
                    {Math.round(progress)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <ShoppingBag className="h-12 w-12" />
                  <p className="text-xs font-black uppercase tracking-widest">Your cart is empty</p>
                  <Button variant="outline" onClick={closeDrawer} className="rounded-full uppercase text-[10px] tracking-widest font-black">
                    Start Shopping
                  </Button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="absolute bottom-1 left-1 bg-black/80 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-black uppercase tracking-tighter">{item.name}</h3>
                          <p className="text-sm font-black">£{item.price.toFixed(2)}</p>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Size: XS</p>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Color: Blue</p>
                      </div>
                      <div className="flex items-center justify-end">
                        <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900 px-3 py-1 rounded-full border dark:border-zinc-800">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-zinc-400 hover:text-black dark:hover:text-white"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-zinc-400 hover:text-black dark:hover:text-white"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t dark:border-zinc-800 px-6 py-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 p-4 border dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Note</span>
                </button>
                <button className="flex items-center justify-center gap-2 p-4 border dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                  <Truck className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Shipping</span>
                </button>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Total:</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black">£{cartTotal.toFixed(2)} GBP</p>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-zinc-400 mt-1">
                    Taxes, discounts and shipping calculated at checkout
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" asChild className="h-14 rounded-xl border-black dark:border-white text-[10px] font-black uppercase tracking-widest">
                  <Link href="/cart">View cart</Link>
                </Button>
                <Button asChild onClick={closeDrawer} className="h-14 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 text-[10px] font-black uppercase tracking-widest gap-2">
                  <Link href="/checkout">
                    <CreditCard className="h-4 w-4" />
                    Check out
                  </Link>
                </Button>
              </div>

              <button 
                onClick={closeDrawer}
                className="w-full text-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-black dark:hover:text-white transition-colors underline underline-offset-4"
              >
                Continue shopping
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
