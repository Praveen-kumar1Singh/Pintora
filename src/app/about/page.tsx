import Image from 'next/image';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';

export const metadata = { title: 'About Us | Printora' };

export default function AboutPage() {
  return (
    <div className="pb-24">
      {/* Hero */}
      <div className="relative w-full h-[50vh] min-h-[400px] mb-16">
        <Image 
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2874&auto=format&fit=crop"
          alt="About Printora"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
              Redefining Luxury Streetwear
            </h1>
            <p className="text-xl text-white/90 font-medium">
              Designed in India. Worn globally. We are building the future of minimal fashion.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight">
          <h2>Our Story</h2>
          <p>Founded in 2024, Printora started with a simple question: Why is it so hard to find high-quality, heavy-weight blank apparel that doesn't cost a fortune?</p>
          <p>We spent 18 months developing our signature 400 GSM drop-shoulder tee. We tested over 50 different cotton blends, visited 20 factories, and threw out hundreds of prototypes before we found the perfect fit.</p>
          
          <h2>The Philosophy</h2>
          <p>We believe in less, but better. Our collections are released in small drops rather than traditional seasonal calendars. This allows us to focus entirely on the quality of each garment, reducing waste and ensuring every piece that leaves our warehouse meets our obsessive standards.</p>
          
          <blockquote>"We aren't in the business of making clothes. We're in the business of engineering confidence."</blockquote>
          
          <h2>Transparency</h2>
          <p>We manufacture exclusively in facilities that pay fair living wages and adhere to strict environmental standards. Luxury shouldn't come at the cost of human dignity or the planet.</p>
        </div>
      </div>
    </div>
  );
}
