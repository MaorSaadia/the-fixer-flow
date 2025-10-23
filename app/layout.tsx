// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// Base URL - Update this to your production URL
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://thefixerflow.com";

export const metadata: Metadata = {
  // Basic Metadata
  title: {
    default:
      "The Fixer Flow - Expert Home Improvement Solutions & Product Reviews",
    template: "%s | The Fixer Flow",
  },
  description:
    "Discover expert home improvement tips, honest product reviews, and practical solutions for a smoother, more efficient home. From kitchen gadgets to smart home tech, we've got you covered.",

  // Keywords
  keywords: [
    "home improvement",
    "home gadgets",
    "product reviews",
    "home solutions",
    "kitchen gadgets",
    "smart home",
    "home organization",
    "DIY tips",
    "home efficiency",
    "lifestyle hacks",
  ],

  // Authors
  authors: [
    {
      name: "The Fixer Flow Team",
      url: baseUrl,
    },
  ],

  // Creator
  creator: "The Fixer Flow",
  publisher: "The Fixer Flow",

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "The Fixer Flow",
    title: "The Fixer Flow - Expert Home Improvement Solutions",
    description:
      "Discover expert home improvement tips, honest product reviews, and practical solutions for a smoother, more efficient home.",
    images: [
      {
        url: `${baseUrl}/og-image.png`, // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "The Fixer Flow - Home Improvement Solutions",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@thefixerflow", // Update with your Twitter handle
    creator: "@thefixerflow",
    title: "The Fixer Flow - Expert Home Improvement Solutions",
    description:
      "Discover expert home improvement tips, honest product reviews, and practical solutions for a smoother home.",
    images: [`${baseUrl}/og-image.png`], // You'll need to create this image
  },

  // Verification (Add when you have accounts)
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },

  // Alternate Languages (if you plan to add more languages)
  alternates: {
    canonical: baseUrl,
    // languages: {
    //   'es-ES': `${baseUrl}/es`,
    //   'fr-FR': `${baseUrl}/fr`,
    // },
  },

  // Category
  category: "Home & Garden",

  // Additional Metadata
  other: {
    "pinterest-site-verification": "", // Add when you have Pinterest
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> */}

        {/* Theme Color */}
        <meta
          name="theme-color"
          content="#f59e0b"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#0f172a"
          media="(prefers-color-scheme: dark)"
        />

        {/* Web Manifest */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="container mx-auto p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
