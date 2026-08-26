import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About STYLEATLAS | Nigerian Fashion Directory",
  description: "Learn about our mission to organize and elevate the Nigerian fashion industry by connecting trusted professionals with buyers.",
  alternates: {
    canonical: '/about'
  },
  openGraph: {
    url: '/about'
  }
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>About</span>
            </div>
            <h1 className="page-title">Nigerian fashion, mapped and verified.</h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="prose">
            <h2>Who We Serve</h2>
            <p>
              STYLEATLAS is Nigeria&apos;s premium fashion discovery platform, serving clients who demand excellence and fashion professionals who deliver it. We connect individuals with verified designers, brands, schools, and creative professionals across the country.
            </p>

            <h2>The Discovery Problem</h2>
            <p>
              Finding reliable, high-quality fashion professionals in Nigeria often relies on word-of-mouth or navigating fragmented social media profiles. Clients struggle to verify credibility, assess pricing, and confirm physical locations before committing. Exceptional talent often goes unnoticed in the noise.
            </p>

            <h2>Our Approach to Verification</h2>
            <p>
              We solve this through a rigorous verification approach. Every professional listed on STYLEATLAS undergoes a review process. We check identities, review portfolios, and approve profiles to ensure that what you see is what you get. This commitment to truth builds trust.
            </p>

            <h2>Our Team</h2>
            <p>
              STYLEATLAS is built by a dedicated team passionate about Nigerian fashion and technology. We believe in elevating the industry standard by providing a reliable infrastructure for fashion commerce and discovery.
            </p>

            <div style={{ marginTop: '40px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/directory" className="btn btn-dark">Explore the directory</Link>
              <Link href="/contact" className="btn btn-outline-dark">Contact STYLEATLAS</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
