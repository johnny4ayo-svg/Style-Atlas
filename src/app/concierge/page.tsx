import Link from "next/link";
import ConciergeWidget from "@/components/ui/ConciergeWidget";

export default function ConciergePage() {
  return (
    <main style={{ paddingTop: '80px', paddingBottom: '80px', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>STYLEATLAS Concierge</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-light)', marginBottom: '3rem' }}>
          Tell us the moment. We'll narrow the map. Choose your event, city, budget and style to match with relevant professionals.
        </p>
        
        <div style={{ background: 'var(--ivory)', padding: '3rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', textAlign: 'left' }}>
          <ConciergeWidget />
        </div>
        
        <div style={{ marginTop: '4rem' }}>
          <Link href="/" className="btn btn-outline-dark">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
