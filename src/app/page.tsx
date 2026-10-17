import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import SearchDock from "@/components/ui/SearchDock";
import "./home-premium.css";
import "./home-conversion.css";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Discover Nigerian Fashion Designers & Creative Talent | STYLEATLAS",
  description: "Find fashion designers, stylists, bridal specialists, brands and fashion schools across Nigeria. Explore portfolios and connect with the right professionals.",
  alternates: { canonical: "/" },
};

type Business = {
  id: string;
  business_name: string;
  slug: string;
  city: string | null;
  cover_image_url: string | null;
  verification_tier: string | null;
  type: string | null;
  description: string | null;
  is_sponsored?: boolean;
  business_categories?: Array<{ categories?: { name?: string } | null }> | null;
};

const categories = [
  { name: "Fashion designers", slug: "designers", number: "01", detail: "Made for you" },
  { name: "Fashion brands", slug: "brands", number: "02", detail: "Discover labels" },
  { name: "Personal stylists", slug: "stylists", number: "03", detail: "Find your point of view" },
  { name: "Bridal specialists", slug: "bridal", number: "04", detail: "For the occasion" },
  { name: "Photographers", slug: "photographers", number: "05", detail: "Create the image" },
  { name: "Fashion schools", slug: "schools", number: "06", detail: "Learn the craft" },
];
const cities = [
  { name: "Lagos", slug: "lagos" },
  { name: "Abuja", slug: "abuja" },
  { name: "Port Harcourt", slug: "port-harcourt" },
  { name: "Benin City", slug: "benin-city" },
];

