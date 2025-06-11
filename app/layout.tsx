import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/Providers'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Discover China - Your Ultimate Travel Guide',
  description: 'Explore China\'s incredible destinations, rich culture, and unforgettable experiences. Your trusted companion for traveling in China.',
  keywords: 'China travel, tourism, attractions, travel guide, Beijing, Shanghai, Great Wall',
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
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" href="/favicon.ico" />
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
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}