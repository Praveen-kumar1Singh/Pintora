"use client";

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { ShopifyProduct } from '@/lib/shopify';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

interface ShopClientProps {
  initialProducts: ShopifyProduct[];
  initialCategory?: string;
  initialSort?: string;
}

const CATEGORIES = ['All', 'Oversized Tees', 'Hoodies', 'Shirts', 'Joggers', 'Caps', 'Accessories'];
const SIZES_FALLBACK = ['S', 'M', 'L', 'XL', 'XXL'];
const COLORS_FALLBACK = ['Black', 'White'];

export function ShopClient({ initialProducts, initialCategory, initialSort }: ShopClientProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  
  // Filters
  const [category, setCategory] = useState(initialCategory || 'All');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState(initialSort || 'featured');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setCategory(initialCategory || 'All');
  }, [initialCategory]);

  useEffect(() => {
    if (initialSort) {
      setSortOption(initialSort);
    }
  }, [initialSort]);

  // Extract real sizes and colors from Shopify products
  const availableSizes = useMemo(() => {
    const sizes = new Set<string>();
    initialProducts.forEach(p => {
      const sizeOption = p.options?.find(o => o.name.toLowerCase() === 'size');
      if (sizeOption) sizeOption.values.forEach(v => sizes.add(v));
    });
    const result = Array.from(sizes);
    return result.length > 0 ? result : SIZES_FALLBACK;
  }, [initialProducts]);

  const availableColors = useMemo(() => {
    const colors = new Set<string>();
    initialProducts.forEach(p => {
      const colorOption = p.options?.find(o => o.name.toLowerCase() === 'color');
      if (colorOption) colorOption.values.forEach(v => colors.add(v));
    });
    const result = Array.from(colors);
    return result.length > 0 ? result : COLORS_FALLBACK;
  }, [initialProducts]);


  // Filter Logic
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        if (category.toLowerCase() !== 'all') {
          const searchCat = category.toLowerCase();
          if (!p.description.toLowerCase().includes(searchCat) && !p.title.toLowerCase().includes(searchCat)) return false;
        }
        
        const price = parseFloat(p.priceRange.minVariantPrice.amount);
        if (price < priceRange[0] || price > priceRange[1]) return false;

        // Filter by size
        if (selectedSizes.length > 0) {
          const sizeOption = p.options?.find(o => o.name.toLowerCase() === 'size');
          if (!sizeOption || !sizeOption.values.some(v => selectedSizes.includes(v))) {
            return false;
          }
        }
        
        // Filter by color
        if (selectedColors.length > 0) {
          const colorOption = p.options?.find(o => o.name.toLowerCase() === 'color');
          if (!colorOption || !colorOption.values.some(v => selectedColors.includes(v))) {
            return false;
          }
        }
        
        return true;
      })
      .sort((a, b) => {
        const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
        const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
        
        switch (sortOption) {
          case 'price-low': return priceA - priceB;
          case 'price-high': return priceB - priceA;
          case 'newest': return b.id.localeCompare(a.id); // Mock sorting
          default: return 0;
        }
      });
  }, [initialProducts, category, priceRange, selectedSizes, selectedColors, sortOption]);

  const FilterSidebar = () => (
    <div className="space-y-8">
      {/* Category Filter */}
      <div>
        <h3 className="font-bold uppercase tracking-wider mb-4 text-sm">Categories</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <button 
                onClick={() => setCategory(cat)}
                className={`transition-colors hover:text-foreground ${category.toLowerCase() === cat.toLowerCase() ? 'text-foreground font-semibold' : ''}`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Accordion defaultValue={['price', 'size', 'color']}>
        {/* Price Filter */}
        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="font-bold uppercase tracking-wider text-sm hover:no-underline py-2">Price</AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <Slider
              defaultValue={[0, 5000]}
              max={5000}
              step={100}
              value={priceRange}
              onValueChange={(val) => setPriceRange(val as number[])}
              className="mb-6"
            />
            <div className="flex justify-between items-center text-xs">
              <span className="px-2 py-1 bg-muted rounded">₹{priceRange[0]}</span>
              <span className="text-muted-foreground">to</span>
              <span className="px-2 py-1 bg-muted rounded">₹{priceRange[1]}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Size Filter */}
        <AccordionItem value="size" className="border-none">
          <AccordionTrigger className="font-bold uppercase tracking-wider text-sm hover:no-underline py-2">Size</AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="grid grid-cols-3 gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])}
                  className={`border text-xs py-2 rounded-sm transition-all ${
                    selectedSizes.includes(size) ? 'bg-primary text-primary-foreground border-primary' : 'hover:border-foreground'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Color Filter */}
        <AccordionItem value="color" className="border-none">
          <AccordionTrigger className="font-bold uppercase tracking-wider text-sm hover:no-underline py-2">Color</AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="flex flex-col gap-3">
              {availableColors.map((c) => (
                <div key={c} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`color-${c}`} 
                    checked={selectedColors.includes(c)}
                    onCheckedChange={(checked) => {
                      if (checked) setSelectedColors([...selectedColors, c]);
                      else setSelectedColors(selectedColors.filter(color => color !== c));
                    }}
                  />
                  <label
                    htmlFor={`color-${c}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {c}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b pb-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
            {category.toLowerCase() === 'all' ? 'All Products' : category}
          </h1>
          <p className="text-muted-foreground">Showing {filteredProducts.length} products</p>
        </div>
        
        <div className="flex gap-4 mt-4 md:mt-0 w-full md:w-auto">
          {/* Mobile Filter Trigger */}
          <Sheet>
            <SheetTrigger render={<Button variant="outline" className="flex-1 md:hidden"><Filter className="w-4 h-4 mr-2" /> Filters</Button>} />
            <SheetContent side="left" className="w-[85vw] sm:w-[400px]">
              <SheetHeader className="mb-6 text-left">
                <SheetTitle className="uppercase tracking-tighter font-black text-xl">Filters</SheetTitle>
              </SheetHeader>
              <div className="overflow-y-auto h-[calc(100vh-100px)] pb-10">
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop/Mobile Sorting */}
          <Select value={sortOption} onValueChange={(val) => setSortOption(val || 'featured')}>
            <SelectTrigger className="w-[180px] bg-transparent">
              <div className="flex items-center">
                <SlidersHorizontal className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Sort By" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">New Arrivals</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Desktop Sticky Filters */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-28 pr-6">
            <FilterSidebar />
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {!isMounted ? (
            // Skeleton Loading State
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-6 md:gap-x-6 md:gap-y-12">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                sortOption === 'newest' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="py-32 px-6 text-center flex flex-col items-center justify-center bg-foreground text-background rounded-3xl relative overflow-hidden shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-50 mix-blend-overlay"></div>
                    <motion.div 
                      animate={{ rotate: [0, 10, -10, 0] }} 
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="text-6xl mb-6 relative z-10"
                    >
                      🚀
                    </motion.div>
                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-background via-background/80 to-background">
                      Dropping Soon
                    </h3>
                    <p className="text-background/80 mb-8 max-w-md relative z-10 text-lg">
                      We're cooking up something extraordinary in our secret lab. Stay tuned for the next exclusive collection!
                    </p>
                    <Button 
                      variant="secondary" 
                      size="lg"
                      onClick={() => { setCategory('All'); setSortOption('featured'); setPriceRange([0,5000]); setSelectedColors([]); setSelectedSizes([]); }}
                      className="relative z-10 rounded-full px-8 py-6 text-sm tracking-widest font-bold uppercase shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.8)] transition-all"
                    >
                      Explore Current Drops
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="py-20 text-center flex flex-col items-center justify-center bg-muted/20 rounded-lg border border-dashed"
                  >
                    <h3 className="text-xl font-medium mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-6">We couldn't find anything matching your current filters.</p>
                    <Button onClick={() => { setCategory('All'); setPriceRange([0,5000]); setSelectedColors([]); setSelectedSizes([]); }}>
                      Clear Filters
                    </Button>
                  </motion.div>
                )
              ) : (
                <motion.div 
                  layout
                  className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-6 md:gap-x-6 md:gap-y-12"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
