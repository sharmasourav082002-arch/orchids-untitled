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
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-black selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero" 
            className="h-full w-full object-cover object-center scale-105 animate-subtle-zoom"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <div className="container relative flex h-full items-center justify-start px-4">
          <div className="max-w-xl text-white">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-[0.3em] opacity-90">Parisian Chic</h2>
            <h1 className="mb-6 text-6xl font-serif tracking-tight sm:text-8xl">
              Luxury <br />Paradise
            </h1>
            <p className="mb-8 max-w-md text-lg text-white/80">
              New collection of exclusive designs, ethically made with premium materials for the modern woman.
            </p>
            <div className="flex gap-4">
              <Button className="rounded-none bg-white px-8 py-6 text-xs font-bold uppercase tracking-widest text-black hover:bg-zinc-200">
                Shop Now
              </Button>
              <Button variant="outline" className="rounded-none border-white px-8 py-6 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black">
                View More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-b py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { icon: <Truck className="h-5 w-5" />, title: "Free Shipping", desc: "On orders over $149" },
              { icon: <Headphones className="h-5 w-5" />, title: "Support 24/7", desc: "Dedicated help center" },
              { icon: <RotateCcw className="h-5 w-5" />, title: "30 Days Return", desc: "Easy returns policy" },
              { icon: <ShieldCheck className="h-5 w-5" />, title: "Payment Secure", desc: "100% protected payments" },
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="text-zinc-400">{f.icon}</div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest">{f.title}</h4>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-[0.1em] mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Split Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
              <img 
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop" 
                alt="Dresses" 
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-serif">Dresses</h3>
                <Link href="#" className="mt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:underline">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="space-y-8 pl-0 lg:pl-12">
              <div className="space-y-2">
                <h2 className="text-4xl font-serif">Explore Categories</h2>
                <p className="text-zinc-500">Discover our curated selection of premium essentials.</p>
              </div>
              <ul className="divide-y border-t border-b">
                {['Dresses', 'Jumpsuits', 'Tops', 'Summer', 'Woman Dress'].map((cat) => (
                  <li key={cat} className="group py-6">
                    <Link href="#" className="flex items-center justify-between text-lg font-medium tracking-tight hover:pl-2 transition-all">
                      {cat}
                      <div className="h-10 w-10 flex items-center justify-center rounded-full border group-hover:bg-black group-hover:text-white transition-colors">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Collection Section */}
      <section className="bg-zinc-50 py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-serif mb-4">
              <span className="text-zinc-300">shne</span> Our Collection
            </h2>
            <p className="text-zinc-500 uppercase tracking-widest text-[10px]">Ethically made • Premium quality • Limited edition</p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Product Detail Section */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-square overflow-hidden bg-zinc-100">
              <img 
                src={featuredProduct.image_url} 
                alt={featuredProduct.name} 
                className="h-full w-full object-cover"
              />
              <div className="absolute top-8 left-8 flex flex-col gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-2 w-2 rounded-full bg-white/50" />
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">51 Reviews</span>
                </div>
                <h2 className="text-5xl font-serif">{featuredProduct.name}</h2>
                <p className="text-2xl font-bold">${featuredProduct.price.toFixed(2)}</p>
                <p className="max-w-md text-zinc-500 leading-relaxed">
                  {featuredProduct.description}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="mb-3 text-[10px] font-bold uppercase tracking-widest">Select Size</h4>
                  <div className="flex gap-2">
                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                      <button key={size} className="flex h-12 w-12 items-center justify-center border text-xs font-bold hover:bg-black hover:text-white transition-colors">
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="mb-3 text-[10px] font-bold uppercase tracking-widest">Select Color</h4>
                  <div className="flex gap-3">
                    {['#E5E7EB', '#D1D5DB', '#9CA3AF', '#4B5563'].map((color) => (
                      <button key={color} className="h-8 w-8 rounded-full border border-zinc-200" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <div className="flex h-14 items-center gap-6 border px-6">
                    <button className="hover:text-zinc-400"><Minus className="h-4 w-4" /></button>
                    <span className="w-4 text-center font-bold">1</span>
                    <button className="hover:text-zinc-400"><Plus className="h-4 w-4" /></button>
                  </div>
                  <Button className="h-14 flex-1 rounded-none bg-black text-xs font-bold uppercase tracking-widest text-white hover:bg-zinc-800">
                    Add to Cart
                  </Button>
                </div>
                <Button variant="outline" className="w-full h-14 rounded-none border-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Joy Banner Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1493655161922-ef98929de9d8?q=80&w=2070&auto=format&fit=crop" 
          alt="Banner" 
          className="h-full w-full object-cover grayscale opacity-80"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-6xl font-serif text-white mb-4">Joy of Freshly Attire</h2>
          <p className="text-white/70 max-w-lg mb-8 uppercase tracking-[0.2em] text-sm font-light">Ethically made in limited batches to ensure the highest quality.</p>
          <Button variant="outline" className="rounded-none border-white text-white hover:bg-white hover:text-black px-12 py-6 text-xs font-bold uppercase tracking-widest">
            Explore Collection
          </Button>
        </div>
      </section>

      {/* Brand Collections Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-center text-center">
            <h2 className="text-4xl font-serif mb-4">Explore by Brand Collections</h2>
            <div className="h-px w-20 bg-zinc-200" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { name: "Signature", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" },
              { name: "Aesthetic", img: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?q=80&w=1000&auto=format&fit=crop" },
              { name: "Minimal", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop" }
            ].map((col) => (
              <div key={col.name} className="group relative aspect-[3/4] overflow-hidden bg-zinc-100">
                <img src={col.img} alt={col.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-white bg-gradient-to-t from-black/50 to-transparent">
                  <h3 className="text-2xl font-serif">{col.name}</h3>
                  <Link href="#" className="mt-2 block text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Discover More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-zinc-100 py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="mb-4 text-4xl font-serif">Join the fashion revolution!</h2>
          <p className="mb-10 text-zinc-500 uppercase tracking-widest text-xs">Sign up to our newsletter and receive 15% off your first order.</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="h-14 flex-1 rounded-none border-b border-zinc-300 bg-transparent px-4 outline-none focus:border-black transition-colors"
            />
            <Button className="h-14 rounded-none bg-black px-12 text-xs font-bold uppercase tracking-widest text-white hover:bg-zinc-800">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="mb-12 text-center text-4xl font-serif text-zinc-900">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "How to choose for your body shape?", a: "We provide detailed size guides and fit descriptions for every item. Our customer service team is also available to help you find the perfect match." },
              { q: "What are the latest fashion trends?", a: "Stay updated with our curated 'New Arrivals' section and our weekly newsletter where we feature the latest seasonal trends." },
              { q: "How to care for different fabrics?", a: "Every garment comes with a care label. We recommend following those instructions specifically to ensure the longevity of your premium pieces." }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-zinc-100">
                <AccordionTrigger className="text-left text-sm font-bold uppercase tracking-widest hover:no-underline py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-500 leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-zinc-50 py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-serif mb-4">What our customers say</h2>
            <div className="flex justify-center gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { name: "Eliza Thompson", role: "Model", content: "I've been looking for sustainable yet stylish pieces for ages. AURA has completely transformed my wardrobe with their ethical approach." },
              { name: "Sophia Miller", role: "Designer", content: "The quality of the fabrics is exceptional. You can really tell the difference when something is made with care and attention to detail." },
              { name: "James Wilson", role: "Stylist", content: "Their customer service is top-notch. Fast shipping and the packaging is beautiful - makes for a great unboxing experience." }
            ].map((t, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 bg-white border border-zinc-100">
                <p className="mb-6 italic text-zinc-600 leading-relaxed">"{t.content}"</p>
                <div className="h-px w-8 bg-zinc-200 mb-4" />
                <h4 className="text-sm font-bold uppercase tracking-widest">{t.name}</h4>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-4 lg:grid-cols-5">
            <div className="md:col-span-2 lg:col-span-2">
              <h2 className="mb-8 text-4xl font-serif tracking-tight">AURA</h2>
              <p className="mb-8 max-w-xs text-zinc-500 text-sm leading-relaxed">
                Crafting premium lifestyle goods since 2024. We believe in simplicity, quality, and the beauty of well-designed objects.
              </p>
              <div className="flex gap-6">
                {['Instagram', 'Pinterest', 'TikTok', 'Twitter'].map(s => (
                  <Link key={s} href="#" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black">{s}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-8 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Shop</h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
                <li><Link href="#" className="hover:text-zinc-500">New Arrivals</Link></li>
                <li><Link href="#" className="hover:text-zinc-500">Bestsellers</Link></li>
                <li><Link href="#" className="hover:text-zinc-500">Accessories</Link></li>
                <li><Link href="#" className="hover:text-zinc-500">Collections</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-8 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Support</h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
                <li><Link href="#" className="hover:text-zinc-500">Shipping</Link></li>
                <li><Link href="#" className="hover:text-zinc-500">Returns</Link></li>
                <li><Link href="#" className="hover:text-zinc-500">Contact</Link></li>
                <li><Link href="#" className="hover:text-zinc-500">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-8 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Company</h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
                <li><Link href="#" className="hover:text-zinc-500">About Us</Link></li>
                <li><Link href="#" className="hover:text-zinc-500">Sustainability</Link></li>
                <li><Link href="#" className="hover:text-zinc-500">Terms</Link></li>
                <li><Link href="#" className="hover:text-zinc-500">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-24 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            <div>© 2024 AURA LIFESTYLE STORE. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-6">
              <span>English</span>
              <span>United States (USD $)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
