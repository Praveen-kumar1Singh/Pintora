"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/useCartStore';
import { EmptyState } from '@/components/ui/empty-state';
import { toast } from 'sonner';

export default function CartPage() {
  const [coupon, setCoupon] = useState('');
  const { cart, isLoading, removeItem, updateQuantity, initCart } = useCartStore();
  
  useEffect(() => {
    if (!cart) {
      initCart();
    }
  }, [cart, initCart]);

  const cartLines = cart?.lines?.edges || [];
  const cartCount = cartLines.reduce((acc: number, edge: any) => acc + edge.node.quantity, 0);

  const subtotal = parseFloat(cart?.cost?.subtotalAmount?.amount || '0');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.toLowerCase() === 'printora10') {
      // Logic for discount code (Shopify has discount code mutations we could add later)
    }
  };

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    } else {
      toast.error("Checkout unavailable right now. Please try again later.");
    }
  };

  if (cartLines.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[60vh]">
        <EmptyState
          icon={<ShoppingBag className="w-16 h-16" />}
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet."
          actionLabel="Continue Shopping"
          actionHref="/shop"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
      <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-10 flex items-center gap-4">
        <ShoppingBag className="w-8 h-8 md:w-12 md:h-12" /> Your Cart ({cartCount})
      </h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items List */}
        <div className="flex-1 space-y-6">
          <AnimatePresence>
            {cartLines.map((edge: any) => {
              const item = edge.node;
              const product = item.merchandise.product;
              return (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50, scale: 0.9 }}
                  className="flex gap-6 p-4 border rounded-xl bg-card shadow-sm relative group"
                >
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute top-4 right-4 p-2 bg-background/80 hover:bg-destructive hover:text-destructive-foreground rounded-full backdrop-blur transition-colors"
                    disabled={isLoading}
                    aria-label="Remove item"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="relative w-32 aspect-[3/4] rounded-md overflow-hidden bg-muted shrink-0">
                    <Image src={product.images?.edges[0]?.node?.url || ''} alt={product.title} fill className="object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-2 pr-8">
                    <div>
                      <h4 className="font-bold text-lg line-clamp-1">{product.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.merchandise.title}
                      </p>
                      <p className="font-semibold text-lg mt-3 text-primary">
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(parseFloat(item.cost.totalAmount.amount))}
                      </p>
                    </div>
                    
                    <div className="flex items-center border border-input rounded-md mt-4 w-fit bg-background">
                      <button 
                        className="p-2 hover:bg-muted transition-colors disabled:opacity-50"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1 || isLoading}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center text-sm font-semibold">{item.quantity}</span>
                      <button 
                        className="p-2 hover:bg-muted transition-colors disabled:opacity-50"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={isLoading}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="bg-card border rounded-xl p-6 lg:p-8 shadow-xl sticky top-32">
            <h3 className="text-xl font-bold uppercase tracking-wider mb-6">Order Summary</h3>

            {/* Coupon */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-8">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Promo code" 
                  className="pl-9 h-12 bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary"
                />
              </div>
              <Button type="submit" variant="secondary" className="h-12 px-6 font-semibold">Apply</Button>
            </form>

            <Separator className="my-6" />

            <div className="space-y-4 text-base">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </div>
              
              <Separator className="my-4" />

              <div className="flex justify-between font-black text-2xl uppercase tracking-wider">
                <span>Total</span>
                <span className="text-primary">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(subtotal)}</span>
              </div>
            </div>

            <div className="block w-full mt-8">
              <Button onClick={handleCheckout} disabled={isLoading} size="lg" className="w-full h-14 text-lg uppercase tracking-widest font-black shadow-xl hover:shadow-primary/25 hover:-translate-y-1 transition-all">
                Proceed to Checkout <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <ShoppingBag className="w-4 h-4" />
              <span>Secure checkout provided by Shopify</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
