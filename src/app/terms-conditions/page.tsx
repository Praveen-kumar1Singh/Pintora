import { StaticPageLayout } from '@/components/layout/StaticPageLayout';

export const metadata = { title: 'Terms & Conditions | Printora' };

export default function TermsConditionsPage() {
  return (
    <StaticPageLayout title="Terms & Conditions" lastUpdated="August 12, 2026">
      <h2>Overview</h2>
      <p>This website is operated by Printora. Throughout the site, the terms “we”, “us” and “our” refer to Printora. Printora offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</p>
      
      <h2>Online Store Terms</h2>
      <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.</p>
      
      <h2>General Conditions</h2>
      <p>We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve transmissions over various networks.</p>
      
      <h2>Modifications to the Service and Prices</h2>
      <p>Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.</p>
      
      <h2>Products or Services</h2>
      <p>Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.</p>
    </StaticPageLayout>
  );
}
