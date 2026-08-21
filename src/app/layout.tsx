import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "STYLEATLAS | The Premier Nigerian Fashion Directory",
  description: "Find the best fashion designers, boutiques, tailors, and bridal experts in Nigeria. Browse verified reviews, portfolios, and contact local fashion businesses directly.",
  openGraph: {
    title: "STYLEATLAS | The Premier Nigerian Fashion Directory",
    description: "Find the best fashion designers, boutiques, tailors, and bridal experts in Nigeria. Browse verified reviews, portfolios, and contact local fashion businesses directly.",
    url: 'https://styleatlas.com',
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
      </body>
    </html>
  );
}
