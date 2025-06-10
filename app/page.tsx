'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeaturedAttractions from '@/components/FeaturedAttractions'
import TravelGuides from '@/components/TravelGuides'
import Footer from '@/components/Footer'
import PWAInstallPrompt from '@/components/PWAInstallPrompt'
import PWAManager from '@/components/PWAManager'

export default function Home() {
  return (
    <main className="min-h-screen">
      <PWAManager />
      <Header />
      <Hero />
      <FeaturedAttractions />
      <TravelGuides />
      <Footer />
      <PWAInstallPrompt />
    </main>
  )
}