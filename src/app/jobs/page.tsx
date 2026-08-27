
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import EmptyState from "@/components/ui/EmptyState";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Nigerian Fashion Jobs | STYLEATLAS",
  description: "Find career opportunities in the Nigerian fashion industry. Apply for roles in design, retail, marketing, tailoring and production.",
  alternates: {
    canonical: '/jobs'
  },
  openGraph: {
    url: '/jobs'
  }
};
export default async function JobsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const supabase = createClient();
  
  const query = searchParams.q?.toLowerCase() || '';
  const locationFilter = searchParams.location || 'All cities';
  const typeFilter = searchParams.type || 'All types';

  let dbQuery = supabase
    .from('jobs')
    .select('*, businesses!inner( business_name, address_city )')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (query) {
    // We search the title or description for the query
    dbQuery = dbQuery.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
  }
  
  if (locationFilter !== 'All cities') {
    dbQuery = dbQuery.ilike('location', `%${locationFilter}%`);
  }

  // Map the visual "type" to the DB enum if selected
  if (typeFilter !== 'All types') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dbType = typeFilter.toLowerCase().replace(' ', '-') as any;
    dbQuery = dbQuery.eq('type', dbType);
  }

  const { data: jobs, error } = await dbQuery;
  
  if (error) console.error("Jobs fetch error:", error);

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
              <span>Fashion jobs</span>
            </div>
            <span className="eyebrow light">Work in fashion</span>
            <h1 className="page-title">Find the role where your craft becomes part of something bigger.</h1>
            <p>Explore jobs in design, production, styling, retail, education, media and fashion operations.</p>
          </div>
          <div className="hero-aside-card">
            <strong>{jobs?.length || 0}</strong>
            <span>active roles across Nigerian fashion businesses and schools</span>
          </div>
        </div>
      </section>

      <section className="section compact">
        <div className="container">
          <form className="search-dock" method="GET" action="/jobs" style={{ position: 'relative', left: 'auto', bottom: 'auto', transform: 'none', width: '100%', margin: '-30px 0 40px' }}>
            <div className="search-row">
              <div className="search-field">
                <Icon name="search" />
                <div>
                  <label htmlFor="job-search-input">Role or skill</label>
                  <input type="search" id="job-search-input" name="q" defaultValue={query} placeholder="Pattern cutter, stylist, retail manager..." />
                </div>
              </div>
              <div className="search-field">
                <Icon name="pin" />
                <div>
                  <label htmlFor="job-location-select">Location</label>
                  <select id="job-location-select" name="location" defaultValue={locationFilter}>
                    <option value="All cities">All cities</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>
              <div className="search-field">
                <Icon name="briefcase" />
                <div>
                  <label htmlFor="job-type-select">Work type</label>
                  <select id="job-type-select" name="type" defaultValue={typeFilter}>
                    <option value="All types">All types</option>
                    <option value="Full time">Full time</option>
                    <option value="Part time">Part time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="search-submit" aria-label="Search jobs">
                <Icon name="search" />
              </button>
            </div>
          </form>

          <div className="directory-layout">
            <aside className="filter-panel">
              <div className="filter-head">
                <h3>Filter roles</h3>
                <button type="button" className="filter-reset">Clear</button>
              </div>
              <div className="filter-group">
                <h4>Department</h4>
                <label className="filter-option" htmlFor="dept-design"><span><input type="checkbox" id="dept-design" name="department" value="design" /> Design</span></label>
                <label className="filter-option" htmlFor="dept-production"><span><input type="checkbox" id="dept-production" name="department" value="production" /> Production</span></label>
                <label className="filter-option" htmlFor="dept-retail"><span><input type="checkbox" id="dept-retail" name="department" value="retail" /> Retail</span></label>
                <label className="filter-option" htmlFor="dept-marketing"><span><input type="checkbox" id="dept-marketing" name="department" value="marketing" /> Marketing</span></label>
              </div>
              <div className="filter-group">
                <h4>Experience</h4>
                <label className="filter-option" htmlFor="exp-entry"><span><input type="checkbox" id="exp-entry" name="experience" value="entry" /> Entry level</span></label>
                <label className="filter-option" htmlFor="exp-mid"><span><input type="checkbox" id="exp-mid" name="experience" value="mid" /> Mid level</span></label>
                <label className="filter-option" htmlFor="exp-senior"><span><input type="checkbox" id="exp-senior" name="experience" value="senior" /> Senior</span></label>
              </div>
            </aside>

            <div>
              <div className="results-head">
                <div>
                  <h2>Open roles</h2>
                  <span className="muted" style={{ fontSize: '10px' }}>{jobs?.length || 0} opportunities</span>
                </div>
                <button type="button" className="btn btn-gold">Post a fashion job</button>
              </div>
              
              <div className="service-list">
                {jobs && jobs.length > 0 ? jobs.map((job) => (
                  <article className="service-item" key={job.id}>
                    <div>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <span className="eyebrow" style={{ fontSize: '8px' }}>{(job.businesses as any)?.business_name} · {(job.businesses as any)?.address_city || 'Nigeria'}</span>
                      <h3 style={{ fontFamily: 'var(--serif)', fontSize: '25px', margin: '4px 0' }}>{job.title}</h3>
                      <p>{job.description}</p>
                      <div className="tag-row">
                        <span className="tag" style={{ color: '#5d554d', borderColor: '#ded3c5' }}>{job.type}</span>
                        <span className="tag" style={{ color: '#5d554d', borderColor: '#ded3c5' }}>{job.location}</span>
                        {job.salary_range && <span className="tag" style={{ color: '#5d554d', borderColor: '#ded3c5' }}>{job.salary_range}</span>}
                      </div>
                    </div>
                    <Link className="btn btn-outline-dark btn-sm" href={`/jobs/${job.id}`}>View role</Link>
                  </article>
                )) : (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <EmptyState 
                      heading="No jobs available"
                      supportingText="There are currently no active fashion jobs that match your criteria. Check back later or sign up for job alerts."
                      primaryButtonLabel="Clear Filters"
                      primaryButtonHref="/jobs"
                      secondaryButtonLabel="Get job alerts"
                      secondaryButtonHref="/#newsletter-email"
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
