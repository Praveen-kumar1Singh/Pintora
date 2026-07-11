"use client";

import { DataTable } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

const productData = [
  { id: 'PRD-001', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=200', name: 'Essential Heavyweight Tee', category: 'T-Shirts', price: '₹1,299', stock: 145, status: 'Active' },
  { id: 'PRD-002', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=200', name: 'Premium Drop Shoulder Hoodie', category: 'Hoodies', price: '₹2,499', stock: 32, status: 'Active' },
  { id: 'PRD-003', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=200', name: 'Vintage Wash Graphic Tee', category: 'T-Shirts', price: '₹1,499', stock: 0, status: 'Out of Stock' },
  { id: 'PRD-004', image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=200', name: 'Cargo Parachute Pants', category: 'Bottoms', price: '₹2,999', stock: 89, status: 'Active' },
];

const columns = [
  { key: 'image', header: '', render: (val: string, row: any) => (
    <div className="w-12 h-16 bg-muted rounded relative overflow-hidden">
      <Image src={val} alt={row.name} fill className="object-cover" />
    </div>
  )},
  { key: 'name', header: 'Product Name', render: (val: string) => <span className="font-bold">{val}</span> },
  { key: 'category', header: 'Category' },
  { key: 'price', header: 'Price' },
  { key: 'stock', header: 'Stock', render: (val: number) => (
    <span className={val === 0 ? 'text-destructive font-bold' : val < 50 ? 'text-orange-500 font-bold' : ''}>{val} in stock</span>
  )},
  { key: 'status', header: 'Status', render: (val: string) => (
    <Badge variant={val === 'Active' ? 'default' : 'destructive'}>{val}</Badge>
  )},
  { key: 'actions', header: '', render: () => (
    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button>
  )},
];

export default function AdminProducts() {
  return (
    <div className="p-6 lg:p-8 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Products</h1>
          <p className="text-muted-foreground">Manage your store catalog and inventory.</p>
        </div>
        <Button className="uppercase tracking-widest font-bold">
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      <div className="flex-1">
        <DataTable 
          title="All Products"
          columns={columns}
          data={productData}
          searchPlaceholder="Search products by name or SKU..."
        />
      </div>
    </div>
  );
}
