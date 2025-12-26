"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageSquare, Truck, Lock, Sparkles } from 'lucide-react';
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
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-xl"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[101] h-full w-full max-w-md bg-zinc-950 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col border-l border-zinc-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-6">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="h-5 w-5 text-amber-400" />
                </motion.div>
                <h2 className="text-xl font-black uppercase tracking-tighter text-white">Your Cart ({cartCount})</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeDrawer}
                className="rounded-full p-3 bg-zinc-900 hover:bg-zinc-800 transition-colors border border-zinc-800"
              >
                <X className="h-5 w-5 text-white" />
              </motion.button>
            </div>

            {/* Free Shipping Bar */}
            <div className="px-6 py-5 border-b border-zinc-800 bg-zinc-900/50">
              <p className="text-xs font-black uppercase tracking-widest mb-4 text-zinc-400">
                {remaining > 0 
                  ? `Need £${remaining.toFixed(2)} GBP for free shipping` 
                  : "You've unlocked free shipping!"}
              </p>
              <div className="relative h-3 w-full bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`absolute top-0 left-0 h-full transition-all duration-500 ${progress >= 100 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-amber-400 to-amber-500'} shadow-[0_0_20px_rgba(251,191,36,0.5)]`}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[10px] font-black text-zinc-600">£0</span>
                <span className="text-[10px] font-black text-zinc-400">£{FREE_SHIPPING_THRESHOLD}</span>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="p-6 bg-zinc-900 rounded-3xl border border-zinc-800"
                  >
                    <ShoppingBag className="h-16 w-16 text-zinc-700" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest text-white mb-2">Your cart is empty</p>
                    <p className="text-xs text-zinc-600">Add some luxury items to your cart</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={closeDrawer} 
                    className="rounded-full uppercase text-[10px] tracking-widest font-black border-zinc-700 text-white hover:bg-white hover:text-black px-8 py-6"
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : (
                cart.map((item, index) => (
                  <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 group p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all"
                  >
                    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-zinc-800">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item.id)}
                        className="absolute bottom-2 left-2 bg-red-500/90 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <Trash2 className="h-3 w-3" />
                      </motion.button>
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-black uppercase tracking-tighter text-white">{item.name}</h3>
                          <p className="text-sm font-black text-amber-400">£{item.price.toFixed(2)}</p>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-2">Size: XS • Color: Blue</p>
                      </div>
                      <div className="flex items-center justify-end">
                        <div className="flex items-center gap-4 bg-zinc-800 px-4 py-2 rounded-full border border-zinc-700">
                          <motion.button 
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-zinc-400 hover:text-white"
                          >
                            <Minus className="h-4 w-4" />
                          </motion.button>
                          <span className="text-sm font-black w-6 text-center text-white">{item.quantity}</span>
                          <motion.button 
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-zinc-400 hover:text-white"
                          >
                            <Plus className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-zinc-800 px-6 py-8 space-y-6 bg-zinc-900/50">
              <div className="grid grid-cols-2 gap-4">
                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center justify-center gap-2 p-4 bg-zinc-800 border border-zinc-700 rounded-xl hover:bg-zinc-700 transition-colors"
                >
                  <MessageSquare className="h-4 w-4 text-white" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Note</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center justify-center gap-2 p-4 bg-zinc-800 border border-zinc-700 rounded-xl hover:bg-zinc-700 transition-colors"
                >
                  <Truck className="h-4 w-4 text-white" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Shipping</span>
                </motion.button>
              </div>

              <div className="flex items-end justify-between py-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Total:</p>
                </div>
                <div className="text-right">
                  <motion.p 
                    key={cartTotal}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-black text-white"
                  >
                    £{cartTotal.toFixed(2)} <span className="text-sm text-zinc-500">GBP</span>
                  </motion.p>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-zinc-600 mt-1">
                    Taxes, discounts and shipping calculated at checkout
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  asChild 
                  className="h-14 rounded-xl border-zinc-700 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black"
                >
                  <Link href="/cart">View cart</Link>
                </Button>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button 
                    asChild 
                    onClick={closeDrawer} 
                    className="h-14 w-full rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:from-amber-500 hover:to-amber-600 text-[10px] font-black uppercase tracking-widest gap-2 shadow-[0_10px_30px_rgba(251,191,36,0.3)]"
                  >
                    <Link href="/checkout">
                      <Lock className="h-4 w-4" />
                      Check out
                    </Link>
                  </Button>
                </motion.div>
              </div>

              <button 
                onClick={closeDrawer}
                className="w-full text-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors underline underline-offset-4"
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
