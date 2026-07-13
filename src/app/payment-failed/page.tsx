import { Suspense } from 'react';
import { PaymentFailedClient } from './PaymentFailedClient';
import { Loader2 } from 'lucide-react';

export const metadata = {
  title: 'Payment Failed | Printora',
  description: 'There was an issue processing your payment.',
};

export default function PaymentFailedPage() {
  return (
    <div className="bg-background min-h-screen pt-14">
      <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
        <PaymentFailedClient />
      </Suspense>
    </div>
  );
}
