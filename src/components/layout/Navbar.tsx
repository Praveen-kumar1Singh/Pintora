"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, Search, User, Heart, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/useCartStore';
import { AnimatedThemeToggler } from '@/registry/magicui/animated-theme-toggler';
import { SearchOverlay } from '../search/SearchOverlay';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { cart, setDrawerOpen } = useCartStore((state: any) => state);
  const cartCount = cart?.lines?.edges?.reduce((acc: number, item: any) => acc + item.node.quantity, 0) || 0;
  
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
  const accountUrl = shopifyDomain ? `https://${shopifyDomain}/account` : '#';

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  const navLinks = [
    { label: "Home", href: "/" },
    { 
      label: "Shop", 
      href: "/shop",
      dropdown: [
        { label: "All Products", href: "/shop" },
        { label: "T-Shirts", href: "/shop?category=t-shirts" },
        { label: "Hoodies", href: "/shop?category=hoodies" },
        { label: "Accessories", href: "/shop?category=accessories" },
      ]
    },
    { label: "New Arrivals", href: "/shop?sort=newest" },
    { label: "Collections", href: "/collections" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-9 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? "px-3 sm:px-6" : "px-3 sm:px-8"
        }`}
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-500 ${
            isScrolled
              ? "max-w-6xl h-14 bg-background/75 backdrop-blur-xl border border-foreground/5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] rounded-full px-4 sm:px-6"
              : "max-w-7xl h-16 bg-transparent px-2 sm:px-4"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="grid place-items-center w-8 h-8 rounded-full bg-foreground text-background text-[10px] font-heading font-bold">PR</div>
            <span className="font-heading font-black uppercase tracking-tighter text-foreground hidden sm:inline text-xl">PRINTORA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 h-full">
            {navLinks.map((l) => (
              <div key={l.label} className="group relative flex items-center h-full">
                <Link
                  href={l.href}
                  className="relative text-[13px] font-bold uppercase tracking-widest text-foreground/80 hover:text-foreground transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full py-2"
                >
                  {l.label}
                </Link>

                {l.dropdown && (
                  <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
                    <div className="bg-background/95 backdrop-blur-xl border border-foreground/10 shadow-xl rounded-2xl p-2 w-48 flex flex-col gap-1">
                      {l.dropdown.map(drop => (
                        <Link 
                          key={drop.label} 
                          href={drop.href}
                          className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:bg-foreground/5 rounded-xl transition-colors text-foreground/80 hover:text-foreground text-center"
                        >
                          {drop.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <AnimatedThemeToggler duration={700} className="hidden sm:grid place-items-center w-9 h-9 rounded-full hover:bg-foreground/5 transition-colors text-foreground" variant="circle" />
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:grid place-items-center w-9 h-9 rounded-full hover:bg-foreground/5 transition-colors" 
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-foreground" />
            </button>
            <Link href={accountUrl} className="hidden sm:grid place-items-center w-9 h-9 rounded-full hover:bg-foreground/5 transition-colors" aria-label="Account">
              <User className="w-4 h-4 text-foreground" />
            </Link>
            <button onClick={() => setDrawerOpen(true)} className="relative grid place-items-center w-9 h-9 rounded-full hover:bg-foreground/5 transition-colors" aria-label="Cart">
              <ShoppingBag className="w-4 h-4 text-foreground" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 grid place-items-center w-4 h-4 rounded-full bg-foreground text-background text-[9px] font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden grid place-items-center w-9 h-9 rounded-full hover:bg-foreground/5" aria-label="Menu">
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="lg:hidden mt-3 mx-auto max-w-6xl bg-background/95 backdrop-blur-xl border border-foreground/5 shadow-xl rounded-3xl p-6"
            >
              <div className="flex flex-col gap-3">
                {navLinks.map((l) => (
                  <Link key={l.label} href={l.href} className="text-base font-bold uppercase tracking-widest py-3 border-b border-foreground/5" onClick={() => setMobileMenuOpen(false)}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* We moved the Announcement bar out of Navbar in the layout ideally, but we can just render it here fixed to the top if needed. Let's make it fixed top-0. */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-foreground text-background text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase overflow-hidden">
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center mx-4 py-2">
              <span className="mx-4">🚚 Free Shipping Over ₹999</span>
              <span className="mx-4">•</span>
              <span className="mx-4">🔥 Limited Summer Drop</span>
              <span className="mx-4">•</span>
              <span className="mx-4">✨ New Collection Live</span>
              <span className="mx-4">•</span>
            </span>
          ))}
        </div>
      </div>
      
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
