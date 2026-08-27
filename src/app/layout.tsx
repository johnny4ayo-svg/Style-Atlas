import type { Metadata, Viewport } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.thestyleatlas.com'),
  title: "STYLEATLAS | Find Nigerian Fashion Designers and Brands",
  description: "Discover Nigerian fashion professionals as verified profiles are added. Explore designers, brands, schools, jobs, events and STYLEATLAS editorial updates.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "STYLEATLAS | Find Nigerian Fashion Designers and Brands",
    description: "Discover Nigerian fashion professionals as verified profiles are added. Explore designers, brands, schools, jobs, events and STYLEATLAS editorial updates.",
    url: 'https://www.thestyleatlas.com/',
    siteName: 'STYLEATLAS',
    images: [
      {
        url: '/images/hero-editorial.jpg',
        width: 1200,
        height: 630,
        alt: 'STYLEATLAS',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "STYLEATLAS",
    description: "The Premier Nigerian Fashion Directory.",
    images: ['/images/hero-editorial.jpg'],
  },
};

import { Header } from "@/components/layout/AppHeader";
import { Footer } from "@/components/layout/AppFooter";
import { CartProvider } from "@/components/CartProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${outfit.variable} font-sans antialiased`}
      >
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
        
        {/* Basic analytics tracking */}
        <script dangerouslySetInnerHTML={{
          __html: `
            window.trackEvent = function(eventName, eventData) {
              // Basic event tracking implementation
              console.log('[Analytics Event]', eventName, eventData);
              // In production, this would send to PostHog, GA4, or custom endpoint
              if (window.gtag) {
                window.gtag('event', eventName, eventData);
              }
            };
            
            // Track pageviews
            document.addEventListener('DOMContentLoaded', () => {
              window.trackEvent('page_view', { path: window.location.pathname });
            });
            
            // Track clicks on primary CTAs
            document.addEventListener('click', (e) => {
              const target = e.target.closest('a.btn, button.btn');
              if (target) {
                window.trackEvent('cta_click', {
                  text: target.innerText,
                  href: target.href || 'button'
                });
              }
            });
            // Error monitoring
            window.addEventListener('error', (event) => {
              window.trackEvent('client_error', { message: event.message, filename: event.filename });
            });
            window.addEventListener('unhandledrejection', (event) => {
              window.trackEvent('client_unhandled_rejection', { reason: String(event.reason) });
            });
          `
        }} />
      </body>
    </html>
  );
}
