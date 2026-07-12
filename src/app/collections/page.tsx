import Image from 'next/image';
import Link from 'next/link';
import { getCollections } from '@/lib/shopify';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Collections | Printora',
  description: 'Explore all premium collections curated by Printora.',
};

export default async function CollectionsIndexPage() {
  const collections = await getCollections();

  return (
    <main className="min-h-screen pt-24 pb-20 bg-background text-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <header className="mb-12 md:mb-20 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            Collections
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore our curated drops and specific edits crafted for your lifestyle.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {collections.map((collection) => (
            <Link 
              href={`/collections/${collection.handle}`} 
              key={collection.id} 
              className="group relative flex flex-col aspect-[4/5] rounded-2xl overflow-hidden bg-muted block"
            >
              <Image
                src={collection.image?.url || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&auto=format&fit=crop'}
                alt={collection.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-left z-10">
                <h3 className="text-white text-3xl font-black uppercase tracking-widest mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {collection.title}
                </h3>
                <p className="text-white/80 font-medium mb-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 line-clamp-2">
                  {collection.description || 'Discover our premium curation.'}
                </p>
                <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider overflow-hidden">
                  <span className="relative">
                    Explore
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200" />
                  </span>
                  <ArrowRight className="w-5 h-5 -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
