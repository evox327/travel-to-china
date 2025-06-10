'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  MapPin, Users, Award, Globe, Heart, Camera, 
  Star, CheckCircle, ArrowRight, Mail, Phone
} from 'lucide-react'

const AboutPage = () => {
  const stats = [
    { label: 'Destinations Covered', value: '500+', icon: MapPin },
    { label: 'Happy Travelers', value: '1M+', icon: Users },
    { label: 'Expert Guides', value: '1000+', icon: Award },
    { label: 'Countries Served', value: '50+', icon: Globe }
  ]

  const features = [
    {
      icon: Heart,
      title: 'Passionate Local Experts',
      description: 'Our team consists of passionate travelers and local experts who know China inside and out.'
    },
    {
      icon: Camera,
      title: 'Authentic Experiences',
      description: 'We focus on authentic, immersive experiences that go beyond typical tourist attractions.'
    },
    {
      icon: Star,
      title: 'Quality Guaranteed',
      description: 'Every guide and recommendation is carefully curated to ensure the highest quality experience.'
    },
    {
      icon: Globe,
      title: 'Multi-language Support',
      description: 'Available in 10+ languages to serve travelers from around the world.'
    }
  ]

  const team = [
    {
      name: 'Li Wei',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: '15+ years in travel industry, passionate about showcasing China\'s beauty to the world.'
    },
    {
      name: 'Sarah Chen',
      role: 'Head of Content',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'Travel writer and photographer, author of 20+ comprehensive China travel guides.'
    },
    {
      name: 'Michael Zhang',
      role: 'Cultural Expert',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'Cultural historian specializing in Chinese traditions, cuisine, and local customs.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                About Discover China
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                Your trusted companion for exploring China's incredible destinations, 
                rich culture, and unforgettable experiences since 2018.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <stat.icon className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We believe that travel is more than just visiting places – it's about 
                  connecting with cultures, creating memories, and expanding horizons. 
                  Our mission is to make China accessible to travelers from around the world.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Founded in 2018, Discover China has helped over one million travelers 
                  experience the authentic beauty of China, from the iconic Great Wall 
                  to hidden local gems that only insiders know about.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span className="text-gray-700">Expert-curated travel guides</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span className="text-gray-700">Real traveler reviews and photos</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span className="text-gray-700">24/7 travel support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span className="text-gray-700">Multi-language platform</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 lg:mt-0">
                <img
                  src="https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Great Wall of China"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose Discover China
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We're more than just a travel website – we're your gateway to experiencing 
                the real China with confidence and excitement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our passionate team of travel experts, writers, and cultural specialists 
                work tirelessly to bring you the best China travel experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-red-600 font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-10 w-10 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Authenticity</h3>
                <p className="text-gray-600 leading-relaxed">
                  We showcase the real China – from bustling metropolises to quiet villages, 
                  ensuring authentic cultural experiences for every traveler.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Community</h3>
                <p className="text-gray-600 leading-relaxed">
                  Building a global community of China enthusiasts who share experiences, 
                  tips, and create lasting connections through travel.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Excellence</h3>
                <p className="text-gray-600 leading-relaxed">
                  Committed to providing the highest quality content, recommendations, 
                  and support to ensure exceptional travel experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-red-600 to-red-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your China Adventure?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join millions of travelers who trust Discover China for their 
              journey through the Middle Kingdom.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/attractions"
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold transition-colors inline-flex items-center space-x-2"
              >
                <span>Explore Attractions</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="/guides"
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 rounded-full text-lg font-semibold transition-colors"
              >
                Browse Travel Guides
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Get in Touch
              </h2>
              
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex items-center space-x-3">
                  <Mail className="h-6 w-6 text-red-600" />
                  <span className="text-gray-700">info@discoverchina.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6 text-red-600" />
                  <span className="text-gray-700">+86 400-123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default AboutPage