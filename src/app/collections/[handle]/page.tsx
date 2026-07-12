import { notFound } from 'next/navigation';
import { getCollectionProducts } from '@/lib/shopify';
import { CollectionClient } from './collection-client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ handle: string }>
}

export async function generateMetadata(
  props: Props
): Promise<Metadata> {
  const params = await props.params;
  const { collection } = await getCollectionProducts(params.handle);

  if (!collection) {
    return {
      title: 'Collection Not Found | Printora',
    }
  }

  return {
    title: `${collection.title} | Printora`,
    description: collection.description,
  }
}

export default async function CollectionPage(props: Props) {
  const params = await props.params;
  
  const { collection, products } = await getCollectionProducts(params.handle);

  if (!collection) {
    notFound();
  }

  return (
    <CollectionClient 
      products={products} 
      collectionHandle={params.handle} 
      collectionInfo={{
        title: collection.title,
        description: collection.description,
        image: collection.image?.url || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2940&auto=format&fit=crop',
      }} 
    />
  );
}
