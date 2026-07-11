"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, Search, User, Heart, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useAuthStore } from '@/store/useAuthStore';
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
import { CartDrawer } from '../cart/CartDrawer';
import { SearchOverlay } from '../search/SearchOverlay';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const cart = useCartStore((state: any) => state.cart);
  const wishlistItems = useWishlistStore((state: { items: any[] }) => state.items);
  
  const { isAuthenticated, user, logout } = useAuthStore();

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
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-md border-b shadow-sm'
            : 'bg-transparent text-foreground'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Announcement Bar */}
        <div className="bg-primary text-primary-foreground text-center py-2 text-[10px] md:text-sm font-medium tracking-wide">
          FREE SHIPPING ON ORDERS OVER ₹1499
        </div>

        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-20">
            {/* Mobile Menu Trigger & Placeholder for Centering */}
            <div className="flex items-center lg:hidden flex-1">
              <Sheet>
                <SheetTrigger render={<Button variant="ghost" size="icon" className="-ml-2" aria-label="Open mobile menu" />}>
                  <Menu className="w-6 h-6" />
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-6 mt-10">
                    <Link href="/shop" className="text-xl font-medium uppercase">Shop</Link>
                    <Link href="/shop?category=Oversized Tees" className="text-xl font-medium uppercase">Collections</Link>
                    <Link href="/about" className="text-xl font-medium uppercase">About</Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 font-medium text-sm tracking-wide uppercase flex-1">
              <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
              <Link href="/shop?category=Oversized Tees" className="hover:text-primary transition-colors">Oversized</Link>
              <Link href="/shop?category=Hoodies" className="hover:text-primary transition-colors">Hoodies</Link>
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
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger render={
                    <Button variant="ghost" size="icon" className="hidden lg:flex" aria-label="User profile menu">
                      <User className="w-5 h-5" />
                    </Button>
                  } />
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-sm">{user?.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem render={<Link href="/profile" className="cursor-pointer">My Profile</Link>} />
                    <DropdownMenuItem render={<Link href="/profile/orders" className="cursor-pointer">Orders</Link>} />
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500" onClick={logout}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login" aria-label="Login">
                  <Button variant="ghost" size="icon" className="hidden lg:flex">
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
              )}
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
              
              <CartDrawer>
                <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
                  <ShoppingBag className="w-5 h-5" />
                  {cart?.lines?.edges?.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-[10px]">
                      {cart.lines.edges.reduce((acc: number, item: any) => acc + item.node.quantity, 0)}
                    </Badge>
                  )}
                </Button>
              </CartDrawer>


              
              {/* Mobile placeholder to maintain center logo */}
              <div className="lg:hidden w-10"></div>
            </div>
          </div>
        </div>
      </motion.header>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
