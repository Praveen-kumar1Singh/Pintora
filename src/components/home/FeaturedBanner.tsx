"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function FeaturedBanner() {
  return (
    <section className="px-4 lg:px-6 py-16 bg-background">
      <div className="relative mx-auto max-w-[1400px] rounded-[2.5rem] overflow-hidden bg-foreground min-h-[560px] lg:min-h-[680px]">
        <Image
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2040&auto=format&fit=crop"
          alt="New drop campaign"
          fill
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-14 lg:p-20 min-h-[560px] lg:min-h-[680px]">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
            <span className="text-[11px] tracking-[0.25em] uppercase text-background/90 font-bold">New Drop / 03</span>
          </motion.div>

          <div className="max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-background text-[clamp(3rem,9vw,7.5rem)] font-heading font-black uppercase tracking-tighter leading-none"
            >
              Minimal.<br />Bold.<br /><span className="italic font-normal opacity-80">Timeless.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link href="/shop" className="group inline-flex items-center gap-3 h-14 pl-6 pr-4 rounded-2xl bg-background text-foreground text-sm font-bold uppercase tracking-widest hover:scale-[1.03] transition-transform">
                Shop the drop
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <p className="text-background/70 text-sm max-w-xs font-medium">A capsule of six pieces, made in limited quantities. Once sold, gone.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
