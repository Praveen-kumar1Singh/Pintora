"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, X, Plus, Minus, ArrowRight, Trash2, Loader2, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import { getCart } from '@/lib/shopify';
import { CheckoutOverlay, CheckoutStatus } from './CheckoutOverlay';

export function CartDrawer() {
  const { cart, isLoading, isDrawerOpen, setDrawerOpen, removeItem, updateQuantity, initCart } = useCartStore();
  const [actionItemId, setActionItemId] = useState<string | null>(null);
  const [checkoutStatus, setCheckoutStatus] = useState<CheckoutStatus>('idle');
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  
  useEffect(() => {
    if (isDrawerOpen && !cart) {
      initCart();
    }
  }, [isDrawerOpen, cart, initCart]);

  const cartLines = cart?.lines?.edges || [];
  const cartCount = cartLines.reduce((acc: number, edge: any) => acc + edge.node.quantity, 0);
  const subtotal = parseFloat(cart?.cost?.subtotalAmount?.amount || '0');

  const handleCheckout = async () => {
    if (!cart?.id) {
      toast.error("Checkout unavailable right now. Please try again later.");
      return;
    }

    setCheckoutError(null);
    setCheckoutStatus('loading');
    
    try {
      // Artificial delay for premium transition
      await new Promise(r => setTimeout(r, 1500));
      
      const freshCart = await getCart(cart.id);
      if (!freshCart) throw new Error("Cart not found or expired.");
      if (!freshCart.checkoutUrl) throw new Error("Checkout URL is missing.");
      if (freshCart.lines.edges.length === 0) throw new Error("Your cart is empty.");
      
      // Verify variant availability
      const unavailableItem = freshCart.lines.edges.find((edge: any) => edge.node.merchandise.availableForSale === false);
      if (unavailableItem) {
        throw new Error(`"${unavailableItem.node.merchandise.product.title}" is no longer available. Please remove it to continue.`);
      }
      
      useCartStore.setState({ cart: freshCart });
      window.location.href = freshCart.checkoutUrl;
    } catch (e: any) {
      setCheckoutStatus('error');
      setCheckoutError(e.message || "Failed to prepare checkout. Please try again.");
    }
  };

  const handleUpdateQuantity = async (lineId: string, quantity: number) => {
    setActionItemId(lineId);
    await updateQuantity(lineId, quantity);
    setActionItemId(null);
  };

  const handleRemoveItem = async (lineId: string) => {
    setActionItemId(lineId);
    await removeItem(lineId);
    setActionItemId(null);
  };

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-black uppercase tracking-widest flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" /> Your Cart ({cartCount})
            </SheetTitle>
            <button 
              onClick={() => setDrawerOpen(false)} 
              className="text-xs uppercase tracking-widest font-bold text-muted-foreground hover:text-foreground transition-colors flex items-center hidden sm:flex"
            >
              Continue Shopping
            </button>
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
            <div className="space-y-6 flex-1 pr-2">
              <AnimatePresence initial={false}>
                {cartLines.map((edge: any, index: number) => {
                  const item = edge.node;
                  const product = item.merchandise.product;
                  const imageUrl = item.merchandise.image?.url || product.images?.edges[0]?.node?.url || '';
                  const isItemLoading = isLoading && actionItemId === item.id;
                  
                  return (
                    <motion.div 
                      key={item.id} 
                      layout
                      initial={{ opacity: 0, height: 0, scale: 0.95, x: 20 }}
                      animate={{ opacity: 1, height: 'auto', scale: 1, x: 0 }}
                      exit={{ opacity: 0, height: 0, scale: 0.95, x: -20 }}
                      transition={{ 
                        opacity: { duration: 0.2 },
                        layout: { duration: 0.3 },
                        default: { type: "spring", stiffness: 300, damping: 24, delay: index * 0.05 }
                      }}
                      className="flex gap-4 group"
                    >
                      <div className={`relative w-24 aspect-[3/4] rounded-md overflow-hidden bg-muted shrink-0 transition-opacity ${isItemLoading ? 'opacity-50' : 'opacity-100'}`}>
                        <Image src={imageUrl} alt={product.title} fill className="object-cover" />
                        {isItemLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px]">
                            <Loader2 className="w-5 h-5 animate-spin text-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 flex flex-col py-1">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <Link href={`/product/${product.handle}`} onClick={() => setDrawerOpen(false)} className="text-sm font-bold uppercase tracking-wide hover:underline line-clamp-1">
                              {product.title}
                            </Link>
                            {item.merchandise.title !== 'Default Title' && (
                              <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1.5">{item.merchandise.title}</p>
                            )}
                          </div>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1 disabled:opacity-50"
                            disabled={isLoading}
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="mt-auto flex items-end justify-between">
                          <div className="flex items-center border rounded-md bg-background overflow-hidden">
                            <button 
                              className="p-1.5 hover:bg-muted transition-colors disabled:opacity-50 disabled:bg-muted/50"
                              onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1 || isLoading}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                            <button 
                              className="p-1.5 hover:bg-muted transition-colors disabled:opacity-50 disabled:bg-muted/50"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
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
                    </motion.div>
                  );
                })}
              </AnimatePresence>
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
              <Button onClick={handleCheckout} disabled={isLoading || checkoutStatus === 'loading' || cartLines.length === 0} className="w-full h-14 text-base uppercase tracking-widest font-black shadow-lg hover:shadow-primary/25 transition-all">
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

      <CheckoutOverlay 
        status={checkoutStatus} 
        error={checkoutError}
        onRetry={handleCheckout}
        onCancel={() => setCheckoutStatus('idle')}
      />
    </Sheet>
  );
}
