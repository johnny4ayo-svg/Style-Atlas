import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star, GraduationCap } from '@/components/ui/icons'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export interface School {
  id: string
  slug: string
  school_name: string
  city: string
  cover_image_url?: string
  logo_url?: string
  is_verified?: boolean
  courses_count?: number
  rating?: number
}

interface SchoolCardProps {
  school: School
}

export function SchoolCard({ school }: SchoolCardProps) {
  return (
    <Link href={`/schools/${school.slug}`}>
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300 bg-white border-brand-neutral/20">
        <div className="relative h-48 w-full bg-brand-neutral/10">
          {school.cover_image_url ? (
            <Image
              src={school.cover_image_url}
              alt={school.school_name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <GraduationCap className="h-12 w-12 text-gray-300" />
            </div>
          )}
          {school.is_verified && (
            <Badge className="absolute top-3 right-3 bg-brand-gold text-brand-black font-semibold">
              Verified
            </Badge>
          )}
        </div>
        <CardContent className="p-5 flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-serif text-xl font-bold text-brand-black line-clamp-1">
              {school.school_name}
            </h3>
            {school.rating && (
              <div className="flex items-center gap-1 bg-brand-neutral/10 px-2 py-1 rounded text-sm">
                <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
                <span className="font-medium">{school.rating}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{school.city}</span>
          </div>
        </CardContent>
        <CardFooter className="p-5 pt-0 border-t border-brand-neutral/10 mt-auto flex justify-between items-center text-sm text-gray-600 bg-gray-50/50">
          <span className="flex items-center gap-1.5 font-medium">
            <GraduationCap className="w-4 h-4" />
            {school.courses_count || 0} Courses
          </span>
          <span className="text-brand-gold font-medium hover:underline">
            View Programs &rarr;
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
