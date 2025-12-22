// app/layout.tsx — FINAL & ERROR-FREE
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import { AuthProvider } from "@/lib/AuthProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Metrofolk - Renewable Energy Solutions",
    default: "Metrofolk - Renewable Energy Solutions in Nigeria",
  },
  description: "Affordable solar and electrical power solutions for homes and businesses in Nigeria.",
  openGraph: {
    images: "/images/hero-bg.jpg",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://metrofolk.com"),
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Metrofolk Limited",
  "url": "https://metrofolk.org",
  "logo": "https://metrofolk.org/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+234-705-069-8372", 
    "contactType": "Customer Service",
    "areaServed": "NG"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lagos",
    "addressCountry": "NG"
  },
  "sameAs": [
    "https://facebook.com/metrofolk",
    "https://instagram.com/metrofolk",
    "https://twitter.com/metrofolk"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <CartProvider>
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <Toaster richColors position="bottom-center" />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}