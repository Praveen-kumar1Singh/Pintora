"use client";

import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: "How long does shipping take?",
    answer: "Domestic orders typically arrive within 3-5 business days. Express shipping options (1-2 days) are available at checkout. International shipping varies by destination but usually takes 7-14 business days."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times are calculated at checkout based on your location."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 14-day return window for unworn, unwashed items in their original condition with tags attached. Please visit our Returns page to initiate a return."
  },
  {
    question: "Are your clothes true to size?",
    answer: "Our standard collections fit true to size. However, our 'Oversized' collections are designed to have a loose, dropped-shoulder fit. If you prefer a standard fit for those items, we recommend sizing down. Please refer to our Size Guide for exact measurements."
  },
  {
    question: "How do I track my order?",
    answer: "Once your order ships, you will receive a tracking link via email. You can also track your order by entering your Order ID and Email on our Track Order page."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, Amex), UPI, Net Banking, and select digital wallets through our secure payment gateway."
  }
];

export default function FAQPage() {
  return (
    <StaticPageLayout title="Frequently Asked Questions">
      <div className="not-prose mt-8">
        <Accordion className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-bold text-lg hover:no-underline hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </StaticPageLayout>
  );
}
