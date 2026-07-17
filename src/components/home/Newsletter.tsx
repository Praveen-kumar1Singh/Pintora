"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setEmail('');
      toast.success("Welcome to the club. Keep an eye on your inbox.");
    }, 1000);
  };

  return (
    <section className="py-12 md:py-16 min-h-[50vh] flex items-center justify-center bg-foreground text-background relative overflow-hidden w-full">
      {/* Subtle Texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      
      <div className="container px-4 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-background/60 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-2">Exclusive Access</p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-semibold uppercase tracking-tighter mb-2 leading-none">
            Join The Community
          </h2>
          <p className="text-background/80 text-sm md:text-base mb-4 max-w-xl mx-auto font-medium">
            Get early access to new drops, exclusive discounts, and limited collections.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/5 border-background/20 text-background placeholder:text-background/50 h-12 rounded-lg focus-visible:ring-background/30 px-4 text-sm transition-colors hover:bg-background/10 w-full sm:w-64"
              required
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="h-12 px-6 rounded-lg bg-background text-foreground hover:bg-background/90 hover:scale-105 font-bold uppercase tracking-widest text-xs transition-all duration-300 whitespace-nowrap w-full sm:w-auto"
            >
              {isLoading ? "Joining..." : "Subscribe"}
            </Button>
          </form>
          <p className="text-background/40 text-[10px] mt-6 uppercase tracking-widest font-medium">
            By subscribing, you agree to our Privacy Policy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
