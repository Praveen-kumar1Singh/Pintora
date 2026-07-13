"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Package, Truck, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import { ProductCard } from '@/components/product/ProductCard';
import { ShopifyProduct } from '@/lib/shopify';

interface OrderSuccessClientProps {
  recommendedProducts: ShopifyProduct[];
}

export function OrderSuccessClient({ recommendedProducts }: OrderSuccessClientProps) {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState('');
  const [orderedItems, setOrderedItems] = useState<any[]>([]);
  const [deliveryRange, setDeliveryRange] = useState({ start: '', end: '' });

  // On mount, snapshot cart and compute dates
  useEffect(() => {
    const orderIdParam = searchParams?.get('order_id');
    setOrderNumber(orderIdParam || `#PRT-${Math.floor(100000 + Math.random() * 900000)}`);

    const cart = useCartStore.getState().cart;
    if (cart?.lines?.edges?.length) {
      setOrderedItems(cart.lines.edges);
      // Immediately clear the cart in the store to reset the session
      useCartStore.setState({ cart: null });
    }

    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 3);
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 5);

    const formatOpts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    setDeliveryRange({
      start: startDate.toLocaleDateString('en-IN', formatOpts),
      end: endDate.toLocaleDateString('en-IN', formatOpts)
    });
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-12 lg:py-24 flex flex-col items-center">
      
      {/* Animation Header */}
      <div className="flex flex-col items-center justify-center text-center max-w-2xl w-full mb-16">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-24 h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-8 relative overflow-hidden shadow-2xl shadow-primary/20"
        >
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Check className="w-12 h-12" />
          </motion.div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4"
        >
          Thank You!
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-muted-foreground mb-8"
        >
          Your order <span className="font-bold text-foreground">{orderNumber}</span> has been confirmed. 
          We'll send you a shipping confirmation email as soon as your order ships.
        </motion.p>
      </div>

      {/* Order Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-5xl mb-24">
        
        {/* Left Column: Items */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3 border-b pb-4">
            <Package className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold uppercase tracking-widest">Items Purchased</h2>
          </div>
          
          <div className="space-y-6">
            {orderedItems.length > 0 ? orderedItems.map((edge, i) => {
              const item = edge.node;
              const product = item.merchandise.product;
              const imageUrl = item.merchandise.image?.url || product.images?.edges[0]?.node?.url || '';
              return (
                <div key={`${item.id}-${i}`} className="flex gap-4 p-4 border rounded-xl bg-card">
                  <div className="relative w-20 aspect-[3/4] rounded-md overflow-hidden bg-muted shrink-0">
                    <Image src={imageUrl} alt={product.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-bold uppercase tracking-wider line-clamp-1">{product.title}</h3>
                    {item.merchandise.title !== 'Default Title' && (
                      <p className="text-sm text-muted-foreground mt-1">{item.merchandise.title}</p>
                    )}
                    <div className="flex justify-between items-end mt-4">
                      <span className="text-sm font-medium">Qty: {item.quantity}</span>
                      <span className="font-bold">
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(parseFloat(item.cost.totalAmount.amount))}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }) : (
              <div className="text-muted-foreground p-8 text-center border border-dashed rounded-xl">
                Order details securely saved in your account history.
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Column: Delivery & Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3 border-b pb-4">
            <Truck className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold uppercase tracking-widest">Delivery Info</h2>
          </div>
          
          <div className="bg-muted/30 p-6 rounded-xl border space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Estimated Delivery</h3>
                <p className="text-muted-foreground mt-1 text-lg">
                  {deliveryRange.start} – {deliveryRange.end}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Standard Shipping (3-5 business days)
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 space-y-4">
            <Link href="/account" className="block w-full">
              <Button className="w-full h-14 text-base uppercase tracking-widest font-black shadow-lg hover:shadow-primary/25 transition-all">
                Track Your Order
              </Button>
            </Link>
            <Link href="/shop" className="block w-full">
              <Button variant="outline" className="w-full h-14 text-base uppercase tracking-widest font-bold">
                Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-7xl pt-16 border-t"
        >
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-10 text-center">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </motion.div>
      )}

    </div>
  );
}
