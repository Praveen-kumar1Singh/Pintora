import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/shopify';
import { ProductCard } from '@/components/product/ProductCard';

export default async function Home() {
  const newArrivals = await getProducts();
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2940&auto=format&fit=crop"
          alt="Premium Clothing Hero"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container px-4 lg:px-8 text-center text-white flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6">
            Redefine <br /> Your Style
          </h1>
          <p className="text-lg md:text-xl font-medium tracking-wide mb-10 max-w-2xl mx-auto opacity-90">
            Premium quality oversized tees and luxury streetwear designed for the modern individual.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/shop">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-none bg-white text-black hover:bg-white/90">
                Shop Collection
              </Button>
            </Link>
            <Link href="/shop?category=Oversized Tees">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-none border-white text-white hover:bg-white hover:text-black">
                Explore Oversized
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 md:py-32 container px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { title: 'Oversized Tees', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop' },
            { title: 'Premium Hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop' },
            { title: 'Summer Collection', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop' },
          ].map((category, i) => (
            <Link href={`/shop?category=${category.title}`} key={i} className="group relative aspect-[4/5] overflow-hidden bg-muted">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl md:text-3xl font-bold tracking-wider uppercase">
                  {category.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">New Arrivals</h2>
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
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {newArrivals.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/shop">
              <Button variant="outline" className="w-full uppercase tracking-widest font-semibold">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-24 container px-4 lg:px-8 border-t">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-wider">Premium Fabric</h3>
            <p className="text-muted-foreground">Crafted using 100% combed cotton for the softest feel and highest durability.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-wider">Made in India</h3>
            <p className="text-muted-foreground">Ethically manufactured and designed by top streetwear designers in India.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-wider">Free Returns</h3>
            <p className="text-muted-foreground">Not satisfied? Return within 7 days for a full refund, no questions asked.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
