"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Truck, Share2, Star, ChevronDown, Check } from 'lucide-react';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ProductCard } from '@/components/product/ProductCard';

interface ProductClientProps {
  product: ShopifyProduct;
  relatedProducts: ShopifyProduct[];
}

export function ProductClient({ product, relatedProducts }: ProductClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { addItem: addToCart, isLoading: isCartLoading } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  
  const inWishlist = isInWishlist(product.id);
  const price = parseFloat(product.priceRange?.minVariantPrice?.amount || '0');

  // MOCK variants for UI demonstration since our ShopifyProduct structure is simplified
  // Ideally, these would be derived from product.variants
  const colors = ['Black', 'White', 'Grey', 'Electric Blue'];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    
    // In a real Shopify setup, you would find the specific variant ID based on selected options.
    // For now, we fallback to the first variant or the product ID.
    const variantId = product.variants?.edges?.[0]?.node?.id || product.id;
    
    await addToCart(variantId, 1);
    alert("Added to cart!");
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
      {/* Product Top Section */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* Image Gallery (Left) */}
        <div className="w-full lg:w-[60%] flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible shrink-0 w-full md:w-20 lg:w-24">
            {product.images.edges.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative aspect-[3/4] w-20 md:w-full rounded-md overflow-hidden border-2 transition-all shrink-0 ${
                  selectedImage === idx ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Image src={img.node.url} alt={`Thumbnail ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div 
            className="relative flex-1 aspect-[3/4] md:aspect-auto md:min-h-[700px] bg-muted/20 rounded-xl overflow-hidden cursor-crosshair group"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <Image
                  src={product.images.edges[selectedImage]?.node.url || 'https://picsum.photos/1200/1600'}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-200"
                  style={{
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                    transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
                  }}
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Overlay Buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="icon" variant="secondary" className="rounded-full shadow-md bg-background/80 backdrop-blur-md">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button 
                size="icon" 
                variant="secondary" 
                className="rounded-full shadow-md bg-background/80 backdrop-blur-md"
                onClick={(e) => { e.stopPropagation(); inWishlist ? removeFromWishlist(product.id) : addToWishlist(product); }}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
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
            
            <div className="flex items-center gap-4 mb-6">
              <p className="text-xl font-medium">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)}
              </p>
              <div className="flex items-center text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current opacity-50" />
                <span className="text-sm text-muted-foreground ml-2">(128 reviews)</span>
              </div>
            </div>

            <p className="text-muted-foreground mb-8 text-sm md:text-base leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            <div className="mb-8">
              <h3 className="font-semibold uppercase tracking-wider text-sm mb-3">Color: <span className="font-normal text-muted-foreground">{selectedColor || colors[0]}</span></h3>
              <div className="flex gap-3">
                {colors.map((color) => {
                  const bgClass = color === 'Black' ? 'bg-black' : color === 'White' ? 'bg-white border-border' : color === 'Grey' ? 'bg-gray-400' : 'bg-blue-600';
                  const isSelected = selectedColor === color || (!selectedColor && color === colors[0]);
                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${isSelected ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-transparent'}`}
                    >
                      <span className={`w-8 h-8 rounded-full border shadow-sm ${bgClass}`} />
                      {isSelected && <Check className={`absolute w-4 h-4 ${color === 'White' ? 'text-black' : 'text-white'}`} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-10">
              <div className="flex justify-between items-end mb-3">
                <h3 className="font-semibold uppercase tracking-wider text-sm">Size</h3>
                <button className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm font-medium border rounded-md transition-all ${
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

            {/* Sticky Add to Cart Area */}
            <div className="flex gap-4 pb-8 border-b">
              <Button 
                size="lg" 
                className="flex-1 h-14 text-lg rounded-none shadow-lg"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Cart
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

      {/* Tabs: Reviews & More */}
      <div className="mt-24 md:mt-32">
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent space-x-8">
            <TabsTrigger value="reviews" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 border-foreground rounded-none px-0 text-lg uppercase tracking-wider font-bold">Reviews (128)</TabsTrigger>
            <TabsTrigger value="faq" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 border-foreground rounded-none px-0 text-lg uppercase tracking-wider font-bold">FAQs</TabsTrigger>
          </TabsList>
          <TabsContent value="reviews" className="py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1 border-r pr-8">
                <h3 className="text-5xl font-black mb-4">4.8</h3>
                <div className="flex text-yellow-500 mb-2">
                  <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-muted-foreground mb-8">Based on 128 reviews</p>
                <Button variant="outline" className="w-full uppercase tracking-widest font-semibold rounded-none">Write a Review</Button>
              </div>
              <div className="lg:col-span-2 space-y-8">
                {/* Mock Review */}
                <div className="border-b pb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold">Amazing Quality!</h4>
                      <div className="flex text-yellow-500 mt-1">
                        <Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" />
                      </div>
                    </div>
                    <span className="text-muted-foreground text-sm">2 days ago</span>
                  </div>
                  <p className="text-muted-foreground">The fabric is incredibly thick and premium. The oversized fit is exactly what I was looking for. Definitely buying more colors!</p>
                  <p className="text-sm font-medium mt-4">- Rahul S. <span className="text-green-600 ml-2">✓ Verified Buyer</span></p>
                </div>
              </div>
            </div>
          </TabsContent>
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
    </div>
  );
}
