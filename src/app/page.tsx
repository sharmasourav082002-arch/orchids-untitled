import { supabase } from '@/lib/supabase';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { ShoppingBag, ShieldCheck, Truck, Clock } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-zinc-900 text-white">
        <div className="absolute inset-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero Background" 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="container relative z-10 px-4 text-center">
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-7xl">
            Redefine Your <span className="text-zinc-400">Lifestyle</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-300 sm:text-xl">
            Discover a curated collection of premium essentials designed for the modern individual. Quality, aesthetics, and functionality in every piece.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#products" className="rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition-transform hover:scale-105 active:scale-95">
              Shop Collection
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b bg-white py-12 dark:bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <Truck className="h-6 w-6" />, title: "Free Shipping", desc: "On orders over $100" },
              { icon: <ShieldCheck className="h-6 w-6" />, title: "Secure Checkout", desc: "100% protected payments" },
              { icon: <ShoppingBag className="h-6 w-6" />, title: "Cash on Delivery", desc: "Available for all orders" },
              { icon: <Clock className="h-6 w-6" />, title: "24/7 Support", desc: "Dedicated help center" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-bold">{feature.title}</h4>
                  <p className="text-sm text-zinc-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Listing */}
      <main id="products" className="container mx-auto px-4 py-24">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <p className="text-zinc-500">Our latest arrivals and top picks</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-24 dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="col-span-1 lg:col-span-2">
              <h2 className="mb-6 text-3xl font-bold tracking-tighter">AURA</h2>
              <p className="mb-8 max-w-sm text-zinc-500">
                Crafting premium lifestyle goods since 2024. We believe in simplicity, quality, and the beauty of well-designed objects.
              </p>
              <div className="flex gap-4">
                {/* Social icons would go here */}
              </div>
            </div>
            <div>
              <h4 className="mb-6 font-bold uppercase tracking-widest text-zinc-400">Shop</h4>
              <ul className="space-y-4 text-zinc-500">
                <li><a href="#" className="hover:text-black dark:hover:text-white">New Arrivals</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white">Electronics</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white">Home Decor</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 font-bold uppercase tracking-widest text-zinc-400">Support</h4>
              <ul className="space-y-4 text-zinc-500">
                <li><a href="#" className="hover:text-black dark:hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-24 border-t pt-8 text-center text-sm text-zinc-500">
            © 2024 AURA Lifestyle Store. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
