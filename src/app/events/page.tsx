export const revalidate = 3600;
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import EmptyState from "@/components/ui/EmptyState";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nigerian Fashion Events | STYLEATLAS",
  description: "Find fashion weeks, workshops, exhibitions, trunk shows, school showcases and business events across Nigeria.",
};
export default async function EventsPage() {
  const supabase = createClient();
  const { data: events } = await supabase
    .from('events')
    .select('*')
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
          <div className="hero-aside-card">
            <strong>{events?.length || 0}</strong>
            <span>upcoming event listings across the platform</span>
          </div>
        </div>
      </section>

      <section className="section compact">
        <div className="container">
          <form className="search-dock" method="GET" action="/events" style={{ position: 'relative', left: 'auto', bottom: 'auto', transform: 'none', width: '100%', margin: '-30px 0 40px' }}>
            <div className="search-row">
              <div className="search-field">
                <Icon name="search" />
                <div>
                  <label>Search events</label>
                  <input name="q" placeholder="Fashion week, exhibition..." />
                </div>
              </div>
              <div className="search-field">
                <Icon name="pin" />
                <div>
                  <label>Location</label>
                  <select name="location">
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
                  <label>When</label>
                  <select name="date">
                    <option value="Any date">Any date</option>
                    <option value="This week">This week</option>
                    <option value="This month">This month</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="search-submit">
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
              <div className="filter-group">
                <h4>Event type</h4>
                <label className="filter-option"><span><input type="checkbox" /> Runway show</span></label>
                <label className="filter-option"><span><input type="checkbox" /> Exhibition</span></label>
                <label className="filter-option"><span><input type="checkbox" /> Pop-up shop</span></label>
                <label className="filter-option"><span><input type="checkbox" /> Trade show</span></label>
                <label className="filter-option"><span><input type="checkbox" /> Workshop</span></label>
              </div>
            </aside>

            <div>
              <div className="results-head">
                <div>
                  <h2>Upcoming events</h2>
                  <span className="muted" style={{ fontSize: '10px' }}>{events?.length || 0} events scheduled</span>
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
                      heading="No verified upcoming events are available yet."
                      supportingText="We are currently reviewing official fashion events across Nigeria. Event organisers can submit an event for editorial verification."
                      primaryButtonLabel="Submit an event"
                      primaryButtonHref="/dashboard/business/events/new"
                      secondaryButtonLabel="Get event updates"
                      secondaryButtonHref="#newsletter"
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
