import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tunel - European Tech Jobs with Visa Sponsorship for Turkish Developers",
  description: "Find your dream tech job in Europe! Connect with 500+ companies offering visa sponsorship for Turkish developers. React, Node.js, Python, DevOps jobs in Germany, Netherlands, Sweden & more.",
  keywords: [
    "Turkish developers Europe",
    "visa sponsorship tech jobs",
    "software developer jobs Europe",
    "React developer Germany",
    "Node.js jobs Netherlands",
    "Python developer Sweden",
    "DevOps engineer Europe",
    "tech jobs visa sponsorship",
    "European software jobs",
    "developer relocation Europe"
  ],
  authors: [{ name: "Tunel Team" }],
  creator: "Tunel",
  publisher: "Tunel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tunel.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'tr-TR': '/tr',
      'de-DE': '/de',
      'nl-NL': '/nl',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tunel.com',
    title: 'Tunel - European Tech Jobs with Visa Sponsorship',
    description: 'Find your dream tech job in Europe! 500+ companies, visa sponsorship guaranteed for Turkish developers.',
    siteName: 'Tunel',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tunel - European Tech Jobs with Visa Sponsorship',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tunel - European Tech Jobs with Visa Sponsorship',
    description: 'Find your dream tech job in Europe! 500+ companies, visa sponsorship guaranteed.',
    images: ['/twitter-image.jpg'],
    creator: '@tuneljobs',
    site: '@tuneljobs',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
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
        <link rel="canonical" href="https://tunel.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4F46E5" />
        <meta name="msapplication-TileColor" content="#4F46E5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Tunel",
              "description": "European tech jobs with visa sponsorship for Turkish developers",
              "url": "https://tunel.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://tunel.com/jobs?search={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "sameAs": [
                "https://twitter.com/tuneljobs",
                "https://linkedin.com/company/tuneljobs"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Tunel",
              "description": "Connecting Turkish developers with European tech opportunities",
              "url": "https://tunel.com",
              "logo": "https://tunel.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "hello@tunel.com"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            <LanguageProvider>
              <Navigation />
              <main className="min-h-screen">
                {children}
              </main>
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
