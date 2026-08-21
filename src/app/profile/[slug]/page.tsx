import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ProfileActions from "@/components/ui/ProfileActions";
import SaveButton from "@/components/ui/SaveButton";
import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const supabase = createClient();
  const { data: business } = await supabase
    .from("businesses")
    .select("business_name, description, cover_image_url")
    .eq("slug", params.slug)
    .single();

  if (!business) {
    return {
      title: "Profile Not Found - STYLEATLAS",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${business.business_name} | STYLEATLAS`,
    description: business.description || `View the portfolio and services of ${business.business_name} on STYLEATLAS.`,
    openGraph: {
      title: `${business.business_name} | STYLEATLAS`,
      description: business.description || `View the portfolio and services of ${business.business_name} on STYLEATLAS.`,
      images: business.cover_image_url ? [business.cover_image_url, ...previousImages] : previousImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${business.business_name} | STYLEATLAS`,
      description: business.description || `View the portfolio and services of ${business.business_name} on STYLEATLAS.`,
      images: business.cover_image_url ? [business.cover_image_url] : [],
    },
  };
}

export default async function Profile({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: business } = await supabase
    .from("businesses")
    .select(`
      *,
      business_categories ( categories ( name ) ),
      portfolios ( portfolio_media ( * ) ),
      services ( * ),
      reviews ( *, profiles ( first_name, last_name, avatar_url ) )
    `)
    .eq("slug", params.slug)
    .single();

  if (!business) {
    notFound();
  }

  // Extract arrays for easier mapping
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const categories = business.business_categories?.map((bc: any) => bc.categories?.name).filter(Boolean) || [];
  const portfolioMedia = business.portfolios?.[0]?.portfolio_media || [];
  const services = business.services || [];
  const reviews = business.reviews || [];

  return (
    <main>
      <section className="profile-hero">
        <div className="profile-cover relative h-[300px] md:h-[400px]">
          <Image src={business.cover_image_url || "/images/designer-blue.jpg"} alt={`${business.business_name} cover`} fill className="object-cover" priority />
        </div>
        <div className="container profile-summary">
          <div className="profile-avatar relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white bg-gray-100">
            <Image src={business.logo_url || business.cover_image_url || "/images/designer-blue.jpg"} alt={`${business.business_name} logo`} fill className="object-cover" priority />
          </div>
          <div className="profile-title">
            <div className="eyebrow light">Verified profile</div>
            <h1>
              {business.business_name}
              {business.is_verified && (
                <svg className="icon" style={{ display: 'inline', color: '#c69a52', width: '24px', height: '24px', marginLeft: '8px' }}>
                  <use href="/icons/sprite.svg#icon-verified"></use>
                </svg>
              )}
            </h1>
            <p>{business.description || 'Nigerian fashion designer.'}</p>
            <div className="profile-facts">
              <span className="profile-fact"><svg className="icon"><use href="/icons/sprite.svg#icon-pin"></use></svg>{business.city}, {business.state}</span>
              <span className="profile-fact"><svg className="icon"><use href="/icons/sprite.svg#icon-star"></use></svg>{Number(business.rating || 0).toFixed(1)} from {business.review_count || 0} reviews</span>
              {business.starting_price && <span className="profile-fact">From ₦{(business.starting_price) / 1000}k</span>}
            </div>
          </div>
          <div className="profile-actions">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <SaveButton businessId={business.id} businessName={business.business_name} />
            </div>
            <ProfileActions businessId={business.id} businessName={business.business_name} style="hero" />
          </div>
        </div>
      </section>
      
      <nav className="profile-nav">
        <div className="container profile-nav-inner">
          <a className="active" href="#about">Overview</a>
          {portfolioMedia.length > 0 && <a href="#portfolio">Portfolio</a>}
          {services.length > 0 && <a href="#services">Services</a>}
          <a href="#pricing">Pricing guide</a>
          {reviews.length > 0 && <a href="#reviews">Reviews</a>}
          <a href="#faq">FAQs</a>
        </div>
      </nav>

      <section className="section compact">
        <div className="container profile-layout">
          <div className="profile-main">
            <article className="content-card" id="about">
              <span className="eyebrow">The atelier</span>
              <h2>About {business.business_name}</h2>
              <p>{business.description || `Welcome to ${business.business_name}. We pride ourselves on creating exceptional fashion.`}</p>
              
              <div className="tag-row" style={{ marginTop: '20px' }}>
                {categories.map((cat: string, i: number) => (
                  <span key={i} className="tag" style={{ color: '#5d554d', borderColor: '#ded3c5' }}>{cat}</span>
                ))}
              </div>
            </article>

            {portfolioMedia.length > 0 && (
              <article className="content-card" id="portfolio">
                <div className="section-head" style={{ marginBottom: '18px' }}>
                  <div><span className="eyebrow">Selected work</span><h2>Portfolio</h2></div>
                </div>
                <div className="portfolio-grid">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {portfolioMedia.map((media: any) => (
                    <div key={media.id} className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <Image src={media.image_url} alt={media.caption || 'Portfolio image'} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    </div>
                  ))}
                </div>
              </article>
            )}

            {services.length > 0 && (
              <article className="content-card" id="services">
                <span className="eyebrow">What the studio offers</span>
                <h2>Services</h2>
                <div className="service-list">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {services.map((service: any) => (
                    <div className="service-item" key={service.id}>
                      <div>
                        <strong>{service.name}</strong>
                        <p>{service.description}</p>
                      </div>
                      {service.starting_price ? <span>From ₦{service.starting_price / 1000}k</span> : <span>Custom quote</span>}
                    </div>
                  ))}
                </div>
              </article>
            )}

            <article className="content-card" id="pricing">
              <span className="eyebrow">Before you enquire</span>
              <h2>Pricing and timelines</h2>
              <div className="journey-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div>
                  <h3>Typical investment</h3>
                  <p>Starting at ₦{(business.starting_price || 0) / 1000}k, varying greatly depending on fabric, handwork and construction.</p>
                </div>
                <div>
                  <h3>Typical lead time</h3>
                  <p>Allow three to six weeks. Bridal and wardrobe commissions may require eight to twelve weeks.</p>
                </div>
              </div>
            </article>

            {reviews.length > 0 && (
              <article className="content-card" id="reviews">
                <div className="section-head" style={{ marginBottom: '18px' }}>
                  <div><span className="eyebrow">Verified feedback</span><h2>Client reviews</h2></div>
                  <div className="rating" style={{ fontSize: '14px' }}><svg className="icon"><use href="/icons/sprite.svg#icon-star"></use></svg>{Number(business.rating || 0).toFixed(1)} / 5</div>
                </div>
                <div className="review-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {reviews.map((review: any) => (
                    <article className="review-card" key={review.id}>
                      <div className="review-person">
                        <div className="review-avatar relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                          <Image src={review.profiles?.avatar_url || "/images/designer-green.jpg"} alt="Client" fill className="object-cover" />
                        </div>
                        <div><strong>{review.profiles?.first_name || 'Anonymous'}</strong><span>{review.is_verified_purchase ? 'Verified client' : 'Client'}</span></div>
                      </div>
                      <div className="review-stars">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
                      <blockquote>“{review.content}”</blockquote>
                    </article>
                  ))}
                </div>
              </article>
            )}
          </div>

          <aside className="profile-side">
            <div className="contact-card">
              <span className="eyebrow light">Start a conversation</span>
              <h3>Share the occasion, date and budget.</h3>
              <p>A useful first message helps the atelier respond with clearer timing and next steps.</p>
              <ProfileActions businessId={business.id} businessName={business.business_name} style="aside" />
              <div className="contact-meta">
                <div className="contact-line"><svg className="icon"><use href="/icons/sprite.svg#icon-message"></use></svg>Usually replies within 6 hours</div>
                <div className="contact-line"><svg className="icon"><use href="/icons/sprite.svg#icon-pin"></use></svg>{business.city}, {business.state}</div>
              </div>
            </div>

            {!business.is_verified && (
              <div style={{ marginTop: '24px', padding: '24px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'var(--bg-color)' }}>
                <span className="eyebrow" style={{ color: 'var(--gold)' }}>Is this your brand?</span>
                <h4 style={{ margin: '8px 0 12px 0' }}>Claim this profile</h4>
                <p className="muted" style={{ fontSize: '13px', marginBottom: '16px' }}>
                  Manage your portfolio, reply directly to clients, and upgrade your directory presence.
                </p>
                <a href={`/claim-business/${business.slug}`} className="btn btn-outline-dark" style={{ width: '100%', padding: '12px', fontSize: '14px', textAlign: 'center' }}>
                  Claim Profile
                </a>
              </div>
            )}
          </aside>
        </div>
      </section>

      <div className="mobile-sticky-actions">
        <ProfileActions businessId={business.id} businessName={business.business_name} style="mobile" />
      </div>

    </main>
  );
}
