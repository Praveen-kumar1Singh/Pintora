"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Package, MapPin, Heart, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuthStore } from '@/store/useAuthStore';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const navItems = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Orders', href: '/profile/orders', icon: Package },
    { name: 'Addresses', href: '/profile/addresses', icon: MapPin },
    { name: 'Wishlist', href: '/wishlist', icon: Heart },
    { name: 'Settings', href: '/profile/settings', icon: Settings },
  ];

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 lg:px-8 py-12 md:py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">My Account</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name || 'User'}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 shrink-0">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start h-12 ${isActive ? 'bg-foreground text-background font-semibold shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
              <div className="pt-8 mt-8 border-t">
                <Button onClick={logout} variant="ghost" className="w-full justify-start h-12 text-red-500 hover:text-red-600 hover:bg-red-500/10">
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </Button>
              </div>
            </nav>
          </aside>

          {/* Content Area */}
          <div className="flex-1 min-h-[500px]">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
