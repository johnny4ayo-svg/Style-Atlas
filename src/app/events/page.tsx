
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import EmptyState from "@/components/ui/EmptyState";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Nigerian Fashion Events | STYLEATLAS",
  description: "Discover upcoming fashion shows, masterclasses, exhibitions and networking events in the Nigerian fashion industry.",
  alternates: {
    canonical: '/events'
  },
  openGraph: {
    url: '/events'
  }
};
export default async function EventsPage() {
  const supabase = createClient();
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'approved')
    .gte('event_date', new Date().toISOString())
    .order('event_date', { ascending: true });

  const Icon = ({ name }: { name: string }) => (
    <svg className="icon" aria-hidden="true">
      <use href={`/icons/sprite.svg#icon-${name}`}></use>
    </svg>
  );

  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Fashion events</span>
            </div>
            <span className="eyebrow light">Where fashion gathers</span>
            <h1 className="page-title">Runways, rooms and conversations worth showing up for.</h1>
            <p>Find fashion weeks, workshops, exhibitions, trunk shows, school showcases and business events across Nigeria.</p>
          </div>
          {events && events.length > 0 && (
            <div className="hero-aside-card">
              <strong>{events.length}</strong>
              <span>upcoming event listings across the platform</span>
            </div>
          )}
        </div>
      </section>

      <section className="section compact">
        <div className="container">
          <form className="search-dock" method="GET" action="/events" style={{ position: 'relative', left: 'auto', bottom: 'auto', transform: 'none', width: '100%', margin: '-30px 0 40px' }}>
            <div className="search-row">
              <div className="search-field">
                <Icon name="search" />
                <div>
                  <label htmlFor="event-search-input">Search events</label>
                  <input type="search" id="event-search-input" name="q" placeholder="Fashion week, exhibition..." />
                </div>
              </div>
              <div className="search-field">
                <Icon name="pin" />
                <div>
                  <label htmlFor="event-location-select">Location</label>
                  <select id="event-location-select" name="location">
                    <option value="All cities">All cities</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Port Harcourt">Port Harcourt</option>
                  </select>
                </div>
              </div>
              <div className="search-field">
                <Icon name="calendar" />
                <div>
                  <label htmlFor="event-date-select">When</label>
                  <select id="event-date-select" name="date">
                    <option value="Any date">Any date</option>
                    <option value="This week">This week</option>
                    <option value="This month">This month</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="search-submit" aria-label="Search events">
                <Icon name="search" />
              </button>
            </div>
          </form>

          <div className="directory-layout">
            <aside className="filter-panel">
              <div className="filter-head">
                <h3>Filter events</h3>
                <button type="button" className="filter-reset">Clear</button>
              </div>
              <fieldset className="filter-group" style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend><h4 style={{ margin: 0, paddingBottom: '16px' }}>Event type</h4></legend>
                <label className="filter-option" htmlFor="type-runway"><span><input type="checkbox" id="type-runway" name="event_type" value="runway" /> Runway show</span></label>
                <label className="filter-option" htmlFor="type-exhibition"><span><input type="checkbox" id="type-exhibition" name="event_type" value="exhibition" /> Exhibition</span></label>
                <label className="filter-option" htmlFor="type-popup"><span><input type="checkbox" id="type-popup" name="event_type" value="popup" /> Pop-up shop</span></label>
                <label className="filter-option" htmlFor="type-tradeshow"><span><input type="checkbox" id="type-tradeshow" name="event_type" value="tradeshow" /> Trade show</span></label>
                <label className="filter-option" htmlFor="type-workshop"><span><input type="checkbox" id="type-workshop" name="event_type" value="workshop" /> Workshop</span></label>
              </fieldset>
            </aside>

            <div>
              <div className="results-head">
                <div>
                  <h2>Upcoming events</h2>
                  {events && events.length > 0 && <span className="muted" style={{ fontSize: '10px' }}>{events.length} events scheduled</span>}
                </div>
                <button type="button" className="btn btn-gold">Submit an event</button>
              </div>
              
              <div className="service-list">
                {events && events.length > 0 ? events.map((event) => {
                  const date = new Date(event.event_date);
                  const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                  return (
                    <article className="service-item" key={event.id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '24px', alignItems: 'start' }}>
                      <div className="event-media" style={{ width: '100%', aspectRatio: '1', position: 'relative', borderRadius: '8px', overflow: 'hidden', background: '#f5f5f5' }}>
                        <Image src={event.image_url || "/images/hero-editorial.jpg"} alt={event.title} fill style={{ objectFit: 'cover' }} />
                      </div>
                      <div>
                        <span className="eyebrow" style={{ fontSize: '10px' }}>{formattedDate}</span>
                        <h3 style={{ fontFamily: 'var(--serif)', fontSize: '25px', margin: '4px 0' }}>{event.title}</h3>
                        <p>{event.description}</p>
                        <div className="tag-row">
                          <span className="tag" style={{ color: '#5d554d', borderColor: '#ded3c5' }}><Icon name="pin" /> {event.location}</span>
                        </div>
                      </div>
                    </article>
                  );
                }) : (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <EmptyState 
                      heading="NO VERIFIED EVENTS ARE AVAILABLE YET"
                      supportingText="We're reviewing fashion events before publishing them on STYLEATLAS. If you're organising a verified runway show, exhibition, workshop or industry gathering, you can submit it for review."
                      primaryButtonLabel="Submit an event"
                      primaryButtonHref="/dashboard/business/events/new"
                      secondaryButtonLabel="Get event updates"
                      secondaryButtonHref="#newsletter-email"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
