"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function Footer() {
  const pathname = usePathname();
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
  const accountUrl = shopifyDomain ? `https://${shopifyDomain}/account` : '#';
  
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/auth')) {
    return null;
  }

  return (
    <footer className="bg-[#111111] text-white pb-24 md:pb-0 border-t border-white/10">
      <div className="container mx-auto px-4 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
          
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col justify-between">
            <div>
              <Link href="/" className="text-4xl font-heading font-black uppercase tracking-tighter block mb-6">
                Printora
              </Link>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Premium clothing crafted for the modern individual. Designed in India, worn globally.
              </p>
            </div>
            <div className="mt-12 md:mt-auto pt-6 border-t border-white/10 hidden md:block">
              <p className="text-xs text-white/40 tracking-widest uppercase">© {new Date().getFullYear()} Printora. All rights reserved.</p>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-8">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Shop</h4>
            <ul className="space-y-4 text-sm font-medium tracking-wide">
              <li><Link href="/shop" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">All Products</Link></li>
              <li><Link href="/collections/oversized-tees" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Oversized Tees</Link></li>
              <li><Link href="/collections/hoodies" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Premium Hoodies</Link></li>
              <li><Link href="/collections" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Collections</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Editorial</Link></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="space-y-8">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Support</h4>
            <ul className="space-y-4 text-sm font-medium tracking-wide">
              <li><Link href="/about" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">About Us</Link></li>
              <li><Link href={accountUrl} className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Track Order</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">FAQs</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Shipping Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Returns & Refunds</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Contact Us</Link></li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div className="space-y-8">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Connect</h4>
            <ul className="space-y-4 text-sm font-medium tracking-wide">
              <li><Link href="https://instagram.com" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Instagram</Link></li>
              <li><Link href="https://twitter.com" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Twitter</Link></li>
            </ul>
            
            <div className="pt-8 space-y-4 text-sm font-medium tracking-wide border-t border-white/10 mt-8">
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-conditions" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 md:hidden block">
          <p className="text-xs text-white/40 tracking-widest uppercase">© {new Date().getFullYear()} Printora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
