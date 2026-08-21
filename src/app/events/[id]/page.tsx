import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Clock, ArrowLeft, Ticket } from '@/components/ui/icons';

export default async function SingleEventPage({ params }: { params: { id: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;
  const { data: event } = await supabase
    .from('events')
    .select('*, businesses ( business_name, slug )')
    .eq('id', params.id)
    .single();

  if (!event) {
    notFound();
  }

  const date = new Date(event.event_date);
  const formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <main className="min-h-screen bg-gray-50 pb-20 pt-8">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Back navigation */}
        <Link 
          href="/events"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brand-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Events
        </Link>

        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Hero Image */}
          <div className="w-full h-64 md:h-96 relative bg-brand-neutral/10">
            <Image
              src={event.image_url || "/images/hero-editorial.jpg"}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-8 md:p-10">
            {/* Header Info */}
            <div className="mb-8 border-b border-gray-100 pb-8">
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-brand-black mb-6">
                {event.title}
              </h1>
              
              <div className="flex flex-col md:flex-row gap-6 text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-brand-gold" />
                  <span className="font-medium">{formattedDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-brand-gold" />
                  <span className="font-medium">{time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-brand-gold" />
                  <span className="font-medium">{event.location}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-12">
              {/* Main Content */}
              <div className="flex-grow prose max-w-none text-gray-600">
                <h2 className="font-serif text-2xl font-bold text-brand-black mb-4">About this event</h2>
                <p className="whitespace-pre-line leading-relaxed text-lg">
                  {event.description}
                </p>
                
                {event.businesses && (
                  <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Organized by</p>
                    <Link 
                      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                      href={`/profile/${(event.businesses as any).slug}`}
                      className="font-bold text-lg text-brand-black hover:text-brand-gold transition-colors"
                    >
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {(event.businesses as any).business_name}
                    </Link>
                  </div>
                )}
              </div>

              {/* Sidebar / Ticket Box */}
              <div className="w-full md:w-80 flex-shrink-0">
                <div className="bg-brand-black text-white rounded-xl p-6 shadow-lg sticky top-24">
                  <h3 className="font-serif text-xl font-bold mb-4 flex items-center">
                    <Ticket className="w-5 h-5 mr-2 text-brand-gold" />
                    Registration
                  </h3>
                  
                  <div className="mb-6">
                    <span className="block text-sm text-gray-400 mb-1">Price</span>
                    <span className="text-3xl font-bold text-brand-gold">
                      {event.price && event.price > 0 ? `₦${Number(event.price).toLocaleString()}` : 'Free'}
                    </span>
                  </div>
                  
                  <button className="w-full bg-brand-gold text-brand-black font-bold py-4 px-6 rounded hover:bg-brand-gold/90 transition-colors">
                    Register Now
                  </button>
                  
                  <p className="text-xs text-center text-gray-400 mt-4">
                    Spots are limited. Secure your place today.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
