"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Star } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  return (
    <section className="relative min-h-[100vh] w-full overflow-hidden bg-background pt-32 pb-16">
      {/* decorative floating chips */}
      <motion.div
        aria-hidden
        className="absolute top-40 left-8 hidden md:block z-10"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="px-3 py-1.5 rounded-full bg-background/70 backdrop-blur-md border border-foreground/5 text-[10px] tracking-[0.2em] uppercase font-bold text-foreground">
          Drop 03 · Live
        </div>
      </motion.div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-8 items-center h-full pt-8">
        {/* LEFT */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/60 backdrop-blur border border-foreground/5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-foreground/70 font-bold">Summer 26 · New Arrivals</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-semibold uppercase tracking-tighter leading-[0.85] text-foreground mb-8">
            {["ELEVATE", "YOUR STYLE."].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.12 }}
                className="block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
            className="max-w-md text-[15px] md:text-lg font-medium leading-relaxed text-muted-foreground"
          >
            Premium streetwear crafted from heavyweight cotton and tailored oversized silhouettes — designed for everyday confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.65 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 h-14 pl-6 pr-2 rounded-2xl bg-foreground text-background text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] hover:scale-[1.02]"
            >
              Shop Collection
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-background/10 group-hover:bg-background/20 transition-colors">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
              </span>
            </Link>
            <Link
              href="/shop?sort=newest"
              className="group relative inline-flex items-center justify-center h-14 px-6 rounded-2xl text-sm font-bold uppercase tracking-widest text-foreground border border-foreground/20 overflow-hidden transition-colors hover:border-foreground"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-foreground" />
              <span className="relative group-hover:text-background transition-colors">Explore New Arrivals</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background" style={{
                  background: `linear-gradient(135deg, oklch(0.7 0.05 ${40 + i * 40}), oklch(0.55 0.08 ${60 + i * 30}))`,
                }} />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-foreground">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-foreground" />
                ))}
              </div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Trusted by 15,000+ customers</div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="relative mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease }}
            className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-foreground/5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35)]"
          >
            <Image 
              src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1974&auto=format&fit=crop" 
              alt="Model wearing premium streetwear" 
              fill
              priority
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <motion.div
              className="absolute bottom-6 left-6 right-6 flex items-end justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <div className="text-white">
                <div className="text-[10px] tracking-[0.2em] font-bold uppercase opacity-80">Featured</div>
                <div className="text-xl font-heading font-semibold uppercase tracking-widest mt-1">Heavyweight Hoodie</div>
                <div className="text-sm font-medium opacity-90 mt-1">₹4,499 · 340 GSM</div>
              </div>
              <Link href="/shop" className="grid place-items-center w-12 h-12 rounded-full bg-white text-black hover:scale-110 transition-transform">
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating cards */}
          <motion.div
            className="absolute -left-4 md:-left-10 top-10 hidden sm:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="px-5 py-4 rounded-2xl bg-background/85 backdrop-blur-xl border border-foreground/5 shadow-xl"
            >
              <div className="text-[10px] tracking-[0.15em] font-bold uppercase text-muted-foreground">Now shipping</div>
              <div className="text-sm font-heading font-bold uppercase tracking-widest mt-1 text-foreground">120+ countries</div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute -right-2 md:-right-6 bottom-24 hidden sm:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.35, duration: 0.6 }}
          >
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="px-5 py-4 rounded-2xl bg-foreground text-background shadow-xl"
            >
              <div className="text-[10px] tracking-[0.15em] font-bold uppercase opacity-70">Rating</div>
              <div className="text-sm font-heading font-semibold tracking-widest mt-1">4.9 / 5.0 ★</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-foreground/10 overflow-hidden bg-background">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}} />
        <div className="flex items-center py-4 whitespace-nowrap w-max" style={{ animation: 'infinite-scroll 30s linear infinite' }}>
          {[..."PRINTORA · ELEVATED ESSENTIALS · 340 GSM HEAVYWEIGHT · TAILORED OVERSIZED · SHIPPED WORLDWIDE · ".repeat(4)].join("").split("·").map((s, i) => (
            <span key={i} className="text-[11px] tracking-[0.3em] uppercase text-foreground/40 font-bold px-8">
              {s.trim()} {s.trim() && "·"}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
