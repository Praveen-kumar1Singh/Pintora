import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { CartDrawer } from '@/components/cart/CartDrawer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' });

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Printora | Premium E-Commerce',
    template: '%s | Printora',
  },
  description: 'Premium clothing crafted for the modern individual. Discover our exclusive collections of oversized tees, hoodies, and accessories.',
  keywords: ['fashion', 'streetwear', 'premium clothing', 'oversized tees', 'hoodies', 'printora'],
  authors: [{ name: 'Printora' }],
  creator: 'Printora',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://printora.example.com',
    title: 'Printora | Premium E-Commerce',
    description: 'Premium clothing crafted for the modern individual. Discover our exclusive collections.',
    siteName: 'Printora',
    images: [
      {
        url: 'https://printora.example.com/og-image.jpg', // Placeholder
        width: 1200,
        height: 630,
        alt: 'Printora Storefront',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Printora | Premium E-Commerce',
    description: 'Premium clothing crafted for the modern individual.',
    images: ['https://printora.example.com/og-image.jpg'],
    creator: '@printora',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans min-h-screen flex flex-col antialiased selection:bg-primary selection:text-primary-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow pt-24 md:pt-18">
            {children}
          </main>
          <Footer />
          <BottomNav />
          <CartDrawer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
