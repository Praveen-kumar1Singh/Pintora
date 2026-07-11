"use client";

import { DataTable } from '@/components/admin/DataTable';
import { Button } from '@/components/ui/button';
import { Download, MoreHorizontal } from 'lucide-react';

const customerData = [
  { id: 'CUS-1023', name: 'Rahul Sharma', email: 'rahul@example.com', orders: 12, spent: '₹24,500', joined: 'Jan 2024' },
  { id: 'CUS-1024', name: 'Priya Patel', email: 'priya@example.com', orders: 3, spent: '₹4,200', joined: 'Mar 2024' },
  { id: 'CUS-1025', name: 'Amit Kumar', email: 'amit@example.com', orders: 1, spent: '₹1,299', joined: 'Jul 2026' },
  { id: 'CUS-1026', name: 'Sneha Gupta', email: 'sneha@example.com', orders: 8, spent: '₹15,800', joined: 'Nov 2023' },
];

const columns = [
  { key: 'name', header: 'Name', render: (val: string) => <span className="font-bold">{val}</span> },
  { key: 'email', header: 'Email' },
  { key: 'orders', header: 'Total Orders' },
  { key: 'spent', header: 'Total Spent', render: (val: string) => <span className="font-medium text-primary">{val}</span> },
  { key: 'joined', header: 'Joined Date' },
  { key: 'actions', header: '', render: () => (
    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button>
  )},
];

export default function AdminCustomers() {
  return (
    <div className="p-6 lg:p-8 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Customers</h1>
          <p className="text-muted-foreground">View and manage your customer base.</p>
        </div>
        <Button variant="outline" className="uppercase tracking-widest font-bold">
          <Download className="w-4 h-4 mr-2" /> Export
        </Button>
      </div>

      <div className="flex-1">
        <DataTable 
          title="Customer Directory"
          columns={columns}
          data={customerData}
          searchPlaceholder="Search customers by name or email..."
        />
      </div>
    </div>
  );
}
