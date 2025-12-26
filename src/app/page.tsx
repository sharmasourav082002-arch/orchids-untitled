import { supabase } from '@/lib/supabase';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';
import React from 'react';
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
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data;
}

export default async function Home() {
  const products = await getProducts();
  const featuredProduct = products[0] || {
    name: "Light Jumpsuit",
    price: 84.00,
    description: "Ethically made from luxurious materials and delicate knits. Designed for the adventurous yet elegant woman who appreciates the finer things in life.",
    image_url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
  };

  return (
      <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-black selection:text-white dark:bg-black dark:text-white">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-0"
          >
            <motion.img 
              initial={{ scale: 1.2, rotate: -2 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                y: [0, -20, 0],
                transition: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
              alt="Hero" 
              className="h-full w-full object-cover object-center brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
          </motion.div>

          <div className="container relative z-10 px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ perspective: 2000 }}
            >
              <h2 className="mb-4 text-xs font-black uppercase tracking-[0.5em] text-white/80">Parisian Chic • Est. 2024</h2>
              <h1 className="mb-8 text-7xl font-black tracking-tighter sm:text-[10rem] text-white leading-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                LUXE<br />MARKET
              </h1>
              <p className="mx-auto mb-12 max-w-xl text-lg text-white/70 font-medium tracking-wide">
                Experience the pinnacle of ethical luxury. Our new collection defines the modern silhouette with premium, sustainable materials.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                  <Button className="rounded-2xl bg-white px-12 py-8 text-sm font-black uppercase tracking-widest text-black hover:bg-zinc-100 shadow-[0_20px_40px_rgba(255,255,255,0.2)]">
                    Explore Shop
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="rounded-2xl border-white/30 backdrop-blur-md px-12 py-8 text-sm font-black uppercase tracking-widest text-white hover:bg-white hover:text-black shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                    Collections
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Floating Elements for 3D Depth */}
          <motion.div 
            animate={{ 
              y: [0, -30, 0], 
              rotate: [0, 10, 0],
              transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-1/4 right-10 h-32 w-32 rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/10 hidden lg:block"
          />
          <motion.div 
            animate={{ 
              y: [0, 40, 0], 
              rotate: [0, -20, 0],
              transition: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
            className="absolute bottom-1/4 left-10 h-48 w-48 rounded-[3rem] bg-white/5 backdrop-blur-3xl border border-white/10 hidden lg:block"
          />
        </section>

        {/* Features Bar with Depth */}
        <section className="relative z-20 -mt-12 py-12">
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
                  whileHover={{ y: -10, rotateY: 10 }}
                  className="flex flex-col items-center text-center gap-4 p-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl rounded-3xl border border-white dark:border-zinc-800 shadow-xl"
                >
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl shadow-inner text-zinc-900 dark:text-white">{f.icon}</div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white">{f.title}</h4>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      {/* Category Split Section */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div 
              whileHover={{ rotateY: -10, rotateX: 5, scale: 1.05 }}
              style={{ perspective: 1000 }}
              className="relative aspect-[4/5] overflow-hidden rounded-[3rem] shadow-2xl transition-all duration-700"
            >
              <img 
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop" 
                alt="Dresses" 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 text-white">
                <h3 className="text-4xl font-black tracking-tighter mb-4">DRESSES</h3>
                <Link href="#" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] hover:tracking-[0.4em] transition-all bg-white text-black px-6 py-3 rounded-full">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
            <div className="space-y-12 pl-0 lg:pl-12">
              <div className="space-y-4">
                <h2 className="text-5xl font-black tracking-tighter">EXPLORE<br />CATEGORIES</h2>
                <p className="text-zinc-500 font-medium max-w-sm">Discover our curated selection of premium essentials designed for the modern silhouette.</p>
              </div>
              <ul className="space-y-4">
                {['Dresses', 'Jumpsuits', 'Tops', 'Summer', 'Woman Dress'].map((cat, i) => (
                  <motion.li 
                    key={cat} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <Link href="#" className="flex items-center justify-between text-xl font-black tracking-tighter uppercase p-6 rounded-2xl border border-transparent hover:border-zinc-200 hover:bg-white hover:shadow-lg transition-all duration-300">
                      {cat}
                      <motion.div 
                        whileHover={{ rotate: 90 }}
                        className="h-12 w-12 flex items-center justify-center rounded-full bg-zinc-50 group-hover:bg-black group-hover:text-white transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </motion.div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Collection Section */}
      <section className="bg-zinc-100/50 py-32 rounded-[4rem] mx-4 my-24 border border-zinc-200 shadow-inner">
        <div className="container mx-auto px-4">
          <div className="mb-20 text-center">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-6xl font-black tracking-tighter mb-6 uppercase"
            >
              The Collection
            </motion.h2>
            <p className="text-zinc-400 font-black uppercase tracking-[0.4em] text-[10px]">Ethically made • Premium quality • Limited edition</p>
          </div>
          <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Product Detail Section */}
      <section className="py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-24 lg:grid-cols-2 lg:items-center">
            <motion.div 
              whileHover={{ rotateY: 10, rotateX: -5 }}
              style={{ perspective: 1500 }}
              className="relative aspect-square overflow-hidden rounded-[4rem] shadow-[-50px_50px_100px_rgba(0,0,0,0.1)] bg-white p-8"
            >
              <img 
                src={featuredProduct.image_url} 
                alt={featuredProduct.name} 
                className="h-full w-full object-cover rounded-[3rem]"
              />
              <div className="absolute top-16 left-16 flex flex-col gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div 
                    key={i} 
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    className="h-3 w-3 rounded-full bg-black/20 backdrop-blur-md" 
                  />
                ))}
              </div>
            </motion.div>
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex text-zinc-900">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Trusted by 5,000+ Clients</span>
                </div>
                <h2 className="text-7xl font-black tracking-tighter uppercase">{featuredProduct.name}</h2>
                <p className="text-4xl font-black tracking-tighter text-zinc-400">$ {featuredProduct.price.toFixed(2)}</p>
                <p className="max-w-md text-zinc-500 font-medium leading-relaxed text-lg">
                  {featuredProduct.description}
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Select Variant</h4>
                  <div className="flex gap-4">
                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                      <motion.button 
                        key={size} 
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 font-black text-xs hover:bg-black hover:text-white hover:border-black transition-all shadow-sm"
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-6 pt-6">
                  <div className="flex h-20 items-center gap-10 bg-zinc-50 rounded-3xl px-10 shadow-inner">
                    <button className="text-zinc-400 hover:text-black transition-colors"><Minus className="h-5 w-5" /></button>
                    <span className="w-6 text-center text-xl font-black">1</span>
                    <button className="text-zinc-400 hover:text-black transition-colors"><Plus className="h-5 w-5" /></button>
                  </div>
                  <motion.div className="flex-1" whileHover={{ scale: 1.02, y: -5 }}>
                    <Button className="h-20 w-full rounded-3xl bg-black text-xs font-black uppercase tracking-[0.3em] text-white hover:bg-zinc-800 shadow-2xl transition-all">
                      Add to Luxury Cart
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Joy Banner Section with 3D Parallax */}
      <section className="relative h-[80vh] mx-4 rounded-[4rem] overflow-hidden group">
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 10 }}
          src="https://images.unsplash.com/photo-1493655161922-ef98929de9d8?q=80&w=2070&auto=format&fit=crop" 
          alt="Banner" 
          className="h-full w-full object-cover grayscale brightness-50 transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h2 className="text-8xl font-black text-white mb-8 uppercase tracking-tighter leading-none">The Joy of<br />Pure Attire</h2>
            <p className="text-white/70 max-w-lg mx-auto mb-12 uppercase tracking-[0.4em] text-[10px] font-black leading-loose">Ethically crafted in limited batches to ensure absolute perfection in every stitch.</p>
            <Button variant="outline" className="rounded-2xl border-white/50 backdrop-blur-md text-white hover:bg-white hover:text-black px-12 py-8 text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl">
              Explore The Vault
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section with 3D Perspective */}
      <section className="bg-zinc-50 py-32">
        <div className="container mx-auto px-4">
          <div className="mb-20 text-center">
            <h2 className="text-5xl font-black tracking-tighter mb-6 uppercase">Voices of Excellence</h2>
            <div className="flex justify-center gap-1 text-zinc-900">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-5 w-5 fill-current" />)}
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
                whileHover={{ rotateY: i % 2 === 0 ? 10 : -10, y: -20 }}
                style={{ perspective: 1000 }}
                className="flex flex-col items-center text-center p-12 bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-zinc-100 transition-all duration-500"
              >
                <div className="mb-8 p-4 bg-zinc-50 rounded-2xl text-4xl">“</div>
                <p className="mb-10 font-medium text-zinc-500 italic leading-relaxed text-lg">"{t.content}"</p>
                <div className="h-px w-12 bg-zinc-200 mb-6" />
                <h4 className="text-xs font-black uppercase tracking-[0.3em]">{t.name}</h4>
                <p className="text-[10px] text-zinc-400 font-black uppercase tracking-[0.3em] mt-2">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white pt-32 pb-16 rounded-t-[5rem]">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 gap-20 md:grid-cols-4 lg:grid-cols-5">
            <div className="md:col-span-2 lg:col-span-2">
              <h2 className="mb-10 text-6xl font-black tracking-tighter uppercase">LUXE MARKET</h2>
              <p className="mb-10 max-w-xs text-zinc-500 text-sm font-medium leading-relaxed">
                Defining the modern silhouette with ethically sourced materials and timeless design. Est. 2024.
              </p>
              <div className="flex gap-8">
                {['Instagram', 'Pinterest', 'TikTok', 'Twitter'].map(s => (
                  <Link key={s} href="#" className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 hover:text-white transition-colors">{s}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-10 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Shop</h4>
              <ul className="space-y-6 text-[10px] font-black uppercase tracking-[0.3em]">
                <li><Link href="#" className="hover:text-zinc-400">New Arrivals</Link></li>
                <li><Link href="#" className="hover:text-zinc-400">Bestsellers</Link></li>
                <li><Link href="#" className="hover:text-zinc-400">Accessories</Link></li>
                <li><Link href="#" className="hover:text-zinc-400">Collections</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-10 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Concierge</h4>
              <ul className="space-y-6 text-[10px] font-black uppercase tracking-[0.3em]">
                <li><Link href="#" className="hover:text-zinc-400">Shipping</Link></li>
                <li><Link href="#" className="hover:text-zinc-400">Returns</Link></li>
                <li><Link href="#" className="hover:text-zinc-400">Contact</Link></li>
                <li><Link href="#" className="hover:text-zinc-400">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-10 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Legacy</h4>
              <ul className="space-y-6 text-[10px] font-black uppercase tracking-[0.3em]">
                <li><Link href="#" className="hover:text-zinc-400">About Us</Link></li>
                <li><Link href="#" className="hover:text-zinc-400">Sustainability</Link></li>
                <li><Link href="#" className="hover:text-zinc-400">Terms</Link></li>
                <li><Link href="#" className="hover:text-zinc-400">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-32 border-t border-zinc-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
            <div>© 2024 LUXE MARKET LIFESTYLE. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-10">
              <span className="cursor-pointer hover:text-white transition-colors">United Kingdom</span>
              <span className="cursor-pointer hover:text-white transition-colors">GBP £</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
