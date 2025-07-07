'use client';

import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

export default function SEOHead({
  title = "Tunel - European Tech Jobs with Visa Sponsorship",
  description = "Find your dream tech job in Europe! 500+ companies offering visa sponsorship for Turkish developers. React, Node.js, Python, DevOps jobs in Germany, Netherlands, Sweden & more.",
  keywords = ["Turkish developers Europe", "visa sponsorship tech jobs", "software developer jobs Europe"],
  ogImage = "/og-image.jpg",
  canonical
}: SEOHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
}