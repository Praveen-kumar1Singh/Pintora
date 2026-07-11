"use client";

import { Search, Bell, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function AdminTopNav() {
  return (
    <header className="h-16 bg-background border-b flex items-center justify-between px-4 lg:px-8 shrink-0 sticky top-0 z-10">
      <div className="flex items-center flex-1 gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search orders, products, customers..." 
            className="w-full pl-9 bg-muted/50 border-transparent focus-visible:ring-1"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
        </Button>
        <div className="w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center font-bold text-xs uppercase tracking-widest cursor-pointer">
          AD
        </div>
      </div>
    </header>
  );
}
