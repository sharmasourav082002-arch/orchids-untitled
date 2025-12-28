import { supabase } from '@/lib/supabase';
import HomeClient from '@/components/HomeClient';

async function getProducts() {
  console.log('Fetching products from Supabase...');
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase error fetching products:', error);
      return [];
    }
    console.log(`Successfully fetched ${data?.length || 0} products`);
    return data || [];
  } catch (err) {
    console.error('Unexpected error in getProducts:', err);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return <HomeClient products={products} />;
}
