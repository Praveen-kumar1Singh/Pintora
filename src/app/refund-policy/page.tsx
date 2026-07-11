import { StaticPageLayout } from '@/components/layout/StaticPageLayout';

export const metadata = { title: 'Refund Policy | Printora' };

export default function RefundPolicyPage() {
  return (
    <StaticPageLayout title="Refund Policy" lastUpdated="August 12, 2026">
      <h2>Refund Process</h2>
      <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
      
      <h2>Approved Refunds</h2>
      <p>If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within 5-7 business days.</p>
      
      <h2>Late or Missing Refunds</h2>
      <p>If you haven’t received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted.</p>
      <p>Next contact your bank. There is often some processing time before a refund is posted. If you’ve done all of this and you still have not received your refund yet, please contact us at support@printora.com.</p>
      
      <h2>Sale Items</h2>
      <p>Only regular priced items may be refunded, unfortunately sale items cannot be refunded unless they are defective or damaged upon arrival.</p>
    </StaticPageLayout>
  );
}
