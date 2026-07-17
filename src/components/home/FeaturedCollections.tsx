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

interface FeaturedCollectionsProps {
  collections: ShopifyCollection[];
}

export function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Fade up header
    gsap.from(".fc-header", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    // Horizontal Scroll effect for the container
    if (window.innerWidth > 768) {
      const scrollWidth = scrollRef.current?.scrollWidth || 0;
      const clientWidth = scrollRef.current?.clientWidth || 0;
      
      if (scrollWidth > clientWidth) {
        gsap.to(scrollRef.current, {
          x: -(scrollWidth - clientWidth),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${scrollWidth - clientWidth}`,
            pin: true,
            scrub: 1,
          }
        });
      }
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-4 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 lg:px-8 mb-12 flex justify-between items-end">
        <h2 className="fc-header text-2xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-tighter">
          Curated Collections
        </h2>
        <Link href="/collections" className="fc-header hidden md:flex items-center gap-2 font-bold uppercase tracking-wider hover:text-primary transition-colors">
          View All <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <div className="px-4 lg:px-8">
        <div 
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-8 hide-scrollbar"
        >
          {collections.map((collection, i) => (
            <Link 
              href={`/collections/${collection.handle}`} 
              key={i} 
              className="group relative flex-none w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] aspect-[4/5] rounded-2xl overflow-hidden bg-muted"
            >
              <Image
                src={collection.image?.url || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&auto=format&fit=crop'}
                alt={collection.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-left">
                <h3 className="text-white text-3xl md:text-4xl font-black uppercase tracking-widest mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
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
    </section>
  );
}
