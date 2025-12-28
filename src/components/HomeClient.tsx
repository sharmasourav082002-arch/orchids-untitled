"use client";

import Link from 'next/link';
import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Headphones, 
  RotateCcw, 
  ShieldCheck, 
  ArrowRight, 
  Plus, 
  Minus, 
  Star,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { CartDrawer } from '@/components/CartDrawer';
import { useCart } from '@/context/CartContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SafeImage } from '@/components/SafeImage';

const HeroScene = lazy(() => import('@/components/Scene3D').then(mod => ({ default: mod.HeroScene })));
const ProductScene = lazy(() => import('@/components/Scene3D').then(mod => ({ default: mod.ProductScene })));
const BackgroundScene = lazy(() => import('@/components/Scene3D').then(mod => ({ default: mod.BackgroundScene })));

interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  description: string;
  image_url: string;
}

interface HomeClientProps {
  products: Product[];
}

export default function HomeClient({ products }: HomeClientProps) {
  const { addToCart } = useCart();
  const [isMounted, setIsMounted] = React.useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    console.log('HomeClient mounted with', products.length, 'products');
  }, [products]);
  
  const featuredProduct = products[0] || {
    id: "featured-1",
    name: "Light Jumpsuit",
    price: 899,
    original_price: 1199,
    description: "Ethically made from luxurious materials and delicate knits. Designed for the adventurous yet elegant woman who appreciates the finer things in life.",
    image_url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-white selection:text-black overflow-x-hidden">
      <ErrorBoundary fallback={null}>
        {isMounted && (
          <Suspense fallback={null}>
            <BackgroundScene />
          </Suspense>
        )}
      </ErrorBoundary>
      
      <Navbar />
      <CartDrawer />
      
      {/* Hero Section with 3D */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <ErrorBoundary fallback={<div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />}>
          {isMounted && (
            <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />}>
              <HeroScene />
            </Suspense>
          )}
        </ErrorBoundary>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-transparent to-zinc-950" />
        </motion.div>

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-8 flex items-center justify-center gap-3"
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">Immersive 3D Experience • Est. 2024</span>
              <Sparkles className="h-4 w-4 text-amber-400" />
            </motion.div>
            
            <h1 className="mb-8 text-8xl font-black tracking-tighter sm:text-[12rem] text-white leading-none">
              <motion.span 
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="block bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent drop-shadow-[0_0_100px_rgba(255,255,255,0.3)]"
              >
                LUXE
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="block bg-gradient-to-r from-zinc-500 via-zinc-300 to-white bg-clip-text text-transparent drop-shadow-[0_0_100px_rgba(255,255,255,0.3)]"
              >
                MARKET
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mx-auto mb-16 max-w-xl text-lg text-zinc-500 font-medium tracking-wide"
            >
              Step into the future of luxury shopping. Experience fashion in an entirely new dimension.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <motion.div 
                whileHover={{ scale: 1.05, y: -10, boxShadow: "0 30px 60px rgba(255,255,255,0.2)" }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button className="rounded-full bg-white px-14 py-8 text-sm font-black uppercase tracking-widest text-black hover:bg-zinc-100 shadow-[0_20px_60px_rgba(255,255,255,0.3)] border-2 border-white/20">
                  <span className="mr-3">Explore 3D Shop</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, y: -10 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className="rounded-full border-zinc-700 backdrop-blur-xl px-14 py-8 text-sm font-black uppercase tracking-widest text-white hover:bg-white hover:text-black hover:border-white shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                  View Collections
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* 3D Floating Glass Cards */}
        <motion.div 
          animate={{ 
            y: [0, -30, 0], 
            rotateY: [0, 10, 0],
            rotateX: [0, 5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-16 h-40 w-40 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] hidden lg:flex items-center justify-center"
        >
          <div className="text-center">
            <div className="text-3xl font-black text-white">3D</div>
            <div className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Experience</div>
          </div>
        </motion.div>
        
        <motion.div 
          animate={{ 
            y: [0, 40, 0], 
            rotateY: [0, -15, 0],
            rotateX: [0, -8, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 left-16 h-56 w-56 rounded-[3rem] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] hidden lg:flex items-center justify-center"
        >
          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">∞</div>
            <div className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mt-2">Infinite Luxury</div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600">Scroll to Explore</span>
            <div className="h-12 w-6 rounded-full border border-zinc-700 flex items-start justify-center p-2">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-white"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Bar with 3D Depth */}
      <section className="relative z-20 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: <Truck className="h-6 w-6" />, title: "Free Shipping", desc: "Worldwide Delivery" },
              { icon: <Headphones className="h-6 w-6" />, title: "24/7 Concierge", desc: "Expert Assistance" },
              { icon: <RotateCcw className="h-6 w-6" />, title: "Seamless Returns", desc: "30-Day Guarantee" },
              { icon: <ShieldCheck className="h-6 w-6" />, title: "Insured Checkout", desc: "Secure Payments" },
            ].map((f, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 50, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                whileHover={{ 
                  y: -15, 
                  rotateY: 10, 
                  scale: 1.05,
                  boxShadow: "0 40px 80px rgba(255,255,255,0.1)"
                }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{ perspective: 1000, transformStyle: "preserve-3d" }}
                className="flex flex-col items-center text-center gap-4 p-8 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-2xl rounded-3xl border border-zinc-800 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              >
                <div className="p-5 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl shadow-inner text-white">{f.icon}</div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-white">{f.title}</h4>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Split Section */}
      <section className="py-32 overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
              <motion.div 
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ rotateY: -10, rotateX: 5, scale: 1.02 }}
                viewport={{ once: true }}
                style={{ perspective: 1500, transformStyle: "preserve-3d" }}
                className="relative aspect-[4/5] overflow-hidden rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] transition-all duration-700 group"
              >
                <SafeImage 
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop" 
                  alt="Dresses" 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-12 left-12 text-white">
                  <motion.h3 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="text-5xl font-black tracking-tighter mb-6"
                  >
                    DRESSES
                  </motion.h3>
                  <motion.div whileHover={{ scale: 1.05, x: 10 }}>
                    <Link href="#" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] bg-white text-black px-8 py-4 rounded-full hover:bg-zinc-200 transition-all shadow-2xl">
                      Shop Now <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                </div>
                
                {/* 3D Badge */}
                <motion.div 
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-12 right-12 h-20 w-20 rounded-full border-2 border-white/30 flex items-center justify-center"
                >
                  <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center">
                    <span className="text-[8px] font-black uppercase tracking-widest text-white">NEW</span>
                  </div>
                </motion.div>
              </motion.div>

            
            <div className="space-y-12 pl-0 lg:pl-12">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-6xl font-black tracking-tighter bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                  EXPLORE<br />CATEGORIES
                </h2>
                <p className="text-zinc-500 font-medium max-w-sm text-lg">Discover our curated selection of premium essentials designed for the modern silhouette.</p>
              </motion.div>
              <ul className="space-y-4">
                {['Dresses', 'Jumpsuits', 'Tops', 'Summer', 'Woman Dress'].map((cat, i) => (
                  <motion.li 
                    key={cat} 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Link href="#" className="flex items-center justify-between text-2xl font-black tracking-tighter uppercase p-6 rounded-2xl border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 backdrop-blur-sm">
                      <span className="group-hover:translate-x-4 transition-transform">{cat}</span>
                      <motion.div 
                        whileHover={{ rotate: 45, scale: 1.2 }}
                        className="h-14 w-14 flex items-center justify-center rounded-full bg-zinc-900 group-hover:bg-white group-hover:text-black transition-all border border-zinc-800 group-hover:border-white"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </motion.div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Collection Section with 3D Background */}
      <section className="relative py-40 rounded-[5rem] mx-4 my-24 border border-zinc-800 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
        
        <ErrorBoundary fallback={null}>
          {isMounted && (
            <Suspense fallback={null}>
              <ProductScene />
            </Suspense>
          )}
        </ErrorBoundary>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-24 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-7xl font-black tracking-tighter mb-8 uppercase bg-gradient-to-b from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
                The Collection
              </h2>
              <p className="text-zinc-600 font-black uppercase tracking-[0.5em] text-[10px]">Ethically made • Premium quality • Limited edition</p>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 50, rotateX: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Product Detail Section */}
      <section className="py-40 overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-24 lg:grid-cols-2 lg:items-center">
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ rotateY: 15, rotateX: -8, scale: 1.02 }}
              viewport={{ once: true }}
              style={{ perspective: 2000, transformStyle: "preserve-3d" }}
              className="relative aspect-square overflow-hidden rounded-[5rem] shadow-[0_60px_120px_rgba(0,0,0,0.6)] bg-gradient-to-br from-zinc-900 to-zinc-950 p-10 border border-zinc-800"
            >
              <img 
                src={featuredProduct.image_url} 
                alt={featuredProduct.name} 
                className="h-full w-full object-cover rounded-[4rem]"
              />
              
              {/* Floating 3D Decorations */}
              <motion.div 
                animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-20 left-20 h-4 w-4 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.5)]"
              />
              <motion.div 
                animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }}
                transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                className="absolute bottom-24 right-20 h-6 w-6 border-2 border-white rounded-full"
              />
              <motion.div 
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/2 right-16 h-3 w-3 bg-zinc-500 rounded-full"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Trusted by 5,000+ Clients</span>
                </div>
                  <h2 className="text-8xl font-black tracking-tighter uppercase bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">{featuredProduct.name}</h2>
                  <div className="flex items-center gap-6">
                    <p className="text-5xl font-black tracking-tighter text-white">₹{Number(featuredProduct.price).toLocaleString('en-IN')}</p>
                    {featuredProduct.original_price && (
                      <p className="text-2xl font-black text-zinc-500 line-through">₹{Number(featuredProduct.original_price).toLocaleString('en-IN')}</p>
                    )}
                  </div>
                  <p className="max-w-md text-zinc-400 font-medium leading-relaxed text-xl">

                  {featuredProduct.description}
                </p>
              </div>

              <div className="space-y-10">
                <div>
                  <h4 className="mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Select Variant</h4>
                  <div className="flex gap-4">
                    {['XS', 'S', 'M', 'L', 'XL'].map((size, i) => (
                      <motion.button 
                        key={size} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -8, scale: 1.1, boxShadow: "0 20px 40px rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.9 }}
                        viewport={{ once: true }}
                        className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-zinc-800 font-black text-sm hover:bg-white hover:text-black hover:border-white transition-all shadow-lg bg-zinc-900"
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-8 pt-6">
                  <div className="flex h-20 items-center gap-12 bg-zinc-900 rounded-3xl px-10 shadow-inner border border-zinc-800">
                    <button className="text-zinc-500 hover:text-white transition-colors"><Minus className="h-6 w-6" /></button>
                    <span className="w-6 text-center text-2xl font-black">1</span>
                    <button className="text-zinc-500 hover:text-white transition-colors"><Plus className="h-6 w-6" /></button>
                  </div>
                  <motion.div className="flex-1" whileHover={{ scale: 1.03, y: -5 }}>
                    <Button 
                      onClick={() => addToCart(featuredProduct)}
                      className="h-20 w-full rounded-3xl bg-white text-sm font-black uppercase tracking-[0.2em] text-black hover:bg-zinc-200 shadow-[0_30px_60px_rgba(255,255,255,0.2)] transition-all"
                    >
                      Add to Luxury Cart
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Joy Banner Section with 3D Parallax */}
      <section className="relative h-screen mx-4 rounded-[5rem] overflow-hidden group">
        <motion.img 
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 15 }}
          viewport={{ once: true }}
          src="https://images.unsplash.com/photo-1493655161922-ef98929de9d8?q=80&w=2070&auto=format&fit=crop" 
          alt="Banner" 
          className="h-full w-full object-cover grayscale brightness-30 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-50 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <motion.h2 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="text-9xl font-black text-white mb-12 uppercase tracking-tighter leading-none drop-shadow-[0_0_100px_rgba(255,255,255,0.3)]"
            >
              The Joy of<br />Pure Attire
            </motion.h2>
            <p className="text-white/50 max-w-lg mx-auto mb-16 uppercase tracking-[0.5em] text-[10px] font-black leading-loose">Ethically crafted in limited batches to ensure absolute perfection in every stitch.</p>
            <motion.div whileHover={{ scale: 1.05, y: -10 }}>
              <Button variant="outline" className="rounded-full border-white/30 backdrop-blur-xl text-white hover:bg-white hover:text-black px-16 py-10 text-[10px] font-black uppercase tracking-[0.4em] shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                Explore The Vault
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* 3D Floating Elements */}
        <motion.div 
          animate={{ y: [0, -40, 0], rotateZ: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-20 h-32 w-32 border border-white/20 rounded-3xl backdrop-blur-sm hidden lg:block"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], rotateZ: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-32 right-20 h-48 w-48 border border-white/10 rounded-full backdrop-blur-sm hidden lg:block"
        />
      </section>

      {/* Testimonials Section with 3D Perspective */}
      <section className="py-40">
        <div className="container mx-auto px-4">
          <div className="mb-24 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl font-black tracking-tighter mb-8 uppercase bg-gradient-to-r from-white to-zinc-600 bg-clip-text text-transparent"
            >
              Voices of Excellence
            </motion.h2>
            <div className="flex justify-center gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-6 w-6 fill-current" />)}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              { name: "Eliza Thompson", role: "Model", content: "Luxe Market has completely transformed my perspective on ethical luxury. The quality is simply unmatched." },
              { name: "Sophia Miller", role: "Designer", content: "As a designer, I'm blown away by their attention to detail. Every piece feels like a work of art." },
              { name: "James Wilson", role: "Stylist", content: "The customer journey is as premium as the products. Fast, elegant, and perfectly executed." }
            ].map((t, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 50, rotateX: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                whileHover={{ rotateY: i % 2 === 0 ? 10 : -10, y: -20, scale: 1.02 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                style={{ perspective: 1500, transformStyle: "preserve-3d" }}
                className="flex flex-col items-center text-center p-14 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.4)] border border-zinc-800 transition-all duration-500"
              >
                <div className="mb-10 p-5 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl text-5xl text-zinc-500">"</div>
                <p className="mb-12 font-medium text-zinc-400 italic leading-relaxed text-lg">"{t.content}"</p>
                <div className="h-px w-16 bg-zinc-800 mb-8" />
                <h4 className="text-sm font-black uppercase tracking-[0.3em] text-white">{t.name}</h4>
                <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.3em] mt-2">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white pt-40 pb-20 rounded-t-[6rem] border-t border-zinc-900">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 gap-20 md:grid-cols-4 lg:grid-cols-5">
            <div className="md:col-span-2 lg:col-span-2">
              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-12 text-7xl font-black tracking-tighter uppercase bg-gradient-to-r from-white to-zinc-600 bg-clip-text text-transparent"
              >
                LUXE MARKET
              </motion.h2>
              <p className="mb-12 max-w-xs text-zinc-600 text-sm font-medium leading-relaxed">
                Defining the modern silhouette with ethically sourced materials and timeless design. Est. 2024.
              </p>
              <div className="flex gap-8">
                {['Instagram', 'Pinterest', 'TikTok', 'Twitter'].map(s => (
                  <Link key={s} href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 hover:text-white transition-colors">{s}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-10 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Shop</h4>
              <ul className="space-y-6 text-[10px] font-black uppercase tracking-[0.3em]">
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">New Arrivals</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Bestsellers</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Accessories</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Collections</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-10 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Concierge</h4>
              <ul className="space-y-6 text-[10px] font-black uppercase tracking-[0.3em]">
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Shipping</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Returns</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-10 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Legacy</h4>
              <ul className="space-y-6 text-[10px] font-black uppercase tracking-[0.3em]">
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Sustainability</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="#" className="text-zinc-400 hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
            <div className="mt-40 border-t border-zinc-900 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700">
              <div>© 2024 LUXE MARKET LIFESTYLE. ALL RIGHTS RESERVED.</div>
              <div className="flex gap-10">
                <span className="cursor-pointer hover:text-white transition-colors">India</span>
                <span className="cursor-pointer hover:text-white transition-colors">INR ₹</span>
              </div>
            </div>

        </div>
      </footer>
    </div>
  );
}
