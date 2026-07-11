"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, ArrowRight, Tag } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/useCartStore';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { useAuthStore } from '@/store/useAuthStore';

interface CartDrawerProps {
  isMobileNav?: boolean;
  children?: React.ReactNode;
}

export function CartDrawer({ isMobileNav, children }: CartDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coupon, setCoupon] = useState('');
  
  const { cart, isLoading, removeItem, updateQuantity, initCart } = useCartStore();
  
  useEffect(() => {
    if (isOpen && !cart) {
      initCart();
    }
  }, [isOpen, cart, initCart]);

  const cartLines = cart?.lines?.edges || [];
  const cartCount = cartLines.reduce((acc, edge) => acc + edge.node.quantity, 0);

  const subtotal = parseFloat(cart?.cost?.subtotalAmount?.amount || '0');
  const total = parseFloat(cart?.cost?.totalAmount?.amount || '0');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.toLowerCase() === 'printora10') {
      // Logic for discount code (Shopify has discount code mutations we could add later)
    }
  };

  const handleCheckout = () => {
    setIsOpen(false);
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger render={
        (children as React.ReactElement) || (
          <Button variant="ghost" size="icon" className="relative" aria-label="Open cart">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-[10px]">
                {cartCount}
              </Badge>
            )}
          </Button>
        )
      } />
      
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col bg-background/95 backdrop-blur-xl border-l">
        <SheetHeader className="p-6 border-b text-left">
          <SheetTitle className="flex items-center gap-2 uppercase tracking-widest font-bold">
            <ShoppingBag className="w-5 h-5" /> Your Bag ({cartCount})
          </SheetTitle>
        </SheetHeader>

        {cartLines.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag className="w-10 h-10" />}
            title="Your cart is empty"
            description="Looks like you haven't added anything yet."
            actionLabel="Start Shopping"
            onAction={() => setIsOpen(false)}
            actionHref="/shop"
          />
        ) : (
          <>
            <ScrollArea className="flex-1 p-6">
              <div className="flex flex-col gap-6">
                <AnimatePresence>
                  {cartLines.map((edge) => {
                    const item = edge.node;
                    const product = item.merchandise.product;
                    return (
                      <motion.div 
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50, scale: 0.9 }}
                        className="flex gap-4"
                      >
                        <div className="relative w-24 aspect-[3/4] rounded-md overflow-hidden bg-muted shrink-0">
                          <Image src={product.images?.edges[0]?.node?.url || ''} alt={product.title} fill className="object-cover" />
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold text-sm line-clamp-1 pr-4">{product.title}</h4>
                              <button 
                                onClick={() => removeItem(item.id)}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                disabled={isLoading}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.merchandise.title} {/* Variant Title (e.g. Size/Color) */}
                            </p>
                            <p className="font-medium text-sm mt-2">
                              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(parseFloat(item.cost.totalAmount.amount))}
                            </p>
                          </div>
                          
                          <div className="flex items-center border w-fit rounded-md mt-2">
                            <button 
                              className="p-1 hover:bg-muted transition-colors disabled:opacity-50"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1 || isLoading}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button 
                              className="p-1 hover:bg-muted transition-colors disabled:opacity-50"
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
            </ScrollArea>

            <div className="p-6 bg-background border-t mt-auto shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
              {/* Coupon */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Promo code" 
                    className="pl-9 h-10 rounded-none bg-muted/50 border-transparent focus-visible:ring-1 focus-visible:ring-foreground"
                  />
                </div>
                <Button type="submit" variant="secondary" className="h-10 rounded-none px-6">Apply</Button>
              </form>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between font-bold text-lg uppercase tracking-wider">
                  <span>Subtotal</span>
                  <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(subtotal)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Taxes and shipping calculated at checkout.</p>
              </div>

              {useAuthStore.getState().isAuthenticated ? (
                <div className="block w-full mt-6">
                  <Button onClick={handleCheckout} size="lg" className="w-full h-14 text-base uppercase tracking-widest font-semibold rounded-none shadow-xl">
                    Checkout <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              ) : (
                <div className="block w-full mt-6">
                  <Button 
                    size="lg" 
                    onClick={() => {
                      setIsOpen(false);
                      useAuthStore.getState().setAuthModalOpen(true);
                    }}
                    className="w-full h-14 text-base uppercase tracking-widest font-semibold rounded-none shadow-xl"
                  >
                    Login to Checkout <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
