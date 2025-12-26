"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { supabase } from '@/lib/supabase';
import { CheckCircle2, ShoppingBag, ArrowLeft, Phone, MessageCircle, Banknote } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Verification comment to trigger rebuild
const WHATSAPP_NUMBER = '+447448071922';

function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'whatsapp'>('cod');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = (orderId: string, method: string) => {
    const itemsList = cart.map(item => 
      `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const methodDisplay = method === 'cod' ? 'Cash on Delivery' : 'WhatsApp Order';
    
    const message = `🛍️ *New Order from LUXE MARKET*

*Order ID:* ${orderId}

*Customer Details:*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

*Shipping Address:*
${formData.address}

*Order Items:*
${itemsList}

*Total Amount:* $${cartTotal.toFixed(2)}

*Payment Method:* ${methodDisplay}

Please confirm this order. Thank you! 🙏`;

    return encodeURIComponent(message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);

    try {
      const paymentMethodValue = paymentMethod === 'cod' ? 'cash_on_delivery' : 'whatsapp';
      
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          shipping_address: formData.address,
          total_amount: cartTotal,
          payment_method: paymentMethodValue,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = cart.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Send automatic WhatsApp notification to store owner
      const notifyResponse = await fetch('/api/notify-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          address: formData.address,
          items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          total: cartTotal,
          paymentMethod: paymentMethodValue
        })
      });

      const notifyResult = await notifyResponse.json();

      // If automatic notification failed or not configured, open WhatsApp for customer to send
      if (notifyResult.method === 'manual' || notifyResult.fallback) {
        const whatsappMessage = generateWhatsAppMessage(order.id, paymentMethod);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;
        window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: whatsappUrl } }, "*");
      }

      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-black selection:text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            style={{ perspective: 1000 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-12 flex justify-center">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex h-32 w-32 items-center justify-center rounded-[3rem] bg-black text-white shadow-2xl"
              >
                <CheckCircle2 className="h-16 w-16" />
              </motion.div>
            </div>
            <h1 className="mb-6 text-6xl font-black tracking-tighter uppercase">Order Secured</h1>
            <p className="mb-12 text-lg text-zinc-500 font-medium">
              Your luxury pieces are being prepared. Excellence takes time, but your wait is almost over.
            </p>
            
            <motion.div 
              whileHover={{ rotateY: 5, rotateX: -5 }}
              style={{ perspective: 1000 }}
            >
              <Card className="mb-12 overflow-hidden rounded-[3rem] border-none bg-white p-1 shadow-2xl dark:bg-zinc-900">
                <CardContent className="p-12">
                  <div className="flex items-center justify-center gap-4 text-2xl font-black uppercase tracking-tighter">
                    <MessageCircle className="h-8 w-8 text-green-500" />
                    <span>WhatsApp Concierge Notified</span>
                  </div>
                  <p className="mt-6 text-zinc-500 font-medium leading-relaxed">
                    A dedicated concierge has been assigned to your order. We've sent a detailed manifest to our verification center.
                  </p>
                  {paymentMethod === 'cod' && (
                    <div className="mt-8 rounded-2xl bg-zinc-50 p-6 dark:bg-black/50 border border-zinc-100 dark:border-zinc-800">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 italic">
                        Protocol: Our logistics team will initiate final address verification via WhatsApp shortly.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <Link href="/">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="h-20 rounded-3xl bg-black px-12 text-[10px] font-black uppercase tracking-[0.4em] text-white shadow-2xl">
                  Return to Market
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-black selection:text-white">
      <Navbar />
      <main className="container mx-auto px-6 py-16">
        <div className="mb-16">
          <Link href="/" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-black dark:hover:text-white transition-all">
            <ArrowLeft className="h-4 w-4" /> Back to Collection
          </Link>
          <h1 className="mt-8 text-6xl font-black tracking-tighter uppercase">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-16">
              <section className="space-y-10">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white text-[10px] font-black">01</span>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Personal Details</h3>
                </div>
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      required 
                      placeholder="e.g. Alexander McQueen" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="h-16 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-black dark:bg-zinc-900 transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      required 
                      placeholder="alexander@luxury.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-16 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-black dark:bg-zinc-900 transition-all"
                    />
                  </div>
                  <div className="space-y-3 sm:col-span-2">
                    <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      required 
                      placeholder="+44 000 000 0000" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="h-16 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-black dark:bg-zinc-900 transition-all"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-10">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white text-[10px] font-black">02</span>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Delivery Address</h3>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="address" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Shipping Destination</Label>
                  <Textarea 
                    id="address" 
                    name="address" 
                    required 
                    placeholder="Penthouse 42, 5th Avenue, New York City" 
                    value={formData.address}
                    onChange={handleInputChange}
                    className="min-h-[160px] rounded-3xl border-none bg-white shadow-sm focus:ring-2 focus:ring-black dark:bg-zinc-900 transition-all p-6"
                  />
                </div>
              </section>

              <section className="space-y-10">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white text-[10px] font-black">03</span>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Payment Selection</h3>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`group relative overflow-hidden rounded-[2.5rem] border-none p-10 text-left transition-all shadow-xl ${
                      paymentMethod === 'cod' 
                        ? 'bg-black text-white' 
                        : 'bg-white hover:bg-zinc-50 dark:bg-zinc-900'
                    }`}
                  >
                    <div className="relative z-10 flex flex-col gap-6">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                        paymentMethod === 'cod' ? 'bg-white/20' : 'bg-zinc-100 dark:bg-zinc-800'
                      }`}>
                        <Banknote className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="text-xl font-black uppercase tracking-tighter">Cash on Delivery</p>
                        <p className={`mt-2 text-xs font-medium ${paymentMethod === 'cod' ? 'text-white/60' : 'text-zinc-400'}`}>
                          Premium white-glove delivery service.
                        </p>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setPaymentMethod('whatsapp')}
                    className={`group relative overflow-hidden rounded-[2.5rem] border-none p-10 text-left transition-all shadow-xl ${
                      paymentMethod === 'whatsapp' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-white hover:bg-zinc-50 dark:bg-zinc-900'
                    }`}
                  >
                    <div className="relative z-10 flex flex-col gap-6">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                        paymentMethod === 'whatsapp' ? 'bg-white/20' : 'bg-zinc-100 dark:bg-zinc-800'
                      }`}>
                        <MessageCircle className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="text-xl font-black uppercase tracking-tighter">WhatsApp Direct</p>
                        <p className={`mt-2 text-xs font-medium ${paymentMethod === 'whatsapp' ? 'text-white/60' : 'text-zinc-400'}`}>
                          Instant concierge order processing.
                        </p>
                      </div>
                    </div>
                  </motion.button>
                </div>
              </section>

              <motion.div whileHover={{ scale: 1.01 }}>
                <Button 
                  type="submit" 
                  className={`h-24 w-full rounded-[2.5rem] text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl transition-all ${
                    paymentMethod === 'whatsapp' 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-black hover:bg-zinc-800 text-white'
                  }`}
                  disabled={loading || cart.length === 0}
                >
                  {loading ? 'Validating...' : 'Confirm Luxury Purchase'}
                </Button>
              </motion.div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <motion.div 
              style={{ perspective: 1000 }}
              initial={{ rotateY: 5 }}
              animate={{ rotateY: 0 }}
              className="sticky top-32"
            >
              <Card className="overflow-hidden rounded-[3rem] border-none bg-white shadow-[0_50px_100px_rgba(0,0,0,0.1)] dark:bg-zinc-900">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black uppercase tracking-tighter">Your Manifest</CardTitle>
                </CardHeader>
                <CardContent className="p-10 space-y-10">
                  <ScrollArea className="max-h-[400px]">
                    <div className="space-y-8">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between gap-6">
                          <div className="flex gap-4">
                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl shadow-md">
                              <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="flex flex-col justify-center">
                              <p className="text-[10px] font-black uppercase tracking-tighter leading-tight">{item.name}</p>
                              <p className="mt-1 text-[10px] font-black text-zinc-400">QTY: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="flex items-center text-sm font-black">$ {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <Separator className="bg-zinc-100 dark:bg-zinc-800" />
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                      <span>Subtotal</span>
                      <span>$ {cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                      <span>Logistics</span>
                      <span className="text-green-500">Complimentary</span>
                    </div>
                    <Separator className="my-6 bg-zinc-100 dark:bg-zinc-800" />
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Total Investment</span>
                      <span className="text-4xl font-black tracking-tighter">$ {cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-6 bg-zinc-50 p-10 dark:bg-black/50">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                    <ShieldCheck className="h-5 w-5" />
                    Encrypted Transaction
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
