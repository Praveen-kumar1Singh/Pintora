"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Background Image slow zoom out effect
    tl.fromTo(
      ".hero-bg",
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
    );

    // Staggered text reveal for headline lines
    tl.fromTo(
      ".hero-text-line",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power4.out" },
      "-=1.5"
    );

    // Subtitle reveal
    tl.fromTo(
      ".hero-subtitle",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=1"
    );

    // CTA Buttons reveal
    tl.fromTo(
      ".hero-cta",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
      "-=0.6"
    );

    // Parallax scrolling
    gsap.to(".hero-parallax", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 hero-bg">
        <div className="hero-parallax absolute inset-0 -top-[20%] -bottom-[20%]">
          <Image
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop"
          alt="Premium Clothing Collection"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        </div>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 container px-4 lg:px-8 text-center text-white flex flex-col items-center mt-12">
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6 flex flex-col">
          <div className="overflow-hidden pb-2">
            <span className="block hero-text-line">Redefine</span>
          </div>
          <div className="overflow-hidden pb-2">
            <span className="block hero-text-line">Your Style</span>
          </div>
        </h1>
        
        {/* Subtitle */}
        <p className="hero-subtitle text-lg md:text-xl font-medium tracking-wide mb-10 max-w-2xl mx-auto opacity-90">
          Premium quality oversized tees and luxury streetwear designed for the modern individual.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto overflow-hidden p-2">
          <Link href="/shop" className="hero-cta">
            <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-none bg-white text-black hover:bg-white/90 hover:scale-105 transition-transform duration-300">
              Shop Collection
            </Button>
          </Link>
          <Link href="/shop?category=Oversized Tees" className="hero-cta">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-none border-white text-white bg-transparent hover:bg-white hover:text-black hover:scale-105 transition-transform duration-300">
              Explore Oversized
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
