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
  description: "Explore verified designers, luxury brands, bridal ateliers, stylists, schools and fashion professionals shaping Nigeria's creative future.",
  openGraph: {
    title: "STYLEATLAS | The Premier Nigerian Fashion Directory",
    description: "Explore verified designers, luxury brands, bridal ateliers, stylists, schools and fashion professionals shaping Nigeria's creative future.",
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

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
