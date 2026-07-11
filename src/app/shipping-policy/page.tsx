import { StaticPageLayout } from '@/components/layout/StaticPageLayout';

export const metadata = { title: 'Shipping Policy | Printora' };

export default function ShippingPolicyPage() {
  return (
    <StaticPageLayout title="Shipping Policy" lastUpdated="August 12, 2026">
      <h2>Order Processing</h2>
      <p>All orders are processed within 1 to 2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.</p>
      
      <h2>Domestic Shipping Rates and Estimates</h2>
      <p>Shipping charges for your order will be calculated and displayed at checkout. We offer free standard shipping on all domestic orders over ₹1499.</p>
      <ul>
        <li><strong>Standard Shipping:</strong> 3-5 business days (Free over ₹1499, otherwise ₹99)</li>
        <li><strong>Express Shipping:</strong> 1-2 business days (₹199)</li>
      </ul>
      
      <h2>International Shipping</h2>
      <p>We currently offer international shipping to select countries. Shipping charges and delivery times vary by destination and will be calculated at checkout.</p>
      
      <h2>How do I check the status of my order?</h2>
      <p>When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.</p>
    </StaticPageLayout>
  );
}
