import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({ 
  icon, 
  title, 
  description, 
  actionLabel, 
  actionHref, 
  onAction 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 h-full min-h-[300px]">
      {icon && (
        <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center text-muted-foreground mb-6">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold uppercase tracking-wider mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-8 text-sm">{description}</p>
      
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button size="lg" className="uppercase tracking-widest font-bold">
            {actionLabel}
          </Button>
        </Link>
      )}

      {actionLabel && onAction && !actionHref && (
        <Button size="lg" className="uppercase tracking-widest font-bold" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
