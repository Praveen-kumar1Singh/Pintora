import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/home/HeroSection';
import { ProductCard } from '@/components/product/ProductCard';
import { getProducts, getCollections } from '@/lib/shopify';
import { Truck, ShieldCheck, RefreshCw, Star, ArrowRight, Zap, Droplets, CheckCircle2, Loader2 } from 'lucide-react';

const ShopByCategory = dynamic(() => import('@/components/home/ShopByCategory').then(mod => mod.ShopByCategory));
const FeaturedCollections = dynamic(() => import('@/components/home/FeaturedCollections').then(mod => mod.FeaturedCollections));
const Newsletter = dynamic(() => import('@/components/home/Newsletter').then(mod => mod.Newsletter));

function SectionSkeleton() {
  return (
    <div className="w-full h-64 flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
    </div>
  );
}

async function ShopByCategorySection() {
  const collections = await getCollections();
  return <ShopByCategory collections={collections} />;
}

async function FeaturedCollectionsSection() {
  const collections = await getCollections();
  return <FeaturedCollections collections={collections} />;
}

async function BestSellersSection() {
  const bestSellers = await getProducts({ sortKey: 'BEST_SELLING' });
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
      {bestSellers.slice(0, 4).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

async function FeaturedProductsSection() {
  const newArrivals = await getProducts({ sortKey: 'CREATED_AT', reverse: true });
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
      {newArrivals.slice(0, 8).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function Home() {

  return (
    <div className="flex flex-col overflow-hidden">
      {/* 1. Hero Banner */}
      <HeroSection />

      {/* 2. Shop By Category */}
      <Suspense fallback={<SectionSkeleton />}>
        <ShopByCategorySection />
      </Suspense>

      {/* 3. Featured Collections */}
      <Suspense fallback={<SectionSkeleton />}>
        <FeaturedCollectionsSection />
      </Suspense>

      {/* 4. Best Sellers */}
      <section className="bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Best Sellers</h2>
              <p className="text-muted-foreground max-w-xl">
                Our most coveted pieces. Tried, tested, and loved by the community.
              </p>
            </div>
            <Link href="/shop?sort=bestselling" className="hidden md:block">
              <Button variant="link" className="uppercase tracking-widest font-semibold hover:no-underline">
                View All
              </Button>
            </Link>
          </div>

          <Suspense fallback={<SectionSkeleton />}>
            <BestSellersSection />
          </Suspense>
        </div>
      </section>

      {/* 4.5 Featured Products */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Featured Products</h2>
              <p className="text-muted-foreground max-w-xl">
                The latest drops from our premium collection. Grab them before they're gone.
              </p>
            </div>
            <Link href="/shop" className="hidden md:block">
              <Button variant="link" className="uppercase tracking-widest font-semibold hover:no-underline">
                View All
              </Button>
            </Link>
          </div>

          <Suspense fallback={<SectionSkeleton />}>
            <FeaturedProductsSection />
          </Suspense>

          <div className="mt-12 text-center md:hidden">
            <Link href="/shop">
              <Button variant="outline" className="w-full uppercase tracking-widest font-semibold">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Why Printora? */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">The Printora Standard</h2>
            <p className="text-background/70 max-w-2xl mx-auto">We don't compromise on quality. Every piece is engineered for perfection.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-background/10 rounded-full flex items-center justify-center text-background">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-2">Premium 240 GSM Cotton</h3>
                <p className="text-background/70 text-sm leading-relaxed">Heavyweight, ultra-soft combed cotton that drapes perfectly and lasts forever.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-background/10 rounded-full flex items-center justify-center text-background">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-2">High Quality Printing</h3>
                <p className="text-background/70 text-sm leading-relaxed">Advanced DTG and screen printing techniques that never crack or fade.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-background/10 rounded-full flex items-center justify-center text-background">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-2">Fast Shipping</h3>
                <p className="text-background/70 text-sm leading-relaxed">Express delivery across India with real-time tracking on all orders.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-background/10 rounded-full flex items-center justify-center text-background">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-2">Secure Payments</h3>
                <p className="text-background/70 text-sm leading-relaxed">100% secure checkout via Razorpay supporting all major cards and UPI.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-background/10 rounded-full flex items-center justify-center text-background">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-2">Easy Returns</h3>
                <p className="text-background/70 text-sm leading-relaxed">Not the right fit? Enjoy a seamless 7-day return and exchange policy.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-background/10 rounded-full flex items-center justify-center text-background">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-2">Made For Streetwear</h3>
                <p className="text-background/70 text-sm leading-relaxed">Authentic oversized drops shoulder silhouettes designed by streetwear veterans.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer Reviews */}
      <section className="bg-background overflow-hidden relative border-t">
        <div className="container mx-auto px-4 lg:px-8 mb-16 flex justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">The Word on the Street</h2>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
              <span className="flex text-black"><Star className="w-4 h-4 fill-black" /><Star className="w-4 h-4 fill-black" /><Star className="w-4 h-4 fill-black" /><Star className="w-4 h-4 fill-black" /><Star className="w-4 h-4 fill-black" /></span>
              4.9/5 based on 10,000+ reviews
            </div>
          </div>
        </div>

        {/* Infinite Marquee Slider */}
        <div className="flex gap-6 px-4 pb-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar group">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="min-w-[320px] md:min-w-[420px] bg-muted/30 p-8 rounded-none snap-center shrink-0 border border-border hover:border-black transition-colors">
              <div className="flex text-black mb-6">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-black" />)}
              </div>
              <p className="text-lg font-medium mb-8">"Absolutely love the fit and quality. The oversized tees are perfect. Better than most international brands I've tried. Will definitely buy again!"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-full overflow-hidden">
                  <Image src={`https://i.pravatar.cc/150?img=${i + 15}`} alt="User" width={48} height={48} />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wider">Verified Buyer</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Mumbai, India</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Instagram Community (Masonry) */}
      <section className="py-12 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Join The Movement</h2>
          <p className="text-muted-foreground uppercase tracking-widest text-sm font-bold">Tag @Printora.Official to be featured</p>
        </div>

        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Masonry Layout Mock */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[3/4] bg-muted group overflow-hidden rounded-lg">
                <Image src="https://picsum.photos/seed/p1/600/800" alt="IG" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="relative aspect-square bg-muted group overflow-hidden rounded-lg">
                <Image src="https://picsum.photos/seed/p2/600/600" alt="IG" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            </div>

            <div className="flex flex-col gap-4 md:mt-12">
              <div className="relative aspect-square bg-muted group overflow-hidden rounded-lg">
                <Image src="https://picsum.photos/seed/p3/600/600" alt="IG" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="relative aspect-[3/4] bg-muted group overflow-hidden rounded-lg">
                <Image src="https://picsum.photos/seed/p4/600/800" alt="IG" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative aspect-[3/4] bg-muted group overflow-hidden rounded-lg">
                <Image src="https://picsum.photos/seed/p5/600/800" alt="IG" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="relative aspect-square bg-muted group overflow-hidden rounded-lg">
                <Image src="https://picsum.photos/seed/p6/600/600" alt="IG" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            </div>

            <div className="flex flex-col gap-4 md:mt-12">
              <div className="relative aspect-square bg-muted group overflow-hidden rounded-lg">
                <Image src="https://picsum.photos/seed/p7/600/600" alt="IG" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="relative aspect-[3/4] bg-muted group overflow-hidden rounded-lg">
                <Image src="https://picsum.photos/seed/p8/600/800" alt="IG" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="https://instagram.com" target="_blank">
              <Button variant="outline" className="uppercase tracking-widest font-bold px-8 h-12 rounded-none border-black hover:bg-black hover:text-white transition-colors">
                Follow On Instagram
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Newsletter */}
      <Newsletter />
    </div>
  );
}
