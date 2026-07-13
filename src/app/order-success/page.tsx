import { Suspense } from 'react';
import { getProducts } from '@/lib/shopify';
import { OrderSuccessClient } from './OrderSuccessClient';
import { Loader2 } from 'lucide-react';

export const metadata = {
  title: 'Order Success | Printora',
  description: 'Your order was placed successfully.',
};

export default async function OrderSuccessPage() {
  const recommendedProducts = await getProducts({ sortKey: 'BEST_SELLING', reverse: false });
  const products = recommendedProducts.slice(0, 4);

  return (
    <div className="bg-background min-h-screen pt-14">
      <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
        <OrderSuccessClient recommendedProducts={products} />
      </Suspense>
    </div>
  );
}
