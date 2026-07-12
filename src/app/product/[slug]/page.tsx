import { notFound } from 'next/navigation';
import { getProduct, getProductRecommendations } from '@/lib/shopify';
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

  const imageUrl = product.images.edges[0]?.node.url || '';
  
  return {
    title: `${product.title} | Printora`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: imageUrl ? [{ url: imageUrl, width: 800, height: 1000, alt: product.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
      images: imageUrl ? [imageUrl] : [],
    }
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params;
  const product = await getProduct(params.slug);
  
  if (!product) {
    notFound();
  }

  // Fetch real related products using Shopify's recommendation API
  const relatedProducts = await getProductRecommendations(product.id);
  // Slice to 4 just in case Shopify returns more, to keep the UI clean
  const displayRelated = relatedProducts.slice(0, 4);
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images.edges[0]?.node.url,
    sku: product.variants?.edges[0]?.node.sku || product.id,
    offers: {
      '@type': 'Offer',
      price: product.priceRange?.minVariantPrice?.amount,
      priceCurrency: product.priceRange?.minVariantPrice?.currencyCode,
      availability: product.availableForSale ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductClient product={product} relatedProducts={displayRelated} />
    </>
  );
}
