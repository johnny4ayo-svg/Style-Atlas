/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, CheckCircle, GraduationCap, Clock, Globe, Mail, Phone } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any
  const { data: school } = await supabase
    .from('schools')
    .select('school_name, description')
    .eq('slug', params.slug)
    .single()

  if (!school) return { title: 'School Not Found | STYLEATLAS' }

  return {
    title: `${school.school_name} | Fashion Schools in Nigeria | STYLEATLAS`,
    description: school.description || `View fashion courses and details for ${school.school_name} on STYLEATLAS.`,
  }
}

export default async function SingleSchoolPage({ params }: { params: { slug: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any

  // Fetch school details
  const { data: school, error } = await supabase
    .from('schools')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !school) {
    notFound()
  }

  // Fetch courses for this school
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .eq('school_id', school.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Cover */}
      <div className="w-full h-64 md:h-80 relative bg-brand-neutral/10">
        {school.cover_image_url ? (
          <Image
            src={school.cover_image_url}
            alt={`${school.school_name} cover`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-brand-black" />
        )}
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Column (Main Info) */}
          <div className="w-full md:w-2/3">
            {/* Header Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-24 h-24 md:w-32 md:h-32 relative bg-gray-100 rounded-lg overflow-hidden border-4 border-white shadow-sm flex-shrink-0">
                  {school.logo_url ? (
                    <Image
                      src={school.logo_url}
                      alt={`${school.school_name} logo`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                      <GraduationCap className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap gap-2 items-center mb-2">
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-black">
                      {school.school_name}
                    </h1>
                    {school.is_verified && (
                      <Badge className="bg-brand-gold text-brand-black font-semibold ml-2">
                        <CheckCircle className="w-3 h-3 mr-1" /> Verified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-gray-600 mb-6 text-sm">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                      {school.city}, {school.state}
                    </div>
                    {school.accreditation_info && (
                      <div className="flex items-center">
                        <Badge variant="outline" className="text-gray-600">
                          {school.accreditation_info}
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="bg-brand-black text-white hover:bg-gray-800">
                      Contact School
                    </Button>
                    <Button variant="outline" className="border-gray-200">
                      Save to Favourites
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8 border border-gray-100">
              <h2 className="font-serif text-2xl font-bold text-brand-black mb-4">About</h2>
              <div className="prose max-w-none text-gray-600">
                {school.description ? (
                  <p className="whitespace-pre-line">{school.description}</p>
                ) : (
                  <p className="italic text-gray-400">No description provided yet.</p>
                )}
              </div>
              
              {school.facilities && school.facilities.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-bold text-brand-black mb-3">Facilities & Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {school.facilities.map((facility: string) => (
                      <Badge key={facility} variant="secondary" className="bg-gray-100 text-gray-700">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Courses Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-2xl font-bold text-brand-black">Programs & Courses</h2>
                <Badge variant="outline">{courses?.length || 0} available</Badge>
              </div>

              {courses && courses.length > 0 ? (
                <div className="space-y-4">
                  {courses.map((course: any) => (
                    <Link key={course.id} href={`/schools/${school.slug}/courses/${course.id}`}>
                      <div className="group block border border-gray-200 rounded-lg p-5 hover:border-brand-gold transition-colors hover:shadow-md bg-gray-50/50">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg text-brand-black group-hover:text-brand-gold transition-colors">
                            {course.title}
                          </h3>
                          <Badge variant="outline" className="bg-white">{course.program_level}</Badge>
                        </div>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                          {course.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1 text-gray-400" />
                            {course.duration}
                          </div>
                          <div className="flex items-center">
                            <GraduationCap className="w-4 h-4 mr-1 text-gray-400" />
                            <span className="capitalize">{course.teaching_format}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 border border-dashed border-gray-200 rounded-lg">
                  No courses listed yet.
                </div>
              )}
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-24">
              <h3 className="font-serif text-lg font-bold text-brand-black mb-4">Contact Information</h3>
              <div className="space-y-4 text-sm">
                {school.address && (
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 text-brand-gold flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{school.address}, {school.city}, {school.state}</span>
                  </div>
                )}
                {school.contact_phone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-brand-gold flex-shrink-0" />
                    <span className="text-gray-600">{school.contact_phone}</span>
                  </div>
                )}
                {school.contact_email && (
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-brand-gold flex-shrink-0" />
                    <a href={`mailto:${school.contact_email}`} className="text-brand-black hover:underline">{school.contact_email}</a>
                  </div>
                )}
                {school.website_url && (
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-3 text-brand-gold flex-shrink-0" />
                    <a href={school.website_url} target="_blank" rel="noopener noreferrer" className="text-brand-black hover:underline">
                      Visit Website
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <Button className="w-full bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold mb-3">
                  Request Brochure
                </Button>
                <p className="text-xs text-center text-gray-400">
                  Typically responds within 24 hours
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
