"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // TODO: Connect to Shopify Customer API or Mailchimp
    setTimeout(() => {
      setIsLoading(false);
      setEmail('');
      toast.info("Newsletter subscription is currently disabled for launch preview.");
      console.warn("Newsletter endpoint not configured.");
    }, 500);
  };

  return (
    <section className="py-24 bg-foreground text-background">
      <div className="container px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            Join The Community
          </h2>
          <p className="text-background/70 text-lg mb-8 max-w-xl mx-auto">
            Subscribe for early access to drops, exclusive discounts, and streetwear inspiration.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="YOUR EMAIL ADDRESS" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-background/20 text-background placeholder:text-background/50 h-14 rounded-none focus-visible:ring-background/30 px-6 uppercase tracking-widest text-xs font-bold"
              required
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="h-14 px-8 rounded-none bg-background text-foreground hover:bg-background/90 font-bold uppercase tracking-widest flex items-center gap-2"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-background/40 text-xs mt-6 uppercase tracking-widest">
            By subscribing, you agree to our Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  );
}
