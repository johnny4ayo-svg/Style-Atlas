import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function JobPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: job } = await supabase
    .from('jobs')
    .select('*, businesses ( business_name, slug, address_city, description )')
    .eq('id', params.id)
    .single();

  if (!job) {
    notFound();
  }

  const Icon = ({ name }: { name: string }) => (
    <svg className="icon" aria-hidden="true">
      <use href={`/icons/sprite.svg#icon-${name}`}></use>
    </svg>
  );

  return (
    <main>
      <section className="page-hero" style={{ padding: '60px 0', borderBottom: '1px solid #eaeaea' }}>
        <div className="container">
          <div className="breadcrumb" style={{ marginBottom: '24px' }}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/jobs">Jobs</Link>
            <span>/</span>
            <span>{job.title}</span>
          </div>

          <div style={{ maxWidth: '800px' }}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Link href={`/profile/${(job.businesses as any)?.slug}`} className="eyebrow" style={{ color: 'var(--color-primary)' }}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(job.businesses as any)?.business_name}
            </Link>
            <h1 style={{ fontSize: '42px', margin: '16px 0' }}>{job.title}</h1>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '24px' }}>
              <span className="tag" style={{ border: '1px solid #ddd', background: '#fff', padding: '8px 16px' }}><Icon name="briefcase" /> {job.type}</span>
              <span className="tag" style={{ border: '1px solid #ddd', background: '#fff', padding: '8px 16px' }}><Icon name="pin" /> {job.location}</span>
              {job.salary_range && <span className="tag" style={{ border: '1px solid #ddd', background: '#fff', padding: '8px 16px' }}>{job.salary_range}</span>}
              <span className="tag" style={{ border: '1px solid #ddd', background: '#fff', padding: '8px 16px' }}>Posted {new Date(job.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '64px' }}>
          <div>
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>About the Role & Requirements</h2>
              <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#444', whiteSpace: 'pre-wrap' }}>{job.description}</p>
            </div>
          </div>

          <aside>
            <div style={{ padding: '32px', backgroundColor: '#080807', color: 'white', borderRadius: '4px', marginBottom: '32px' }}>
              <h3 style={{ color: 'white', marginBottom: '16px' }}>Interested in this role?</h3>
              <p style={{ fontSize: '14px', color: '#ccc', marginBottom: '24px' }}>Apply directly to the employer through your StyleAtlas profile.</p>
              <button className="btn btn-gold" style={{ width: '100%', padding: '16px' }}>Apply Now</button>
            </div>

            <div style={{ padding: '24px', border: '1px solid #eaeaea', borderRadius: '4px' }}>
              <h4 style={{ marginBottom: '16px' }}>About the Employer</h4>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <strong>{(job.businesses as any)?.business_name}</strong>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>{(job.businesses as any)?.description || 'Fashion brand operating in Nigeria.'}</p>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Link href={`/profile/${(job.businesses as any)?.slug}`} className="text-link" style={{ marginTop: '16px', display: 'inline-block' }}>View company profile &rarr;</Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
