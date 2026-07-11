"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function Footer() {
  const pathname = usePathname();
  
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/auth')) {
    return null;
  }

  return (
    <footer className="bg-foreground text-background pb-20 md:pb-0">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="text-3xl font-black uppercase tracking-tighter block">
              Printora
            </Link>
            <p className="text-background/70 text-sm">
              Premium clothing crafted for the modern individual. Designed in India, worn globally.
            </p>
            <div className="space-y-4 pt-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider">Join The Club</h4>
              <p className="text-xs text-background/60">Get 10% off your first order and exclusive access to new drops.</p>
              <form className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-transparent border-background/20 text-background placeholder:text-background/40 focus-visible:ring-background/30"
                />
                <Button type="submit" variant="outline" className="bg-background text-foreground hover:bg-background/90 border-transparent">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Shop & Read</h4>
            <ul className="space-y-4 text-sm text-background/70">
              <li><Link href="/shop" className="hover:text-background transition-colors">All Products</Link></li>
              <li><Link href="/shop?category=Oversized Tees" className="hover:text-background transition-colors">Oversized Tees</Link></li>
              <li><Link href="/shop?category=Hoodies" className="hover:text-background transition-colors">Premium Hoodies</Link></li>
              <li><Link href="/collections" className="hover:text-background transition-colors">Collections</Link></li>
              <li><Link href="/blog" className="hover:text-background transition-colors font-semibold text-background">Editorial (Blog)</Link></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="space-y-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Support</h4>
            <ul className="space-y-4 text-sm text-background/70">
              <li><Link href="/track-order" className="hover:text-background transition-colors">Track Order</Link></li>
              <li><Link href="/faq" className="hover:text-background transition-colors">FAQs</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-background transition-colors">Shipping Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-background transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/contact" className="hover:text-background transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="space-y-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider">Connect</h4>
            <div className="flex gap-4">
              <Link href="https://instagram.com" className="text-background/70 hover:text-background transition-colors">
                Instagram
              </Link>
              <Link href="https://twitter.com" className="text-background/70 hover:text-background transition-colors">
                Twitter
              </Link>
              <Link href="https://facebook.com" className="text-background/70 hover:text-background transition-colors">
                Facebook
              </Link>
              <Link href="https://youtube.com" className="text-background/70 hover:text-background transition-colors">
                YouTube
              </Link>
            </div>
            <div className="pt-6 space-y-2 text-sm text-background/70">
              <p>Email: support@printora.com</p>
              <p>Mon - Fri: 10:00 AM - 6:00 PM (IST)</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-background/50">
          <p>© {new Date().getFullYear()} Printora. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-background transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-background transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
