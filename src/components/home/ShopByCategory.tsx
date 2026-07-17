"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ShopifyCollection } from '@/lib/shopify';

interface ShopByCategoryProps {
  collections: ShopifyCollection[];
}

export function ShopByCategory({ collections }: ShopByCategoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const premiumCollections = collections.slice(0, 4); // Show only top 4 for larger cards

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8 mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-semibold uppercase tracking-tighter mb-0 text-foreground">
            Curated Collections
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <Link href="/shop" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
            View All Categories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <div className="container px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {premiumCollections.map((collection, i) => (
            <Link 
              href={`/collections/${collection.handle}`} 
              key={i} 
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                className="group relative aspect-[4/5] md:aspect-square overflow-hidden bg-muted rounded-2xl"
              >
                <Image
                  src={collection.image?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop'}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                  <div className="overflow-hidden">
                    <h3 className="text-white text-3xl md:text-4xl font-heading font-black uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {collection.title}
                    </h3>
                  </div>
                  <div className="overflow-hidden mt-4 h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="flex items-center gap-2 text-white/90 text-sm font-bold uppercase tracking-widest">
                      Explore Collection <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
