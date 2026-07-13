import { redirect } from 'next/navigation';

export default function AccountOrdersRedirect() {
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
  if (!shopifyDomain) {
    return <div className="p-20 text-center">Account features are currently unavailable. Please check configuration.</div>;
  }
  
  redirect(`https://${shopifyDomain}/account/orders`);
}
