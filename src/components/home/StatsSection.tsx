"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

function Counter({ from, to, duration, suffix = "" }: { from: number, to: number, duration: number, suffix?: string }) {
  const [count, setCount] = useState(from);
  const nodeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        const currentCount = Math.floor(progress * (to - from) + from);
        setCount(currentCount);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(to);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
}

export function StatsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const stats = [
    { number: 15, suffix: "K+", label: "Happy Customers" },
    { number: 120, suffix: "+", label: "Exclusive Designs" },
    { number: 4.9, suffix: "★", label: "Customer Rating", isFloat: true },
    { number: 48, suffix: " Hrs", label: "Fast Shipping" },
  ];

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-background border-b border-border/50 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="text-center flex flex-col items-center"
            >
              <div className="text-2xl md:text-4xl lg:text-5xl font-heading font-semibold text-foreground mb-3 uppercase tracking-tighter">
                {stat.isFloat ? (
                  <span>{stat.number}{stat.suffix}</span>
                ) : (
                  <Counter from={0} to={stat.number} duration={2} suffix={stat.suffix} />
                )}
              </div>
              <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
