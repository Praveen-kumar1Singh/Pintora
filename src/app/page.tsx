import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { FeaturedBanner } from '@/components/home/FeaturedBanner';
import { ProductCard } from '@/components/product/ProductCard';
import { getProducts, getCollections } from '@/lib/shopify';
import { Truck, ShieldCheck, RefreshCw, Star, Zap, Droplets, CheckCircle2, Loader2 } from 'lucide-react';

const ShopByCategory = dynamic(() => import('@/components/home/ShopByCategory').then(mod => mod.ShopByCategory));
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

async function BestSellersSection() {
  const bestSellers = await getProducts({ sortKey: 'BEST_SELLING' });
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
      {bestSellers.slice(0, 4).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

async function FeaturedProductsSection() {
  const newArrivals = await getProducts({ sortKey: 'CREATED_AT', reverse: true });
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
      {newArrivals.slice(0, 4).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function Home() {

  return (
    <div className="flex flex-col overflow-hidden bg-background">
      {/* 1. Hero Banner */}
      <HeroSection />

      {/* 2. Stats Section */}
      <StatsSection />

      {/* 3. Shop By Category */}
      <Suspense fallback={<SectionSkeleton />}>
        <ShopByCategorySection />
      </Suspense>

      {/* 4. Best Sellers */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold uppercase tracking-tighter mb-4 text-foreground">Best Sellers</h2>
              <p className="text-muted-foreground max-w-xl text-lg">
                Our most coveted pieces. Tried, tested, and loved by the community.
              </p>
            </div>
            <Link href="/shop?sort=bestselling" className="hidden md:block">
              <Button variant="outline" className="uppercase tracking-widest font-bold h-12 px-8 rounded-full">
                View All Essentials
              </Button>
            </Link>
          </div>

          <Suspense fallback={<SectionSkeleton />}>
            <BestSellersSection />
          </Suspense>
        </div>
      </section>

      {/* 5. Promotional Banner */}
      <FeaturedBanner />

      {/* 6. Why Printora? */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter mb-6">The Printora Standard</h2>
            <p className="text-background/70 max-w-2xl mx-auto text-lg">We do not compromise on quality. Every piece is engineered for perfection.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="flex flex-col gap-6 p-8 border border-background/10 rounded-2xl bg-background/5">
              <div className="w-14 h-14 bg-background text-foreground rounded-2xl flex items-center justify-center shadow-xl">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold uppercase tracking-wider mb-3">Premium Cotton</h3>
                <p className="text-background/70 leading-relaxed">Heavyweight, ultra-soft combed cotton that drapes perfectly and lasts forever.</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 p-8 border border-background/10 rounded-2xl bg-background/5">
              <div className="w-14 h-14 bg-background text-foreground rounded-2xl flex items-center justify-center shadow-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold uppercase tracking-wider mb-3">Secure Experience</h3>
                <p className="text-background/70 leading-relaxed">100% secure checkout via trusted gateways supporting all major cards.</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 p-8 border border-background/10 rounded-2xl bg-background/5">
              <div className="w-14 h-14 bg-background text-foreground rounded-2xl flex items-center justify-center shadow-xl">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold uppercase tracking-wider mb-3">Fast Shipping</h3>
                <p className="text-background/70 leading-relaxed">Express delivery with premium unboxing experience and real-time tracking.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. New Arrivals */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter mb-4">Latest Drops</h2>
              <p className="text-muted-foreground max-w-xl text-lg">
                Fresh out of the studio. Secure your size before they sell out.
              </p>
            </div>
            <Link href="/shop" className="hidden md:block">
              <Button variant="outline" className="uppercase tracking-widest font-bold h-12 px-8 rounded-full">
                Shop New Arrivals
              </Button>
            </Link>
          </div>

          <Suspense fallback={<SectionSkeleton />}>
            <FeaturedProductsSection />
          </Suspense>
        </div>
      </section>

      {/* 8. Customer Reviews */}
      <section className="py-24 bg-muted/20 overflow-hidden relative border-y border-border/50">
        <div className="container mx-auto px-4 lg:px-8 mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter mb-6">The Word on the Street</h2>
          <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
            <span className="flex text-primary"><Star className="w-5 h-5 fill-primary" /><Star className="w-5 h-5 fill-primary" /><Star className="w-5 h-5 fill-primary" /><Star className="w-5 h-5 fill-primary" /><Star className="w-5 h-5 fill-primary" /></span>
            Based on 15,000+ Reviews
          </div>
        </div>

        <div className="flex overflow-hidden group pb-8">
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes marquee-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-50% - 12px)); }
            }
          `}} />
          <div 
            className="flex gap-6 w-max px-4 hover:[animation-play-state:paused]"
            style={{ animation: 'marquee-scroll 40s linear infinite' }}
          >
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-[350px] md:w-[450px] bg-background p-10 rounded-3xl shrink-0 shadow-sm border border-border/50 hover:shadow-xl hover:border-primary transition-all duration-300">
                <div className="flex text-primary mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-primary" />)}
                </div>
                <p className="text-lg md:text-xl font-medium mb-10 text-foreground leading-relaxed">
                  "Absolutely love the fit and quality. The oversized tees are perfect. Better than most international brands I've tried. Premium feel."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-muted rounded-full overflow-hidden border-2 border-border">
                    <Image src={`https://i.pravatar.cc/150?img=${(i % 6) + 15}`} alt="User" width={56} height={56} />
                  </div>
                  <div>
                    <p className="font-bold text-sm uppercase tracking-wider text-foreground">Verified Customer</p>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Exclusive Member</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Newsletter */}
      <Newsletter />
    </div>
  );
}
