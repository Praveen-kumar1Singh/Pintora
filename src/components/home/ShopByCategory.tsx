"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

import { ShopifyCollection } from '@/lib/shopify';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ShopByCategoryProps {
  collections: ShopifyCollection[];
}

export function ShopByCategory({ collections }: ShopByCategoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Fade up header
    gsap.from(".sbc-header", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    // Stagger cards
    gsap.from(".sbc-card", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-muted/20">
      <div className="container px-4 lg:px-8 mb-12">
        <h2 className="sbc-header text-3xl md:text-5xl font-black uppercase tracking-tighter flex items-center gap-4">
          <span className="text-primary text-4xl md:text-5xl">🔥</span> Shop By Category
        </h2>
      </div>

      <div className="container px-4 lg:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {collections.slice(0, 10).map((collection, i) => (
          <Link 
            href={`/collections/${collection.handle}`} 
            key={i} 
            className="sbc-card group block bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/40"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <Image
                src={collection.image?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop'}
                alt={collection.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>

            {/* Content Container */}
            <div className="p-6 relative">
              <h3 className="text-foreground text-xl font-bold tracking-wide group-hover:text-primary transition-colors">
                {collection.title}
              </h3>
              <p className="text-muted-foreground text-sm mt-1 font-medium line-clamp-1">
                {collection.description || 'Explore collection'}
              </p>
              
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
