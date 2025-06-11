import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/Providers'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Discover China - Your Ultimate Travel Guide',
  description: 'Explore China\'s incredible destinations, rich culture, and unforgettable experiences. Your trusted companion for traveling in China.',
  keywords: 'China travel, tourism, attractions, travel guide, Beijing, Shanghai, Great Wall, China vacation, Chinese culture, travel tips China, China destinations, China itinerary, things to do China, China sightseeing, best places China, China adventure, traditional China, modern China, China history, China food, China hotels, China transportation, China visa, China weather',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Discover China',
  },
  openGraph: {
    title: 'Discover China - Your Ultimate Travel Guide',
    description: 'Explore China\'s incredible destinations, rich culture, and unforgettable experiences.',
    url: 'https://discoverchina.com',
    siteName: 'Discover China',
    images: [
      {
        url: '/images/hero-great-wall-large.jpg',
        width: 1200,
        height: 630,
        alt: 'Great Wall of China'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discover China - Your Ultimate Travel Guide',
    description: 'Explore China\'s incredible destinations, rich culture, and unforgettable experiences.',
    images: ['/images/hero-great-wall-large.jpg'],
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const ga_id = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Serif+SC:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#dc2626" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Discover China" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-BBBBVNMHG4"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BBBBVNMHG4');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Discover China",
              "alternateName": "Discover China - Your Ultimate Travel Guide",
              "url": "https://discoverchina.com",
              "description": "Explore China's incredible destinations, rich culture, and unforgettable experiences. Your trusted companion for traveling in China.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://discoverchina.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Discover China",
                "url": "https://discoverchina.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://explorechina.top/icons/icon-512.svg"
                }
              },
              "mainEntity": {
                "@type": "TravelAgency",
                "name": "Discover China",
                "description": "Expert travel guides and comprehensive information for exploring China",
                "areaServed": {
                  "@type": "Country",
                  "name": "China"
                }
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}