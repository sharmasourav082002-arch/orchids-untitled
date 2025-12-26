import { supabase } from '@/lib/supabase';
import HomeClient from '@/components/HomeClient';

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

  return <HomeClient products={products} />;
}
