"use client";

import { StatCard } from '@/components/admin/StatCard';
import { IndianRupee, ShoppingCart, MousePointerClick, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trafficData = [
  { name: 'Mon', visitors: 4000, pageviews: 8400 },
  { name: 'Tue', visitors: 3000, pageviews: 6398 },
  { name: 'Wed', visitors: 2000, pageviews: 9800 },
  { name: 'Thu', visitors: 2780, pageviews: 3908 },
  { name: 'Fri', visitors: 1890, pageviews: 4800 },
  { name: 'Sat', visitors: 2390, pageviews: 3800 },
  { name: 'Sun', visitors: 3490, pageviews: 4300 },
];

export default function AdminAnalytics() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter">Analytics</h1>
        <p className="text-muted-foreground">Detailed metrics and performance data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Conversion Rate" value="3.24%" icon={MousePointerClick} trend="+0.4%" trendDirection="up" />
        <StatCard title="Avg. Order Value" value="₹2,450" icon={IndianRupee} trend="+12%" trendDirection="up" />
        <StatCard title="Cart Abandonment" value="68.2%" icon={ShoppingCart} trend="-2.4%" trendDirection="down" />
        <StatCard title="Bounce Rate" value="42.1%" icon={TrendingUp} trend="+1.2%" trendDirection="up" />
      </div>

      <div className="bg-background p-6 rounded-xl border shadow-sm">
        <h2 className="text-lg font-black uppercase tracking-tight mb-6">Traffic Overview (This Week)</h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trafficData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip 
                cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
              />
              <Bar dataKey="pageviews" name="Page Views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="visitors" name="Unique Visitors" fill="hsl(var(--primary)/0.3)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
