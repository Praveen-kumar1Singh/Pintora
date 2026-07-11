"use client";

import { DataTable } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, MoreHorizontal } from 'lucide-react';

const orderData = [
  { id: 'ORD-5432', customer: 'Rahul Sharma', email: 'rahul@example.com', date: 'Jul 11, 2026', items: 3, total: '₹3,499', status: 'Processing' },
  { id: 'ORD-5431', customer: 'Priya Patel', email: 'priya@example.com', date: 'Jul 10, 2026', items: 1, total: '₹1,299', status: 'Shipped' },
  { id: 'ORD-5430', customer: 'Amit Kumar', email: 'amit@example.com', date: 'Jul 10, 2026', items: 4, total: '₹4,598', status: 'Delivered' },
  { id: 'ORD-5429', customer: 'Sneha Gupta', email: 'sneha@example.com', date: 'Jul 09, 2026', items: 1, total: '₹899', status: 'Cancelled' },
  { id: 'ORD-5428', customer: 'Vikram Singh', email: 'vikram@example.com', date: 'Jul 08, 2026', items: 2, total: '₹2,499', status: 'Delivered' },
];

const columns = [
  { key: 'id', header: 'Order ID', render: (val: string) => <span className="font-bold">{val}</span> },
  { key: 'customer', header: 'Customer' },
  { key: 'email', header: 'Email' },
  { key: 'date', header: 'Date' },
  { key: 'items', header: 'Items' },
  { key: 'total', header: 'Total', render: (val: string) => <span className="font-medium">{val}</span> },
  { key: 'status', header: 'Status', render: (val: string) => (
    <Badge variant={val === 'Delivered' ? 'default' : val === 'Processing' ? 'secondary' : val === 'Shipped' ? 'outline' : 'destructive'}>
      {val}
    </Badge>
  )},
  { key: 'actions', header: '', render: () => (
    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button>
  )},
];

export default function AdminOrders() {
  return (
    <div className="p-6 lg:p-8 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Orders</h1>
          <p className="text-muted-foreground">Manage and track customer orders.</p>
        </div>
        <Button className="uppercase tracking-widest font-bold">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="flex-1">
        <DataTable 
          title="All Orders"
          columns={columns}
          data={orderData}
          searchPlaceholder="Search by ID, Customer, or Email..."
        />
      </div>
    </div>
  );
}
