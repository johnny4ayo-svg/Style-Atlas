import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Centre | STYLEATLAS",
  description: "Get support for using STYLEATLAS, managing your account, and safety.",
};

export default function HelpPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div>
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Help centre</span>
            </div>
            <h1 className="page-title">How can we help you?</h1>
          </div>
        </div>
      </section>

      <section className="section compact">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <form className="search-dock" style={{ position: 'relative', transform: 'none', bottom: 'auto', left: 'auto', width: '100%', marginBottom: '40px' }}>
            <div className="search-row" style={{ gridTemplateColumns: '1fr auto' }}>
              <div className="search-field">
                <svg className="icon" aria-hidden="true"><use href="/icons/sprite.svg#icon-search"></use></svg>
                <div>
                  <label htmlFor="help-search">Search help articles</label>
                  <input id="help-search" name="q" placeholder="e.g. How to verify my profile..." />
                </div>
              </div>
              <button className="search-submit" type="submit" aria-label="Search help">
                <svg className="icon" aria-hidden="true"><use href="/icons/sprite.svg#icon-arrow"></use></svg>
              </button>
            </div>
          </form>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            <div className="card" style={{ padding: '24px', border: '1px solid var(--border)', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '16px' }}>For Customers</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><Link href="/help/finding-the-right-designer" style={{ textDecoration: 'underline' }}>Finding the right designer</Link></li>
                <li><Link href="/help/pricing-and-quotes" style={{ textDecoration: 'underline' }}>Understanding pricing and quotes</Link></li>
                <li><Link href="/help/leaving-a-review" style={{ textDecoration: 'underline' }}>Leaving a review</Link></li>
              </ul>
            </div>
            
            <div className="card" style={{ padding: '24px', border: '1px solid var(--border)', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '16px' }}>For Businesses</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><Link href="/help/listing-your-business" style={{ textDecoration: 'underline' }}>Listing your business</Link></li>
                <li><Link href="/help/verification-process" style={{ textDecoration: 'underline' }}>The verification process</Link></li>
                <li><Link href="/help/updating-your-portfolio" style={{ textDecoration: 'underline' }}>Updating your portfolio</Link></li>
              </ul>
            </div>

            <div className="card" style={{ padding: '24px', border: '1px solid var(--border)', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '16px' }}>Accounts & Billing</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><Link href="/help/managing-your-subscription" style={{ textDecoration: 'underline' }}>Managing your subscription</Link></li>
                <li><Link href="/help/resetting-your-password" style={{ textDecoration: 'underline' }}>Resetting your password</Link></li>
                <li><Link href="/help/deleting-your-account" style={{ textDecoration: 'underline' }}>Deleting your account</Link></li>
              </ul>
            </div>

            <div className="card" style={{ padding: '24px', border: '1px solid var(--border)', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '16px' }}>Trust & Safety</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><Link href="/help/reporting-inaccurate-information" style={{ textDecoration: 'underline' }}>Reporting inaccurate information</Link></li>
                <li><Link href="/help/community-guidelines" style={{ textDecoration: 'underline' }}>Our community guidelines</Link></li>
                <li><Link href="/editorial-policy" style={{ textDecoration: 'underline' }}>Editorial policy</Link></li>
              </ul>
            </div>
          </div>

          <div style={{ padding: '32px', background: 'var(--cream)', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '16px' }}>Still need help?</h3>
            <p style={{ marginBottom: '24px' }}>Our support team is available to assist you with any questions or issues.</p>
            <Link href="/contact" className="btn btn-dark">Contact Support</Link>
          </div>

        </div>
      </section>
    </main>
  );
}