export default async function Home() {
  const supabase = createClient();
  const [{ data: approved }, { data: promotions }, { data: recentJobs }, { data: upcomingEvents }] = await Promise.all([
    supabase.from("businesses").select("id,business_name,slug,city,cover_image_url,verification_tier,type,description,business_categories(categories(name))").eq("publication_status", "approved").order("created_at", { ascending: false }).limit(24),
    supabase.from("promoted_campaigns").select("businesses!inner(id,business_name,slug,city,cover_image_url,verification_tier,type,description,business_categories(categories(name)))").eq("status", "active").eq("target_type", "profile").eq("businesses.publication_status", "approved").limit(6),
    supabase.from("jobs").select("id,title,location").eq("is_active", true).order("created_at", { ascending: false }).limit(2),
    supabase.from("events").select("id,title,event_date,location").eq("status", "approved").gte("event_date", new Date().toISOString()).order("event_date", { ascending: true }).limit(2),
  ]);
  // Only show profiles approved for public discovery. Promotion does not override approval.
  const approvedBusinesses = (approved || []) as unknown as Business[];

  const promotedBusinesses = (promotions || []).flatMap((campaign) => {
    const item = campaign.businesses as unknown as Business | Business[] | null;
    return item ? (Array.isArray(item) ? item : [item]) : [];
  });
  const featured: Business[] = Array.from(
    new Map([
      ...promotedBusinesses.map((business) => [business.id, { ...business, is_sponsored: true }] as const),
      ...approvedBusinesses.filter((business) => !promotedBusinesses.some((promoted) => promoted.id === business.id)).map((business) => [business.id, business] as const),
    ]).values()
  ).slice(0, 4);
  const specialty = (business: Business) => business.business_categories?.map((item) => item.categories?.name).filter(Boolean).slice(0, 2).join(" · ") || business.type?.replace(/_/g, " ") || "Fashion professional";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "STYLEATLAS",
    url: "https://www.thestyleatlas.com/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.thestyleatlas.com/directory?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <main className="atlas-home">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="atlas-hero" aria-labelledby="atlas-heading">
        <div className="atlas-hero-layout">
          <div className="atlas-hero-content">
            <p className="atlas-kicker atlas-kicker-light">The Nigerian fashion directory</p>
            <h1 id="atlas-heading">Style begins with <em>the right people.</em></h1>
            <p className="atlas-hero-description">Discover the designers, stylists, brands and creative minds shaping Nigerian fashion. Explore their work. Find your fit. Make the connection.</p>
            <div className="atlas-hero-links">
              <Link href="/directory" className="atlas-button atlas-button-gold">Explore the directory <span aria-hidden="true">↗</span></Link>
              <Link href="/add-business" className="atlas-inline-link atlas-inline-light">For fashion professionals <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="atlas-hero-search"><SearchDock /></div>
          </div>
          <div className="atlas-hero-visual">
            <Image src="/images/hero-editorial.jpg" alt="Contemporary Nigerian fashion editorial" fill priority sizes="(max-width: 800px) 100vw, 48vw" className="atlas-cover" />
            <div className="atlas-hero-image-caption"><span>DISCOVER THE PEOPLE BEHIND THE STYLE</span><span>STYLEATLAS / NIGERIA</span></div>
          </div>
        </div>
        <div className="atlas-hero-bottom"><span>DESIGNERS · BRANDS · STYLISTS · BRIDAL</span><Link href="#discover">Explore what&apos;s inside ↓</Link></div>
      </section>

      <section className="atlas-section atlas-intro" id="discover">
        <div className="atlas-section-header">
          <div><p className="atlas-kicker">01 / Discover</p><h2>Find the expertise <em>you need.</em></h2></div>
          <p>From a made-to-measure outfit to a defining campaign, begin with the people who know the craft.</p>
        </div>
        <div className="atlas-category-list">
          {categories.map((category) => (
            <Link className="atlas-category-item" key={category.slug} href={`/directory?category=${category.slug}`}>
              <span className="atlas-category-number">{category.number}</span>
              <span className="atlas-category-name">{category.name}</span>
              <span className="atlas-category-detail">{category.detail}</span>
              <span className="atlas-category-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="atlas-section atlas-cities">
        <div className="atlas-section-header">
          <div><p className="atlas-kicker">02 / Places</p><h2>Talent is <em>everywhere.</em></h2></div>
          <p>Find fashion professionals close to you, or discover a new creative connection in another city.</p>
        </div>
        <div className="atlas-city-grid">
          {cities.map((city, index) => <Link href={`/directory?city=${city.slug}`} className="atlas-city" key={city.slug}><span>0{index + 1} / NIGERIA</span><strong>{city.name}</strong><span className="atlas-city-link">Explore talent ↗</span></Link>)}
        </div>
      </section>

      <section className="atlas-section atlas-featured">
        <div className="atlas-section-header">
          <div><p className="atlas-kicker">03 / The directory</p><h2>People worth <em>discovering.</em></h2></div>
          <Link href="/directory" className="atlas-inline-link">View all professionals ↗</Link>
        </div>
        {featured.length > 0 ? (
          <div className="atlas-featured-grid">
            {featured.map((business) => (
              <Link className="atlas-profile" href={`/profile/${business.slug}`} key={business.id}>
                <div className="atlas-profile-image">
                  {business.cover_image_url ? <Image src={business.cover_image_url} alt={`Work by ${business.business_name}`} fill sizes="(max-width: 650px) 82vw, (max-width: 1024px) 45vw, 24vw" className="atlas-cover" /> : <div className="atlas-profile-placeholder"><span>STYLEATLAS</span></div>}
                  {business.is_sponsored && <span className="atlas-profile-label">Sponsored</span>}
                </div>
                <div className="atlas-profile-info"><div><h3>{business.business_name}</h3><p>{specialty(business)}</p><p>{business.city || "Nigeria"}{business.verification_tier && business.verification_tier !== "none" ? " · Identity checked" : ""}</p><span className="atlas-profile-action">View profile ↗</span></div><span aria-hidden="true">↗</span></div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="atlas-featured-empty"><h3>Great connections start here.</h3><p>New professional profiles are added as they are approved. Explore the directory or introduce your fashion business.</p><Link className="atlas-button atlas-button-dark" href="/directory">Explore the directory ↗</Link></div>
        )}
      </section>

      <section className="atlas-section atlas-how" aria-labelledby="atlas-how-title"><div className="atlas-section-header"><div><p className="atlas-kicker">04 / The process</p><h2 id="atlas-how-title">Discover. Consider. <em>Connect.</em></h2></div><p>Find the right creative professional without losing sight of their real work and experience.</p></div><div className="atlas-how-grid"><article><span>01</span><h3>Search with purpose</h3><p>Browse by discipline, location or the work you have in mind.</p></article><article><span>02</span><h3>Explore their craft</h3><p>Compare genuine portfolios, services and available business details.</p></article><article><span>03</span><h3>Start a conversation</h3><p>Visit a profile to find available enquiry and contact options.</p></article></div><p className="atlas-how-note">Listings are reviewed before publication. An approved listing is not a guarantee of service quality; identity verification is shown separately where applicable.</p></section>

      <section className="atlas-statement">
        <div className="atlas-statement-photo"><Image src="/images/fashion-studio.jpg" alt="Creative work inside a fashion studio" fill sizes="(max-width: 800px) 100vw, 50vw" className="atlas-cover" /></div>
        <div className="atlas-statement-copy"><p className="atlas-kicker atlas-kicker-light">For the people who make fashion</p><h2>Your work deserves <em>to be found.</em></h2><p>Give your craft a place to be discovered. Build a professional presence, show what makes your work distinctive and connect with people looking for your expertise.</p><div className="atlas-statement-actions"><Link className="atlas-button atlas-button-gold" href="/add-business">List your business ↗</Link><Link className="atlas-inline-link atlas-inline-light" href="/pricing">Explore membership options ↗</Link></div></div>
      </section>

      <section className="atlas-section atlas-editorial">
        <div className="atlas-section-header"><div><p className="atlas-kicker">05 / Beyond the directory</p><h2>More than <em>a listing.</em></h2></div><p>Explore the conversations, opportunities and ideas moving Nigerian fashion forward.</p></div>
        <div className="atlas-editorial-grid">
          <Link href="/journal"><span>READ</span><h3>The Journal</h3><p>Ideas, perspectives and stories from the world of fashion.</p><strong>Explore stories ↗</strong></Link>
          <Link href="/jobs"><span>WORK</span><h3>Fashion careers</h3><p>{recentJobs?.length ? `Latest opportunity: ${recentJobs[0].title}${recentJobs[0].location ? ` · ${recentJobs[0].location}` : ""}` : "Browse fashion career opportunities as businesses publish them."}</p><strong>View opportunities ↗</strong></Link>
          <Link href="/events"><span>CONNECT</span><h3>Events & culture</h3><p>{upcomingEvents?.length ? `Coming up: ${upcomingEvents[0].title}${upcomingEvents[0].location ? ` · ${upcomingEvents[0].location}` : ""}` : "Discover upcoming gatherings as organisers publish approved events."}</p><strong>See events ↗</strong></Link>
        </div>
      </section>
      <section className="atlas-final-cta"><p className="atlas-kicker">YOUR NEXT CONNECTION</p><h2>Find the person who can <em>bring it to life.</em></h2><Link href="/directory" className="atlas-button atlas-button-gold">Discover fashion professionals ↗</Link></section>
    </main>
  );
}
