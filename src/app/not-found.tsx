import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-9xl md:text-[15rem] font-black uppercase tracking-tighter text-foreground mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-widest mb-6">
        Drop Not Found
      </h2>
      <p className="text-muted-foreground max-w-lg mb-10 text-sm md:text-base leading-relaxed">
        The piece you're looking for doesn't exist or has been moved. 
        Don't worry, there's plenty more heat where that came from.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/shop">
          <Button size="lg" className="w-full sm:w-auto uppercase tracking-widest font-bold">
            Explore All Products
          </Button>
        </Link>
        <Link href="/">
          <Button size="lg" variant="outline" className="w-full sm:w-auto uppercase tracking-widest font-bold border-2">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
