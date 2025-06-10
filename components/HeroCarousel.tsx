'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselSlide {
  id: number
  image: string
  title: string
  subtitle: string
  overlay?: string // 覆盖层颜色
}

interface HeroCarouselProps {
  slides: CarouselSlide[]
  autoPlay?: boolean
  interval?: number
  showControls?: boolean
  showIndicators?: boolean
  className?: string
}

const HeroCarousel = ({
  slides,
  autoPlay = true,
  interval = 5000,
  showControls = true,
  showIndicators = true,
  className = ''
}: HeroCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // 自动播放
  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  if (!slides || slides.length === 0) {
    return (
      <div className={`relative h-96 bg-gradient-to-r from-blue-600 to-purple-700 ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome</h1>
            <p className="text-xl opacity-90">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`hero-carousel relative h-96 md:h-[500px] overflow-hidden ${className}`}>
      {/* 轮播图片 */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'hero-slide-active opacity-100' : 'opacity-0'
            }`}
          >
            {/* 背景图片 */}
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`
              }}
            />
            
            {/* 覆盖层 */}
            <div 
              className={`absolute inset-0 ${
                slide.overlay || 'bg-black bg-opacity-40'
              }`}
            />
            
            {/* 内容 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 控制按钮 */}
      {showControls && slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="carousel-control absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="carousel-control absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* 指示器 */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`carousel-indicator w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? 'active bg-white'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* 幻灯片计数器 */}
      {slides.length > 1 && (
        <div className="absolute top-6 right-6 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {currentSlide + 1} / {slides.length}
        </div>
      )}
    </div>
  )
}

export default HeroCarousel