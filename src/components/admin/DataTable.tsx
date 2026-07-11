"use client";

import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Column {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: any[];
  searchPlaceholder?: string;
}

export function DataTable({ title, columns, data, searchPlaceholder = "Search..." }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Basic filtering mock
  const filteredData = data.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="bg-background rounded-xl border shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-black uppercase tracking-tight">{title}</h2>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9 text-sm bg-muted/50 border-transparent focus-visible:ring-1"
            />
          </div>
          <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto flex-1">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {columns.map(col => (
                <TableHead key={col.key} className="text-xs font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row, i) => (
                <TableRow key={i}>
                  {columns.map(col => (
                    <TableCell key={col.key} className="whitespace-nowrap py-4">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t flex items-center justify-between text-sm text-muted-foreground">
        <div>Showing {filteredData.length} entries</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="w-8 h-8" disabled><ChevronLeft className="w-4 h-4" /></Button>
          <Button variant="outline" size="icon" className="w-8 h-8" disabled><ChevronRight className="w-4 h-4" /></Button>
        </div>
      </div>
    </div>
  );
}
