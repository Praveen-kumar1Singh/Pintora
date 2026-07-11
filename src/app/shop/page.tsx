import { getProducts } from '@/lib/shopify';
import { ShopClient } from './shop-client';

export default async function ShopPage(
  props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams;
  const category = searchParams?.category as string | undefined;
  
  // Fetch products on the server
  const products = await getProducts();

  return (
    <ShopClient initialProducts={products} initialCategory={category} />
  );
}
