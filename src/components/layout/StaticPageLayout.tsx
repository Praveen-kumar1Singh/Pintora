import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface StaticPageLayoutProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function StaticPageLayout({ title, lastUpdated, children }: StaticPageLayoutProps) {
  return (
    <div className="pb-24 pt-12 md:pt-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-12">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          
          <div className="mb-12 border-b pb-8">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">{title}</h1>
            {lastUpdated && (
              <p className="text-muted-foreground uppercase tracking-widest text-sm font-bold">
                Last Updated: {lastUpdated}
              </p>
            )}
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-primary">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
