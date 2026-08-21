
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@/lib/supabase/server'
import { SchoolCard } from '@/components/ui/SchoolCard'
import { MapPin, Search } from '@/components/ui/icons'
import Link from 'next/link'

export const metadata = {
  title: 'Fashion Schools | STYLEATLAS',
  description: 'Discover the top fashion schools, academies, and training programs in Nigeria.',
}

export default async function SchoolsPage({
  searchParams,
}: {
  searchParams: { q?: string; city?: string }
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any
  
  // Base query
  let query = supabase.from('schools').select('*')
  
  // Apply filters if they exist
  if (searchParams.q) {
    query = query.ilike('school_name', `%${searchParams.q}%`)
  }
  if (searchParams.city && searchParams.city !== 'All Cities') {
    query = query.eq('city', searchParams.city)
  }

  const { data: schools, error } = await query.order('is_verified', { ascending: false }).order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching schools:', error)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="bg-brand-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
            Fashion Schools & Academies
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Start your journey in the fashion industry. Discover top-rated design schools, tailoring academies, and fashion business programs across Nigeria.
          </p>
          
          {/* Search Bar Placeholder (Basic implementation) */}
          <div className="flex flex-col md:flex-row max-w-3xl mx-auto bg-white rounded-lg p-2 gap-2 shadow-xl">
            <div className="flex-1 flex items-center bg-gray-50 rounded px-4 py-3">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input 
                type="text" 
                placeholder="Search for a school or program..." 
                className="bg-transparent border-none outline-none w-full text-brand-black placeholder:text-gray-400"
                defaultValue={searchParams.q}
              />
            </div>
            <div className="flex-1 flex items-center bg-gray-50 rounded px-4 py-3 md:border-l border-gray-200">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <select className="bg-transparent border-none outline-none w-full text-brand-black appearance-none cursor-pointer">
                <option value="All Cities">All Cities</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Port Harcourt">Port Harcourt</option>
              </select>
            </div>
            <button className="bg-brand-gold text-brand-black font-semibold px-8 py-3 rounded hover:bg-brand-gold/90 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold font-serif text-brand-black">
            {schools?.length ? `Found ${schools.length} Schools` : 'All Schools'}
          </h2>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-500 font-medium">Sort by:</span>
            <select className="border border-gray-200 rounded p-2 outline-none">
              <option>Recommended</option>
              <option>Newest</option>
              <option>Verified First</option>
            </select>
          </div>
        </div>

        {schools && schools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((school: any) => (
              <SchoolCard key={school.id} school={school} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-xl border border-gray-100 shadow-sm">
            <GraduationCap className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold font-serif text-brand-black mb-2">No schools found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              We couldn&apos;t find any fashion schools matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <Link 
              href="/schools"
              className="inline-block bg-brand-black text-white px-6 py-3 rounded font-medium hover:bg-gray-800 transition-colors"
            >
              Clear Filters
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

function GraduationCap(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.42 10.922a2 2 0 0 1-.019 3.01l-7.06 7.158a2 2 0 0 1-2.825 0L4.456 13.931a2 2 0 0 1 0-2.828l7.06-7.06a2 2 0 0 1 2.828 0z" />
      <path d="m22 10-6 6" />
      <path d="m11 14 3-3" />
      <path d="M2 18v-4" />
      <path d="m2 22 2-4" />
      <path d="M22 22l-2-4" />
      <path d="M22 18v-4" />
    </svg>
  )
}
