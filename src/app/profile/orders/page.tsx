import Link from 'next/link';
import { Package, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function OrdersPage() {
  const mockOrders = [
    {
      id: 'ORD-5489',
      date: 'Aug 12, 2026',
      total: 3499,
      status: 'Delivered',
      items: 2,
    },
    {
      id: 'ORD-5321',
      date: 'Jul 24, 2026',
      total: 1299,
      status: 'In Transit',
      items: 1,
    },
    {
      id: 'ORD-4912',
      date: 'May 10, 2026',
      total: 4598,
      status: 'Delivered',
      items: 3,
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold uppercase tracking-wider mb-8">Order History</h2>
      
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="border p-6 rounded-lg bg-card flex flex-col md:flex-row gap-6 md:items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                <Package className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{order.id}</h3>
                <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-8 md:gap-12">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Total</p>
                <p className="font-medium">₹{order.total}</p>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Items</p>
                <p className="font-medium">{order.items}</p>
              </div>
              <div>
                <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className="uppercase tracking-wider">
                  {order.status}
                </Badge>
              </div>
              <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-foreground">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button variant="outline" className="uppercase tracking-widest font-semibold px-8 h-12">
          Load More Orders
        </Button>
      </div>
    </div>
  );
}
