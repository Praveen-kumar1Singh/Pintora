import { StaticPageLayout } from '@/components/layout/StaticPageLayout';

export const metadata = { title: 'Privacy Policy | Printora' };

export default function PrivacyPolicyPage() {
  return (
    <StaticPageLayout title="Privacy Policy" lastUpdated="August 12, 2026">
      <h2>Introduction</h2>
      <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from Printora.com (the "Site").</p>
      
      <h2>Personal Information We Collect</h2>
      <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.</p>
      <p>Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.</p>
      
      <h2>How Do We Use Your Personal Information?</h2>
      <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).</p>
      
      <h2>Sharing Your Personal Information</h2>
      <p>We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store. We also use Google Analytics to help us understand how our customers use the Site.</p>
      
      <h2>Your Rights</h2>
      <p>If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.</p>
    </StaticPageLayout>
  );
}
