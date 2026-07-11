import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/lib/shopify';
import { ProductClient } from './product-client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  props: Props
): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.title} | Printora`,
    description: product.description,
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params;
  const product = await getProduct(params.slug);
  
  if (!product) {
    notFound();
  }

  // Fetch some related products
  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <ProductClient product={product} relatedProducts={relatedProducts} />
  );
}
