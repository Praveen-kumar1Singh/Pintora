import Link from 'next/link';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Order Successful | Printora' };

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-background p-8 rounded-2xl border shadow-lg text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. Your order number is <span className="font-bold text-foreground">PRN-12345</span>. 
          We'll send you a shipping confirmation email as soon as your order ships.
        </p>
        
        <div className="space-y-4">
          <Link href="/track-order" className="block w-full">
            <Button className="w-full h-12 uppercase tracking-widest font-bold">
              <Package className="w-4 h-4 mr-2" /> Track Order
            </Button>
          </Link>
          <Link href="/shop" className="block w-full">
            <Button variant="outline" className="w-full h-12 uppercase tracking-widest font-bold">
              Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
