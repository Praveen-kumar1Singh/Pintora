"use client";

import { Users, IndianRupee, ShoppingBag, Eye } from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';
import { DataTable } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { name: 'Jan', total: 120000 },
  { name: 'Feb', total: 150000 },
  { name: 'Mar', total: 180000 },
  { name: 'Apr', total: 140000 },
  { name: 'May', total: 220000 },
  { name: 'Jun', total: 280000 },
  { name: 'Jul', total: 310000 },
];

const recentOrders = [
  { id: 'ORD-5432', customer: 'Rahul Sharma', date: 'Jul 11, 2026', total: '₹3,499', status: 'Processing' },
  { id: 'ORD-5431', customer: 'Priya Patel', date: 'Jul 10, 2026', total: '₹1,299', status: 'Shipped' },
  { id: 'ORD-5430', customer: 'Amit Kumar', date: 'Jul 10, 2026', total: '₹4,598', status: 'Delivered' },
  { id: 'ORD-5429', customer: 'Sneha Gupta', date: 'Jul 09, 2026', total: '₹899', status: 'Cancelled' },
];

const columns = [
  { key: 'id', header: 'Order ID', render: (val: string) => <span className="font-bold">{val}</span> },
  { key: 'customer', header: 'Customer' },
  { key: 'date', header: 'Date' },
  { key: 'total', header: 'Total', render: (val: string) => <span className="font-medium">{val}</span> },
  { key: 'status', header: 'Status', render: (val: string) => (
    <Badge variant={val === 'Delivered' ? 'default' : val === 'Processing' ? 'secondary' : val === 'Shipped' ? 'outline' : 'destructive'}>
      {val}
    </Badge>
  )},
];

export default function AdminDashboard() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="₹12.4M" icon={IndianRupee} trend="+14.2%" trendDirection="up" />
        <StatCard title="Active Orders" value="1,245" icon={ShoppingBag} trend="+5.4%" trendDirection="up" />
        <StatCard title="New Customers" value="842" icon={Users} trend="-2.1%" trendDirection="down" />
        <StatCard title="Store Views" value="45.2K" icon={Eye} trend="+12.5%" trendDirection="up" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="xl:col-span-2 bg-background p-6 rounded-xl border shadow-sm">
          <h2 className="text-lg font-black uppercase tracking-tight mb-6">Revenue Over Time</h2>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                  formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="xl:col-span-1 flex flex-col">
          <DataTable 
            title="Recent Orders" 
            columns={columns} 
            data={recentOrders} 
            searchPlaceholder="Search orders..."
          />
        </div>
      </div>
    </div>
  );
}
