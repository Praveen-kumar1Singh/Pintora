"use client";

import { useState } from 'react';
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Message sent! We'll get back to you within 24 hours.");
    }, 1500);
  };

  return (
    <div className="pb-24 pt-12 md:pt-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground">We're here to help. Reach out to our support team.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-8">Get in touch</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-muted flex items-center justify-center rounded-full shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-sm mb-1">Email</h3>
                  <p className="text-muted-foreground">support@printora.com</p>
                  <p className="text-xs text-muted-foreground mt-1">We aim to reply within 24 hours.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-muted flex items-center justify-center rounded-full shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-sm mb-1">Phone</h3>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                  <p className="text-xs text-muted-foreground mt-1">Mon - Fri, 10am - 6pm IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-muted flex items-center justify-center rounded-full shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-sm mb-1">Headquarters</h3>
                  <p className="text-muted-foreground">123 Fashion Street, Bandra West<br/>Mumbai, Maharashtra 400050<br/>India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-muted/30 p-8 rounded-xl border">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-8">Send a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="uppercase tracking-wider text-xs font-bold text-muted-foreground">First Name</Label>
                  <Input required className="h-12 bg-background" />
                </div>
                <div className="space-y-2">
                  <Label className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Last Name</Label>
                  <Input required className="h-12 bg-background" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Email</Label>
                <Input type="email" required className="h-12 bg-background" />
              </div>

              <div className="space-y-2">
                <Label className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Order Number (Optional)</Label>
                <Input className="h-12 bg-background" />
              </div>

              <div className="space-y-2">
                <Label className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Message</Label>
                <textarea 
                  required 
                  className="w-full min-h-[150px] p-3 rounded-md border bg-background text-sm outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full h-12 uppercase tracking-widest font-bold">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
