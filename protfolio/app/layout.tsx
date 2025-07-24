import React from "react";
import Navbar from "../components/navbar";
import "../styles/globals.css";
import Head from "next/head";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        {/* Dynamic SEO Meta Tags - replace content as needed or use a helper for dynamic values */}
        <title>Modern Business Portfolio</title>
        <meta name="description" content="Showcasing professionalism, innovation, and modern design principles." />
        <link rel="canonical" href="https://yourdomain.com/" />
        {/* Open Graph */}
        <meta property="og:title" content="Modern Business Portfolio" />
        <meta property="og:description" content="Showcasing professionalism, innovation, and modern design principles." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Modern Business Portfolio" />
        <meta name="twitter:description" content="Showcasing professionalism, innovation, and modern design principles." />
        <meta name="twitter:image" content="https://yourdomain.com/og-image.jpg" />
        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Modern Business Portfolio',
          url: 'https://yourdomain.com/',
          description: 'Showcasing professionalism, innovation, and modern design principles.'
        }) }} />
        {/* Google Analytics 4 (replace G-XXXXXXX with your ID) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXX');
        `}} />
      </Head>
      <body className="bg-gradient-to-br from-gray-50 to-blue-100 min-h-screen">
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
} 