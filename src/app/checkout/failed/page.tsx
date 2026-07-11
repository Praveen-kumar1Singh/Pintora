import Link from 'next/link';
import { XCircle, RefreshCcw, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = { title: 'Payment Failed | Printora' };

export default function CheckoutFailedPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-background p-8 rounded-2xl border shadow-lg text-center">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-destructive" />
        </div>
        
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Payment Failed</h1>
        <p className="text-muted-foreground mb-8">
          We couldn't process your payment. Please check your payment details and try again, or use a different payment method. No charges were made to your account.
        </p>
        
        <div className="space-y-4">
          <Link href="/checkout" className="block w-full">
            <Button className="w-full h-12 uppercase tracking-widest font-bold">
              <RefreshCcw className="w-4 h-4 mr-2" /> Try Again
            </Button>
          </Link>
          <Link href="/contact" className="block w-full">
            <Button variant="outline" className="w-full h-12 uppercase tracking-widest font-bold">
              <HeadphonesIcon className="w-4 h-4 mr-2" /> Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
