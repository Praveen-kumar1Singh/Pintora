"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Truck, Share2, Star, ChevronDown, Check, Minus, Plus } from 'lucide-react';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ProductCard } from '@/components/product/ProductCard';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';

interface ProductClientProps {
  product: ShopifyProduct;
  relatedProducts: ShopifyProduct[];
}

export function ProductClient({ product, relatedProducts }: ProductClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const { addItem: addToCart, isLoading: isCartLoading, setDrawerOpen, cart } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  
  const inWishlist = isInWishlist(product.id);
  const price = parseFloat(product.priceRange?.minVariantPrice?.amount || '0');

  const [quantity, setQuantity] = useState(1);

  const colorOption = product.options?.find(o => o.name.toLowerCase() === 'color');
  const sizeOption = product.options?.find(o => o.name.toLowerCase() === 'size');

  const colors = colorOption ? colorOption.values : ['Black', 'White', 'Grey']; // Fallback if no options
  const sizes = sizeOption ? sizeOption.values : ['S', 'M', 'L', 'XL']; // Fallback if no options





  const recentlyViewed = useRecentlyViewed(product);

  // Compute selected variant based on selected options
  const selectedVariant = product.variants?.edges?.find(v => {
    let match = true;
    if (selectedColor) {
      const colorOpt = v.node.selectedOptions?.find(o => o.name.toLowerCase() === 'color');
      if (colorOpt && colorOpt.value !== selectedColor) match = false;
      // Fallback to title matching if selectedOptions is not fully populated
      else if (!colorOpt && !v.node.title.toLowerCase().includes(selectedColor.toLowerCase())) match = false;
    }
    if (selectedSize) {
      const sizeOpt = v.node.selectedOptions?.find(o => o.name.toLowerCase() === 'size');
      if (sizeOpt && sizeOpt.value !== selectedSize) match = false;
      else if (!sizeOpt && !v.node.title.toLowerCase().includes(selectedSize.toLowerCase())) match = false;
    }
    return match;
  })?.node || product.variants?.edges?.[0]?.node;

  const currentPrice = selectedVariant?.priceV2 
    ? parseFloat(selectedVariant.priceV2.amount) 
    : parseFloat(product.priceRange?.minVariantPrice?.amount || '0');

  const compareAtPrice = selectedVariant?.compareAtPrice 
    ? parseFloat(selectedVariant.compareAtPrice.amount) 
    : null;

  const isAvailable = selectedVariant?.availableForSale !== false;
  const sku = selectedVariant?.sku;

  // Sync image when variant changes
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    // Find variant with this color
    const variant = product.variants?.edges?.find(v => {
      const colorOpt = v.node.selectedOptions?.find(o => o.name.toLowerCase() === 'color');
      return colorOpt ? colorOpt.value === color : v.node.title.toLowerCase().includes(color.toLowerCase());
    })?.node;

    if (variant?.image?.url) {
      const idx = product.images.edges.findIndex(img => img.node.url === variant.image?.url);
      if (idx !== -1) setSelectedImage(idx);
    }
  };

  const handleAddToCart = async () => {
    if (sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (colors.length > 0 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }
    
    if (!selectedVariant) {
      toast.error("Variant not found");
      return;
    }

    if (!isAvailable) {
      toast.error("This item is currently out of stock");
      return;
    }
    
    await addToCart(selectedVariant.id, quantity);
    toast.success(`${quantity} ${quantity > 1 ? 'items' : 'item'} added to cart!`);
    setDrawerOpen(true);
  };

  const handleBuyNow = async () => {
    if (!isAvailable) return;
    await handleAddToCart();
    
    // Check if we have a checkoutUrl, then redirect
    // The cart object might need to be refreshed since it was just updated by handleAddToCart
    // However, Zustand should update it. We can just use the latest state directly from the store
    const latestCart = useCartStore.getState().cart;
    if (latestCart?.checkoutUrl) {
      window.location.href = latestCart.checkoutUrl;
    } else {
      toast.error("Checkout unavailable right now. Please try again later.");
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: product.title,
      text: `Check out ${product.title} at Printora`,
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user aborted share
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy link");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
      {/* Product Top Section */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* Image Gallery (Left) */}
        <div className="w-full lg:w-[60%] flex flex-col-reverse md:flex-row gap-4">
          
          {/* Thumbnails (Desktop Only) */}
          <div className="hidden md:flex md:flex-col gap-4 overflow-visible shrink-0 w-20 lg:w-24">
            {product.images.edges.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative aspect-[3/4] w-full rounded-md overflow-hidden border-2 transition-all shrink-0 ${
                  selectedImage === idx ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Image src={img.node.url} alt={`Thumbnail ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* Main Image (Desktop) & Swipeable Gallery (Mobile) */}
          <div className="relative flex-1 aspect-[3/4] md:aspect-[4/5] md:max-h-[600px] bg-muted/20 rounded-xl overflow-hidden group">
            
            {/* Desktop View (Single Image with AnimatePresence) */}
            <div className="hidden md:block w-full h-full relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={product.images.edges[selectedImage]?.node.url || 'https://picsum.photos/1200/1600'}
                    alt={product.title}
                    fill
                    priority
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile View (Swipeable Gallery) */}
            <div className="flex md:hidden w-full h-full overflow-x-auto snap-x snap-mandatory hide-scrollbar">
              {product.images.edges.map((img, idx) => (
                <div key={idx} className="w-full h-full shrink-0 snap-center relative">
                  <Image
                    src={img.node.url}
                    alt={`${product.title} - Image ${idx + 1}`}
                    fill
                    priority={idx === 0}
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              ))}
            </div>
            
            {/* Overlay Buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                size="icon" 
                variant="secondary" 
                className="rounded-full shadow-md bg-background/80 backdrop-blur-md w-11 h-11"
                onClick={(e) => { e.stopPropagation(); handleShare(); }}
              >
                <Share2 className="w-5 h-5" />
              </Button>
              <Button 
                size="icon" 
                variant="secondary" 
                className="rounded-full shadow-md bg-background/80 backdrop-blur-md w-11 h-11"
                onClick={(e) => { e.stopPropagation(); inWishlist ? removeFromWishlist(product.id) : addToWishlist(product); }}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Info (Right) */}
        <div className="w-full lg:w-[40%] flex flex-col pt-2 lg:pt-8 relative">
          <div className="sticky top-28">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-2">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-end gap-3">
                <p className="text-xl font-medium">
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(currentPrice)}
                </p>
                {compareAtPrice && compareAtPrice > currentPrice && (
                  <>
                    <p className="text-base text-muted-foreground line-through mb-0.5">
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(compareAtPrice)}
                    </p>
                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider mb-0.5">
                      Save {Math.round(((compareAtPrice - currentPrice) / compareAtPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center text-yellow-500 ml-auto opacity-0 hidden">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current opacity-50" />
                <span className="text-sm text-muted-foreground ml-2">(128 reviews)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 text-sm">
              {sku && (
                <div className="text-muted-foreground">
                  <span className="uppercase tracking-wider font-semibold mr-1">SKU:</span> {sku}
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={`font-medium ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                  {isAvailable ? 'In Stock' : 'Sold Out'}
                </span>
              </div>
            </div>

            <p className="text-muted-foreground mb-8 text-sm md:text-base leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            {colors.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold uppercase tracking-wider text-sm mb-3">Color: <span className="font-normal text-muted-foreground">{selectedColor || colors[0]}</span></h3>
                <div className="flex gap-3 flex-wrap">
                  {colors.map((color) => {
                    // Very simple mock color mapper
                    const bgMap: Record<string, string> = { 'black': 'bg-black', 'white': 'bg-white border-border', 'grey': 'bg-gray-400', 'blue': 'bg-blue-600', 'red': 'bg-red-600', 'green': 'bg-green-600' };
                    const bgClass = bgMap[color.toLowerCase()] || 'bg-black';
                    const isSelected = selectedColor === color || (!selectedColor && color === colors[0]);
                    return (
                      <button
                        key={color}
                        onClick={() => handleColorSelect(color)}
                        title={color}
                        className={`relative w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${isSelected ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-transparent'}`}
                      >
                        <span className={`w-8 h-8 rounded-full border shadow-sm ${bgClass}`} />
                        {isSelected && <Check className={`absolute w-4 h-4 ${color.toLowerCase() === 'white' ? 'text-black' : 'text-white'}`} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sizes */}
            {sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-end mb-3">
                  <h3 className="font-semibold uppercase tracking-wider text-sm">Size</h3>
                  <button 
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] px-3 py-2 text-sm font-medium border rounded-md transition-all ${
                        selectedSize === size 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'hover:border-foreground bg-background'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-10">
              <h3 className="font-semibold uppercase tracking-wider text-sm mb-3">Quantity</h3>
              <div className="flex items-center border w-fit rounded-md">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-12 h-12 flex items-center justify-center font-bold text-sm">
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sticky Add to Cart Area */}
            <div className="flex flex-col gap-4 pb-8 border-b">
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="flex-1 h-14 text-lg rounded-none shadow-sm uppercase tracking-widest font-bold"
                  onClick={handleAddToCart}
                  disabled={isCartLoading || !isAvailable}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  {!isAvailable ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-14 px-6 rounded-none border-foreground hover:bg-foreground hover:text-background transition-colors"
                  onClick={() => { inWishlist ? removeFromWishlist(product.id) : addToWishlist(product); }}
                >
                  <Heart className={`w-6 h-6 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
              <Button 
                size="lg" 
                className="w-full h-14 text-lg rounded-none shadow-lg bg-foreground text-background hover:bg-foreground/90 uppercase tracking-widest font-bold"
                onClick={handleBuyNow}
                disabled={isCartLoading || !isAvailable}
              >
                Buy It Now
              </Button>
            </div>

            <div className="py-6 space-y-4 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Truck className="w-5 h-5" />
                <span>Free shipping on orders over ₹1499. Delivery in 3-5 business days.</span>
              </div>
            </div>

            {/* Details Accordion */}
            <Accordion defaultValue={['details']}>
              <AccordionItem value="details">
                <AccordionTrigger className="font-bold uppercase tracking-wider">Product Details</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>100% Premium Combed Cotton</li>
                    <li>240 GSM heavy-weight fabric</li>
                    <li>Bio-washed for ultimate softness</li>
                    <li>Drop shoulder oversized fit</li>
                    <li>Made in India</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger className="font-bold uppercase tracking-wider">Shipping & Returns</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  We offer a 7-day hassle-free return policy. If you aren't completely satisfied with your purchase, return it for a full refund or exchange.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <div className="mt-24 md:mt-32">
        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent space-x-8">
            <TabsTrigger value="faq" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 border-foreground rounded-none px-0 text-lg uppercase tracking-wider font-bold">FAQs</TabsTrigger>
          </TabsList>
          <TabsContent value="faq" className="py-12 text-muted-foreground">
            Frequently asked questions will appear here.
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-24 md:mt-32">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-12">You Might Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
          {relatedProducts.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <div className="mt-24">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-8">Recently Viewed</h2>
          <div className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
            {recentlyViewed.map((prod) => (
              <div key={prod.id} className="min-w-[280px] md:min-w-[320px] snap-start">
                <ProductCard product={prod} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsSizeGuideOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-background border p-8 shadow-2xl max-w-2xl w-full z-10"
            >
              <button 
                onClick={() => setIsSizeGuideOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-xl"
              >
                ✕
              </button>
              <h2 className="text-2xl font-black uppercase tracking-widest mb-6">Size Guide</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 font-semibold uppercase tracking-wider">Size</th>
                      <th className="py-3 font-semibold uppercase tracking-wider">Chest (in)</th>
                      <th className="py-3 font-semibold uppercase tracking-wider">Length (in)</th>
                      <th className="py-3 font-semibold uppercase tracking-wider">Sleeve (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="py-3">S</td><td className="py-3">42</td><td className="py-3">28</td><td className="py-3">9.5</td></tr>
                    <tr className="border-b"><td className="py-3">M</td><td className="py-3">44</td><td className="py-3">29</td><td className="py-3">10</td></tr>
                    <tr className="border-b"><td className="py-3">L</td><td className="py-3">46</td><td className="py-3">30</td><td className="py-3">10.5</td></tr>
                    <tr className="border-b"><td className="py-3">XL</td><td className="py-3">48</td><td className="py-3">31</td><td className="py-3">11</td></tr>
                    <tr><td className="py-3">XXL</td><td className="py-3">50</td><td className="py-3">32</td><td className="py-3">11.5</td></tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
