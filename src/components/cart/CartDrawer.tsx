"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, X, Plus, Minus, ArrowRight, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';

export function CartDrawer() {
  const { cart, isLoading, isDrawerOpen, setDrawerOpen, removeItem, updateQuantity, initCart } = useCartStore();
  
  useEffect(() => {
    if (isDrawerOpen && !cart) {
      initCart();
    }
  }, [isDrawerOpen, cart, initCart]);

  const cartLines = cart?.lines?.edges || [];
  const cartCount = cartLines.reduce((acc: number, edge: any) => acc + edge.node.quantity, 0);
  const subtotal = parseFloat(cart?.cost?.subtotalAmount?.amount || '0');

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    } else {
      toast.error("Checkout unavailable right now. Please try again later.");
    }
  };

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-black uppercase tracking-widest flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" /> Your Cart ({cartCount})
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {cartLines.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold uppercase tracking-wider">Your cart is empty</h3>
                <p className="text-muted-foreground max-w-[250px] mx-auto">Looks like you haven't added anything to your cart yet.</p>
              </div>
              <Link href="/shop" onClick={() => setDrawerOpen(false)} className="w-full">
                <Button className="uppercase tracking-widest font-bold h-12 px-8 w-full">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cartLines.map((edge: any) => {
                const item = edge.node;
                const product = item.merchandise.product;
                return (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="relative w-24 aspect-[3/4] rounded-md overflow-hidden bg-muted shrink-0">
                      <Image src={product.images?.edges[0]?.node?.url || ''} alt={product.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col py-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link href={`/product/${product.handle}`} onClick={() => setDrawerOpen(false)} className="font-bold hover:underline line-clamp-1">
                            {product.title}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">{item.merchandise.title}</p>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          disabled={isLoading}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="mt-auto flex items-end justify-between">
                        <div className="flex items-center border rounded-md bg-background">
                          <button 
                            className="p-1.5 hover:bg-muted transition-colors disabled:opacity-50"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1 || isLoading}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <button 
                            className="p-1.5 hover:bg-muted transition-colors disabled:opacity-50"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={isLoading}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="font-semibold text-base">
                          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(parseFloat(item.cost.totalAmount.amount))}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cartLines.length > 0 && (
          <div className="p-6 border-t bg-background">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span className="uppercase tracking-wider">Subtotal</span>
              <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(subtotal)}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-6 text-center">Shipping, taxes, and discount codes calculated at checkout.</p>
            
            <div className="space-y-3">
              <Button onClick={handleCheckout} disabled={isLoading} className="w-full h-14 text-base uppercase tracking-widest font-black shadow-lg hover:shadow-primary/25 transition-all">
                Checkout
              </Button>
              <Link href="/cart" onClick={() => setDrawerOpen(false)} className="w-full">
                <Button variant="outline" className="w-full h-14 text-base uppercase tracking-widest font-bold">
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
