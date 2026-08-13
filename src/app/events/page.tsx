import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

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

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Featured calendar</span>
              <h2>Plan around the moments shaping the industry.</h2>
            </div>
            <button type="button" className="btn btn-gold">Submit an event</button>
          </div>
          
          <div className="editorial-grid">
            {events && events.map((event) => {
              const date = new Date(event.event_date);
              const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
              return (
                <article className="editorial-card" key={event.id}>
                  <Image src={event.image_url || "/images/hero-editorial.jpg"} alt={event.title} width={600} height={400} />
                  <div className="editorial-copy">
                    <span className="eyebrow">{formattedDate} · {event.location}</span>
                    <h3>{event.title}</h3>
                    {event.description && <p>{event.description}</p>}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section compact section-ivory-2">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Coming next</span>
              <h2>Events you can add to your calendar.</h2>
            </div>
          </div>
          
          <div className="service-hub">
            {events && events.slice(0, 4).map((event) => {
              const date = new Date(event.event_date);
              const shortMonth = date.toLocaleDateString('en-US', { month: 'short' });
              const day = date.getDate().toString().padStart(2, '0');
              return (
                <article className="service-column" key={event.id}>
                  <div className="service-icon">
                    <Icon name="calendar" />
                  </div>
                  <h3>{event.title}</h3>
                  <p>{shortMonth} {day} · {event.location}</p>
                  <div className="mini-list">
                    <div className="mini-item">
                      <span className="mini-thumb" style={{ display: 'grid', placeItems: 'center', background: '#080807', color: '#c69a52', fontWeight: 800 }}>
                        {day}
                      </span>
                      <div>
                        <strong>{event.description?.substring(0, 50) || 'Fashion event'}</strong>
                        <span>Open to the public</span>
                      </div>
                    </div>
                  </div>
                  <Link className="text-link" href="#">
                    View event <Icon name="arrow" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
