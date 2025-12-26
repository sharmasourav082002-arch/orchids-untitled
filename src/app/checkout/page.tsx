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
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/lib/supabase';
import { CheckCircle2, ShoppingBag, ArrowLeft, Phone, MessageCircle, Banknote } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_NUMBER = '+447448071922';

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

  const generateWhatsAppMessage = (orderId: string) => {
    const itemsList = cart.map(item => 
      `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const message = `🛍️ *New Order from AURA*

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

*Payment Method:* WhatsApp Order

Please confirm this order. Thank you! 🙏`;

    return encodeURIComponent(message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);

    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          shipping_address: formData.address,
          total_amount: cartTotal,
          payment_method: paymentMethod === 'cod' ? 'cash_on_delivery' : 'whatsapp',
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

      if (paymentMethod === 'whatsapp') {
        const whatsappMessage = generateWhatsAppMessage(order.id);
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
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        <Navbar />
        <main className="container mx-auto px-4 py-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-8 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-500">
                <CheckCircle2 className="h-12 w-12" />
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight">Order Placed Successfully!</h1>
            <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
              Thank you for your order. We've received your request and will process it shortly.
            </p>
            
              <Card className="mb-8 border-dashed bg-zinc-100/50 dark:bg-zinc-900/50">
                <CardContent className="p-8">
                  {paymentMethod === 'whatsapp' ? (
                    <>
                      <div className="flex items-center justify-center gap-3 text-xl font-bold text-green-600">
                        <MessageCircle className="h-6 w-6" />
                        <span>WhatsApp Order Sent</span>
                      </div>
                      <p className="mt-4 text-sm text-zinc-500">
                        A WhatsApp message with your order details has been prepared. Complete the order by sending the message to confirm your purchase.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-center gap-3 text-xl font-bold">
                        <Phone className="h-6 w-6 text-zinc-500" />
                        <span>{WHATSAPP_NUMBER}</span>
                      </div>
                      <p className="mt-4 text-sm text-zinc-500">
                        Our team will contact you at this number to confirm your <strong>Cash on Delivery</strong> order. 
                        Please keep your phone active.
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

            <Link href="/">
              <Button size="lg" className="rounded-full px-8">
                Return to Shop
              </Button>
            </Link>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-black dark:hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Shopping
          </Link>
          <h1 className="mt-4 text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <section>
                <h3 className="mb-6 text-xl font-semibold">Contact Information</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      required 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      required 
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      required 
                      placeholder="+1 (555) 000-0000" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="h-12"
                    />
                  </div>
                </div>
              </section>

              <Separator />

              <section>
                <h3 className="mb-6 text-xl font-semibold">Shipping Address</h3>
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea 
                    id="address" 
                    name="address" 
                    required 
                    placeholder="123 Street, City, Country, ZIP" 
                    value={formData.address}
                    onChange={handleInputChange}
                    className="min-h-[120px]"
                  />
                </div>
              </section>

              <Separator />

                <section>
                  <h3 className="mb-6 text-xl font-semibold">Payment Method</h3>
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`w-full rounded-lg border-2 p-6 text-left transition-all ${
                        paymentMethod === 'cod' 
                          ? 'border-black dark:border-white bg-zinc-50 dark:bg-zinc-900' 
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                            paymentMethod === 'cod' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-zinc-100 dark:bg-zinc-800'
                          }`}>
                            <Banknote className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-bold uppercase tracking-wider">Cash on Delivery</p>
                            <p className="text-sm text-zinc-500">Pay when your order arrives at your doorstep</p>
                          </div>
                        </div>
                        <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                          paymentMethod === 'cod' ? 'border-black dark:border-white' : 'border-zinc-300'
                        }`}>
                          {paymentMethod === 'cod' && <div className="h-3 w-3 rounded-full bg-black dark:bg-white" />}
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('whatsapp')}
                      className={`w-full rounded-lg border-2 p-6 text-left transition-all ${
                        paymentMethod === 'whatsapp' 
                          ? 'border-green-500 bg-green-50 dark:bg-green-950/20' 
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                            paymentMethod === 'whatsapp' ? 'bg-green-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800'
                          }`}>
                            <MessageCircle className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-bold uppercase tracking-wider">Order via WhatsApp</p>
                            <p className="text-sm text-zinc-500">Chat with us directly to complete your order</p>
                          </div>
                        </div>
                        <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                          paymentMethod === 'whatsapp' ? 'border-green-500' : 'border-zinc-300'
                        }`}>
                          {paymentMethod === 'whatsapp' && <div className="h-3 w-3 rounded-full bg-green-500" />}
                        </div>
                      </div>
                    </button>
                  </div>
                </section>

                <Button 
                  type="submit" 
                  className={`w-full py-8 text-lg font-bold uppercase tracking-widest ${
                    paymentMethod === 'whatsapp' 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : ''
                  }`}
                  disabled={loading || cart.length === 0}
                >
                  {loading ? 'Processing...' : paymentMethod === 'whatsapp' ? 'Order via WhatsApp' : 'Place Order'}
                </Button>
              </form>
            </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ScrollArea className="max-h-[400px]">
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between gap-4">
                        <div className="flex gap-3">
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded border">
                            <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-medium leading-tight">{item.name}</p>
                            <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-zinc-500">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-zinc-500">
                    <span>Shipping</span>
                    <span>FREE</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4 bg-zinc-50 p-6 dark:bg-zinc-900">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <ShieldCheck className="h-4 w-4" />
                  Secure Checkout
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

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
