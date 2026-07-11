"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, ShoppingCart, Package, Tags, Users, Box, 
  Ticket, FileText, Star, TrendingUp, Bell, Settings 
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Categories', href: '/admin/categories', icon: Tags },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Inventory', href: '/admin/inventory', icon: Box },
  { label: 'Coupons', href: '/admin/coupons', icon: Ticket },
  { label: 'Blogs', href: '/admin/blogs', icon: FileText },
  { label: 'Reviews', href: '/admin/reviews', icon: Star },
  { label: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
  { label: 'Revenue Charts', href: '/admin/revenue', icon: TrendingUp },
  { label: 'Notifications', href: '/admin/notifications', icon: Bell },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-background border-r h-screen sticky top-0 flex flex-col hidden lg:flex shrink-0">
      <div className="h-16 flex items-center px-6 border-b shrink-0">
        <Link href="/admin" className="text-xl font-black uppercase tracking-tighter">
          Printora Admin
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
