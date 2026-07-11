"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, ShoppingBag, User, LayoutGrid } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Badge } from '@/components/ui/badge';
import { SearchOverlay } from '@/components/search/SearchOverlay';
import { CartDrawer } from '@/components/cart/CartDrawer';

export function BottomNav() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const cart = useCartStore((state: any) => state.cart);
  const cartCount = cart?.lines?.edges?.reduce((acc: number, item: any) => acc + item.node.quantity, 0) || 0;

  // Hide on admin and auth routes
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/auth')) {
    return null;
  }

  return (
    <>
      <nav className="fixed bottom-0 w-full bg-background/90 backdrop-blur-lg border-t border-muted z-40 md:hidden pb-safe">
        <div className="flex items-center justify-around h-16 px-2">
          
          <Link href="/" className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-foreground" aria-label="Home">
            <Home className={`w-5 h-5 mb-1 ${pathname === '/' ? 'text-foreground' : ''}`} />
            <span className={`text-[10px] uppercase tracking-widest font-semibold ${pathname === '/' ? 'text-foreground' : ''}`}>Home</span>
          </Link>
          
          <button onClick={() => setIsSearchOpen(true)} className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-foreground" aria-label="Search">
            <Search className="w-5 h-5 mb-1" />
            <span className="text-[10px] uppercase tracking-widest font-semibold">Search</span>
          </button>
          
          <Link href="/shop" className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-foreground" aria-label="Shop">
            <LayoutGrid className={`w-5 h-5 mb-1 ${pathname.startsWith('/shop') ? 'text-foreground' : ''}`} />
            <span className={`text-[10px] uppercase tracking-widest font-semibold ${pathname.startsWith('/shop') ? 'text-foreground' : ''}`}>Shop</span>
          </Link>

          {isAuthenticated ? (
            <Link href="/profile" className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-foreground" aria-label="Profile">
              <User className={`w-5 h-5 mb-1 ${pathname.startsWith('/profile') ? 'text-foreground' : ''}`} />
              <span className={`text-[10px] uppercase tracking-widest font-semibold ${pathname.startsWith('/profile') ? 'text-foreground' : ''}`}>Profile</span>
            </Link>
          ) : (
            <Link href="/login" className="flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-foreground" aria-label="Login">
              <User className="w-5 h-5 mb-1" />
              <span className="text-[10px] uppercase tracking-widest font-semibold">Login</span>
            </Link>
          )}

          {/* Cart Drawer Wrapper for Mobile Nav */}
          <div className="flex flex-col items-center justify-center w-full h-full">
             <CartDrawer isMobileNav={true} />
          </div>
          
        </div>
      </nav>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
