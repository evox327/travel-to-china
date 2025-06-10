'use client'

import Script from 'next/script'

interface GoogleAnalyticsProps {
  ga_id: string
}

const GoogleAnalytics = ({ ga_id }: GoogleAnalyticsProps) => {
  // 使用硬编码的 Google Analytics ID 以确保在静态导出中工作
  const analyticsId = 'G-BBBBVNMHG4'
  
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${analyticsId}');
        `}
      </Script>
    </>
  )
}

export default GoogleAnalytics