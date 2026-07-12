"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, Search, User, Heart, ShoppingBag, Shirt, Crown, Coffee, Home, Dog } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchOverlay } from '../search/SearchOverlay';
import { ThemeToggle } from '../theme-toggle';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { cart, setDrawerOpen } = useCartStore((state: any) => state);
  const cartCount = cart?.lines?.edges?.reduce((acc: number, item: any) => acc + item.node.quantity, 0) || 0;
  
  const wishlistItems = useWishlistStore((state: { items: any[] }) => state.items);
  
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
  const accountUrl = shopifyDomain ? `https://${shopifyDomain}/account` : '#';

  const wishlistCount = wishlistItems.length;

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/auth')) {
    return null;
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/60 backdrop-blur-xl border-b border-border/50 shadow-sm'
            : 'bg-transparent text-foreground'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Announcement Bar */}
        {/* <div className="bg-primary text-primary-foreground text-center py-2 text-[10px] md:text-sm font-medium tracking-wide">
          FREE SHIPPING ON ORDERS OVER ₹1499
        </div> */}

        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-20">
            {/* Mobile Menu Trigger & Placeholder for Centering */}
            <div className="flex items-center lg:hidden flex-1">
              <Sheet>
                <SheetTrigger render={<Button variant="ghost" size="icon" className="-ml-2 w-12 h-12" aria-label="Open mobile menu" />}>
                  <Menu className="w-7 h-7" />
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-6 mt-10">
                    <Link href="/" className={`text-xl font-medium uppercase ${pathname === '/' ? 'text-primary font-bold' : ''}`}>Home</Link>
                    <Link href="/shop" className={`text-xl font-medium uppercase ${pathname === '/shop' ? 'text-primary font-bold' : ''}`}>Shop</Link>
                    <Link href="/shop?sort=newest" className={`text-xl font-medium uppercase ${pathname === '/shop' && (typeof window !== 'undefined' && window.location.search.includes('sort=newest')) ? 'text-primary font-bold' : ''}`}>New</Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 font-medium text-sm tracking-wide uppercase flex-1 relative">
              <Link href="/" className={`py-6 transition-colors ${pathname === '/' ? 'text-primary font-bold' : 'hover:text-primary'}`}>Home</Link>
              <div 
                className="group py-6 cursor-pointer"
                tabIndex={0}
              >
                <span className={`transition-colors flex items-center gap-1 ${pathname === '/shop' ? 'text-primary font-bold' : 'hover:text-primary'}`}>
                  Shop <span className="text-[10px]">▼</span>
                </span>
                
                {/* Mega Menu */}
                <div className="absolute top-full left-0 w-max pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="bg-background border shadow-xl rounded-xl p-8 grid grid-cols-4 gap-12 text-foreground normal-case tracking-normal">
                    
                    {/* Apparel Column */}
                    <div className="space-y-4">
                      <h4 className="font-bold flex items-center gap-2 border-b pb-2">
                        <Shirt className="w-4 h-4" /> Apparel
                      </h4>
                      <ul className="space-y-3">
                        <li><Link href="/collections/oversized-tees" className="text-muted-foreground hover:text-foreground focus:text-foreground focus:outline-none transition-colors hover:translate-x-1 inline-block">Oversized Tees</Link></li>
                        <li><Link href="/collections/hoodies" className="text-muted-foreground hover:text-foreground focus:text-foreground focus:outline-none transition-colors hover:translate-x-1 inline-block">Hoodies & Jackets</Link></li>
                        <li><Link href="/collections/bottomwear" className="text-muted-foreground hover:text-foreground focus:text-foreground focus:outline-none transition-colors hover:translate-x-1 inline-block">Bottomwear</Link></li>
                        <li><Link href="/collections/kids" className="text-muted-foreground hover:text-foreground focus:text-foreground focus:outline-none transition-colors hover:translate-x-1 inline-block">Kids Clothing</Link></li>
                      </ul>
                    </div>

                    {/* Accessories Column */}
                    <div className="space-y-4">
                      <h4 className="font-bold flex items-center gap-2 border-b pb-2">
                        <ShoppingBag className="w-4 h-4" /> Accessories
                      </h4>
                      <ul className="space-y-3">
                        <li><Link href="/collections/headwear" className="text-muted-foreground hover:text-foreground focus:text-foreground focus:outline-none transition-colors hover:translate-x-1 inline-flex items-center gap-2"><Crown className="w-3 h-3"/> Caps & Headwear</Link></li>
                        <li><Link href="/collections/bags" className="text-muted-foreground hover:text-foreground focus:text-foreground focus:outline-none transition-colors hover:translate-x-1 inline-flex items-center gap-2"><ShoppingBag className="w-3 h-3"/> Bags</Link></li>
                        <li><Link href="/collections/drinkware" className="text-muted-foreground hover:text-foreground focus:text-foreground focus:outline-none transition-colors hover:translate-x-1 inline-flex items-center gap-2"><Coffee className="w-3 h-3"/> Mugs & Tumblers</Link></li>
                        <li><Link href="/collections/mousepads" className="text-muted-foreground hover:text-foreground focus:text-foreground focus:outline-none transition-colors hover:translate-x-1 inline-flex items-center gap-2">Mousepads</Link></li>
                      </ul>
                    </div>

                    {/* Home Column */}
                    <div className="space-y-4">
                      <h4 className="font-bold flex items-center gap-2 border-b pb-2">
                        <Home className="w-4 h-4" /> Home & Living
                      </h4>
                      <ul className="space-y-3">
                        <li><Link href="/collections/frames" className="text-muted-foreground hover:text-foreground focus:text-foreground focus:outline-none transition-colors hover:translate-x-1 inline-block">Frames</Link></li>
                        <li><Link href="/collections/posters" className="text-muted-foreground hover:text-foreground focus:text-foreground focus:outline-none transition-colors hover:translate-x-1 inline-block">Posters</Link></li>
                      </ul>
                    </div>

                    {/* Pets Column */}
                    <div className="space-y-4">
                      <h4 className="font-bold flex items-center gap-2 border-b pb-2">
                        <Dog className="w-4 h-4" /> Pets
                      </h4>
                      <ul className="space-y-3">
                        <li><Link href="/collections/pet-wear" className="text-muted-foreground hover:text-foreground focus:text-foreground focus:outline-none transition-colors hover:translate-x-1 inline-block">Pet Wear</Link></li>
                        <li><Link href="/collections/pet-accessories" className="text-muted-foreground hover:text-foreground focus:text-foreground focus:outline-none transition-colors hover:translate-x-1 inline-block">Pet Accessories</Link></li>
                      </ul>
                    </div>

                  </div>
                </div>
              </div>

              <Link href="/shop?sort=newest" className={`py-6 transition-colors ${pathname === '/shop' && (typeof window !== 'undefined' && window.location.search.includes('sort=newest')) ? 'text-primary font-bold' : 'hover:text-primary'}`}>New</Link>
            </nav>

            {/* Logo */}
            <Link href="/" className="text-2xl md:text-3xl font-black uppercase tracking-tighter shrink-0 flex-none text-center" aria-label="Printora Home">
              Printora
            </Link>

            {/* Icons */}
            <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden lg:flex relative group"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
                <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background text-[10px] px-2 py-1 rounded tracking-widest whitespace-nowrap">
                  CTRL K
                </span>
              </Button>
              <Link href={accountUrl} aria-label="Account">
                <Button variant="ghost" size="icon" className="hidden lg:flex">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/wishlist" className="relative hidden md:block" aria-label="Wishlist">
                <Button variant="ghost" size="icon" aria-label="Wishlist">
                  <Heart className="w-5 h-5" />
                </Button>
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground rounded-full">
                    {wishlistCount}
                  </Badge>
                )}
              </Link>
              
              {/* Cart Link */}
              <button onClick={() => setDrawerOpen(true)} className="relative" aria-label="Cart">
                <ShoppingBag className="w-5 h-5 hover:opacity-70 transition-opacity" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              
              <div className="hidden lg:flex items-center ml-2 border-l pl-4 border-border">
                <ThemeToggle />
              </div>
              
              {/* Mobile placeholder to maintain center logo */}
              <div className="lg:hidden w-10 flex items-center justify-end">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </motion.header>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
