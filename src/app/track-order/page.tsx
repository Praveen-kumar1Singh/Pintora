"use client";

import { useState } from 'react';
import { Package, Truck, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TrackOrderPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowStatus(true);
    }, 1500);
  };

  return (
    <div className="pb-24 pt-12 md:pt-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-2xl text-center">
        <div className="mb-12">
          <div className="w-16 h-16 bg-muted flex items-center justify-center rounded-full mx-auto mb-6">
            <Package className="w-8 h-8 text-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Track Order</h1>
          <p className="text-muted-foreground">Enter your Order ID and Email to check the status of your shipment.</p>
        </div>

        {!showStatus ? (
          <form onSubmit={handleSubmit} className="text-left space-y-6 bg-muted/30 p-8 rounded-xl border">
            <div className="space-y-2">
              <Label className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Order ID</Label>
              <Input required placeholder="e.g. PRN-12345" className="h-12 bg-background" />
            </div>
            <div className="space-y-2">
              <Label className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Email Address</Label>
              <Input required type="email" placeholder="you@example.com" className="h-12 bg-background" />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full h-12 uppercase tracking-widest font-bold">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Track Package'}
            </Button>
          </form>
        ) : (
          <div className="bg-muted/30 p-8 rounded-xl border text-left">
            <div className="flex items-center justify-between mb-8 pb-8 border-b">
              <div>
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest mb-1">Order PRN-12345</p>
                <h3 className="text-2xl font-black uppercase tracking-tighter">In Transit</h3>
              </div>
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full text-primary">
                <Truck className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted-foreground/20 before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border bg-background shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold">Order Placed</h4>
                    <span className="text-xs text-muted-foreground">Aug 10, 10:00 AM</span>
                  </div>
                  <p className="text-sm text-muted-foreground">We have received your order.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border bg-background shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold">Packed</h4>
                    <span className="text-xs text-muted-foreground">Aug 11, 2:30 PM</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Your items are securely packaged.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary/20 text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border bg-background shadow-sm ring-1 ring-primary">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-primary">In Transit</h4>
                    <span className="text-xs text-primary font-medium">Aug 12, 9:15 AM</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Package picked up by courier facility.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group opacity-50">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-muted text-muted-foreground shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                  <div className="w-3 h-3 bg-muted-foreground rounded-full" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border bg-background shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold">Expected Delivery</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Estimated by Aug 15.</p>
                </div>
              </div>

            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" onClick={() => setShowStatus(false)}>Track Another Order</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
