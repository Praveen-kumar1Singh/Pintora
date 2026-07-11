"use client";

import { Settings2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function ComingSoonModule() {
  const pathname = usePathname();
  const moduleName = pathname.split('/').pop()?.replace('-', ' ') || 'Module';

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center text-center p-6">
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
        <Settings2 className="w-10 h-10 text-muted-foreground animate-spin-slow" />
      </div>
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-4 capitalize">
        {moduleName} Module
      </h1>
      <p className="text-muted-foreground max-w-md">
        This module is currently under development. The data table layout and API integrations will be available in the next release.
      </p>
    </div>
  );
}
