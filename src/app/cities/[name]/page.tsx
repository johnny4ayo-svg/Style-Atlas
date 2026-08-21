/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import BusinessCard from '@/components/ui/BusinessCard'
import { SchoolCard } from '@/components/ui/SchoolCard'
import Link from 'next/link'
import { MapPin, ArrowRight } from '@/components/ui/icons'

// Pre-defined list of supported cities to ensure valid routing
const SUPPORTED_CITIES = [
  'lagos', 'abuja', 'port-harcourt', 'benin-city', 'ibadan', 
  'enugu', 'calabar', 'kano', 'kaduna', 'uyo', 'warri', 'abeokuta'
]

// Helper to format city name for display (e.g., 'port-harcourt' -> 'Port Harcourt')
const formatCityName = (slug: string) => {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export async function generateMetadata({ params }: { params: { name: string } }) {
  if (!SUPPORTED_CITIES.includes(params.name.toLowerCase())) {
    return { title: 'City Not Found | STYLEATLAS' }
  }
  const cityName = formatCityName(params.name)
  return {
    title: `Fashion in ${cityName} | Designers, Brands & Schools | STYLEATLAS`,
    description: `Discover the top fashion designers, brands, tailors, and fashion schools based in ${cityName}, Nigeria.`,
  }
}

export default async function CityLandingPage({ params }: { params: { name: string } }) {
  if (!SUPPORTED_CITIES.includes(params.name.toLowerCase())) {
    notFound()
  }

  const cityName = formatCityName(params.name)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any

  // Fetch businesses in this city
  const { data: businesses } = await supabase
    .from('businesses')
    .select('*')
    .ilike('city', cityName)
    .limit(6)
    .order('is_verified', { ascending: false })
    .order('created_at', { ascending: false })

  // Fetch schools in this city
  const { data: schools } = await supabase
    .from('schools')
    .select('*')
    .ilike('city', cityName)
    .limit(3)
    .order('is_verified', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* City Hero */}
      <div className="bg-brand-black text-white py-20 md:py-32 relative overflow-hidden">
        {/* Abstract city pattern background could go here */}
        <div className="absolute inset-0 opacity-10 bg-[url('/brand/pattern.svg')] bg-repeat" />
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center justify-center bg-brand-gold/20 text-brand-gold px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <MapPin className="w-4 h-4 mr-2" />
            City Guide
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
            Fashion in {cityName}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Discover the premier designers, luxury brands, expert tailors, and fashion schools operating in {cityName}.
          </p>
          
          <div className="flex justify-center gap-4">
            <Link 
              href={`/directory?city=${cityName}`}
              className="bg-brand-gold text-brand-black px-8 py-3 rounded font-bold hover:bg-brand-gold/90 transition-colors"
            >
              Browse Directory
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        
        {/* Featured Businesses Section */}
        <div className="mb-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-serif text-3xl font-bold text-brand-black mb-2">Featured Professionals</h2>
              <p className="text-gray-500">Top-rated designers and brands in {cityName}</p>
            </div>
            <Link 
              href={`/directory?city=${cityName}`} 
              className="hidden md:flex items-center text-brand-gold font-bold hover:underline"
            >
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {businesses && businesses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business: any) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 mb-4">No verified professionals listed in {cityName} yet.</p>
              <Link 
                href="/add-business"
                className="text-brand-gold font-bold hover:underline"
              >
                Are you a fashion professional in {cityName}? Join now
              </Link>
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <Link 
              href={`/directory?city=${cityName}`} 
              className="inline-flex items-center text-brand-gold font-bold hover:underline"
            >
              View all professionals <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Schools Section */}
        <div className="mb-10">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-serif text-3xl font-bold text-brand-black mb-2">Fashion Schools</h2>
              <p className="text-gray-500">Learn fashion design, styling, and business in {cityName}</p>
            </div>
            <Link 
              href={`/schools?city=${cityName}`} 
              className="hidden md:flex items-center text-brand-gold font-bold hover:underline"
            >
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {schools && schools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schools.map((school: any) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-xl border border-gray-100 shadow-sm">
              <p className="text-gray-500">No fashion schools listed in {cityName} yet.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
