import { notFound } from 'next/navigation';
import { getProducts } from '@/lib/shopify';
import { CollectionClient } from './collection-client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ handle: string }>
}

const getCollectionData = (handle: string) => {
  const collections: Record<string, { title: string, description: string, image: string, badge?: string }> = {
    'oversized-t-shirts': {
      title: 'Oversized T-Shirts',
      description: 'The signature drop shoulder fit. Premium heavy-weight cotton.',
      image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?q=80&w=2787&auto=format&fit=crop',
      badge: 'Best Sellers'
    },
    'graphic-tees': {
      title: 'Graphic Tees',
      description: 'Bold prints. High-density puff printing that lasts a lifetime.',
      image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=2938&auto=format&fit=crop',
    },
    'anime-collection': {
      title: 'Anime Collection',
      description: 'Official licensed designs from your favorite shows.',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=2874&auto=format&fit=crop',
      badge: 'Limited Edition'
    },
    'hoodies': {
      title: 'Premium Hoodies',
      description: '400 GSM bio-washed fleece. The warmest and softest you will ever own.',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2787&auto=format&fit=crop',
    },
  };

  return collections[handle] || {
    title: handle.replace(/-/g, ' ').toUpperCase(),
    description: 'Explore our premium collection.',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2940&auto=format&fit=crop',
  };
};

export async function generateMetadata(
  props: Props
): Promise<Metadata> {
  const params = await props.params;
  const data = getCollectionData(params.handle);

  return {
    title: `${data.title} | Printora`,
    description: data.description,
  }
}

export default async function CollectionPage(props: Props) {
  const params = await props.params;
  
  const collectionInfo = getCollectionData(params.handle);
  const products = await getProducts(); // In a real app, pass collection handle to getProducts

  return (
    <CollectionClient 
      products={products} 
      collectionHandle={params.handle} 
      collectionInfo={collectionInfo} 
    />
  );
}
