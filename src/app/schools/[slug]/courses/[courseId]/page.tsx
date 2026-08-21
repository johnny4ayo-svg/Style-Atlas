/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ChevronLeft, Clock, GraduationCap, Calendar, CheckCircle } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export async function generateMetadata({ params }: { params: { slug: string, courseId: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any
  const { data: course } = await supabase
    .from('courses')
    .select('title, description')
    .eq('id', params.courseId)
    .single()

  if (!course) return { title: 'Course Not Found | STYLEATLAS' }

  return {
    title: `${course.title} | STYLEATLAS`,
    description: course.description,
  }
}

export default async function CoursePage({ params }: { params: { slug: string, courseId: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any

  const { data: course, error } = await supabase
    .from('courses')
    .select('*, school:schools(school_name, slug)')
    .eq('id', params.courseId)
    .single()

  if (error || !course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-8">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Back navigation */}
        <Link 
          href={`/schools/${params.slug}`}
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brand-black mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to {course.school.school_name}
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="p-8 md:p-10 border-b border-gray-100 bg-brand-black text-white">
            <Badge className="bg-brand-gold text-brand-black mb-4 font-bold border-none hover:bg-brand-gold/90">
              {course.program_level}
            </Badge>
            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
              {course.title}
            </h1>
            <p className="text-gray-400 font-medium flex items-center gap-2">
              Offered by <span className="text-white underline decoration-brand-gold underline-offset-4">{course.school.school_name}</span>
            </p>
          </div>

          {/* Quick Facts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-b border-gray-100 bg-gray-50/50">
            <div className="p-6 border-r border-b md:border-b-0 border-gray-100 flex flex-col items-center justify-center text-center">
              <Clock className="w-6 h-6 text-brand-gold mb-2" />
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Duration</span>
              <span className="font-bold text-brand-black">{course.duration}</span>
            </div>
            <div className="p-6 border-r md:border-b-0 border-gray-100 flex flex-col items-center justify-center text-center">
              <GraduationCap className="w-6 h-6 text-brand-gold mb-2" />
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Format</span>
              <span className="font-bold text-brand-black capitalize">{course.teaching_format}</span>
            </div>
            <div className="p-6 border-r border-b md:border-b-0 border-gray-100 flex flex-col items-center justify-center text-center">
              <Calendar className="w-6 h-6 text-brand-gold mb-2" />
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Level</span>
              <span className="font-bold text-brand-black capitalize">{course.program_level}</span>
            </div>
            <div className="p-6 flex flex-col items-center justify-center text-center">
              <span className="font-serif text-2xl font-bold text-brand-gold mb-1">
                {course.tuition_fee ? `₦${Number(course.tuition_fee).toLocaleString()}` : 'Contact for Info'}
              </span>
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Tuition Fee</span>
            </div>
          </div>

          {/* Details */}
          <div className="p-8 md:p-10">
            <div className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-brand-black mb-4">Course Description</h2>
              <div className="prose max-w-none text-gray-600">
                <p className="whitespace-pre-line leading-relaxed">{course.description}</p>
              </div>
            </div>

            {course.entry_requirements && (
              <div className="mb-10 p-6 bg-brand-neutral/5 rounded-xl border border-brand-neutral/10">
                <h3 className="font-bold text-brand-black mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-brand-gold" />
                  Entry Requirements
                </h3>
                <p className="text-gray-600 whitespace-pre-line text-sm">
                  {course.entry_requirements}
                </p>
              </div>
            )}

            {/* Action Area */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-gray-100">
              <Button className="flex-1 bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-bold py-6 text-lg">
                Enroll Now
              </Button>
              <Button variant="outline" className="flex-1 py-6 text-lg border-gray-300">
                Request Syllabus
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
