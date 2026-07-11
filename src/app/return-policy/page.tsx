import { StaticPageLayout } from '@/components/layout/StaticPageLayout';

export const metadata = { title: 'Return & Exchange Policy | Printora' };

export default function ReturnPolicyPage() {
  return (
    <StaticPageLayout title="Return & Exchange Policy" lastUpdated="August 12, 2026">
      <h2>Our Return Policy</h2>
      <p>We accept returns up to 14 days after delivery, if the item is unused and in its original condition, and we will refund the full order amount minus the shipping costs for the return.</p>
      
      <h2>Exchanges</h2>
      <p>The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.</p>
      
      <h2>Exceptions / Non-returnable items</h2>
      <p>Certain types of items cannot be returned, like custom products (such as special orders or personalized items), and personal care goods (such as innerwear). Please get in touch if you have questions or concerns about your specific item.</p>
      
      <h2>Damaged or Defective Items</h2>
      <p>In the event that your order arrives damaged in any way, please email us as soon as possible at support@printora.com with your order number and a photo of the item's condition. We address these on a case-by-case basis but will try our best to work towards a satisfactory solution.</p>
    </StaticPageLayout>
  );
}
