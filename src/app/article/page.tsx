import Image from "next/image";

export default function ArticlePage() {
  return (
    <main>
      <article className="container" style={{ maxWidth: '800px', padding: '80px 24px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="eyebrow" style={{ display: 'inline-block', marginBottom: '16px' }}>Editorial</span>
          <h1 style={{ fontSize: '3rem', lineHeight: 1.1, marginBottom: '24px' }}>
            The Renaissance of Aso Oke in Modern Couture
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            How contemporary Nigerian designers are breathing new life into the traditional hand-woven cloth of the Yoruba people, taking it from ceremonial wear to the global runway.
          </p>
        </div>

        <div style={{ position: 'relative', width: '100%', height: '500px', marginBottom: '60px', borderRadius: '12px', overflow: 'hidden' }}>
          <Image 
            src="/images/designer-menswear.jpg" 
            alt="Aso Oke fashion"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <div className="prose" style={{ fontSize: '18px', lineHeight: 1.8, color: '#333' }}>
          <p>
            For generations, <strong>Aso Oke</strong> (translated as &quot;top cloth&quot; or &quot;high cloth&quot;) has been the hallmark of celebration in southwestern Nigeria. Woven manually on narrow strip looms, this thick, textured fabric was traditionally reserved for weddings, naming ceremonies, and chieftaincy titles. 
          </p>
          <p>
            But over the last decade, a quiet revolution has been brewing in the ateliers of Lagos and Abuja. A new guard of designers is recontextualizing the fabric, slicing through its ceremonial weight to create sleek, modern silhouettes that command attention on international runways.
          </p>

          <h3 style={{ marginTop: '40px', marginBottom: '20px', fontSize: '24px' }}>The Weave of the Future</h3>
          
          <p>
            The shift isn&apos;t just about cutting the fabric differently. Designers are collaborating directly with artisans in places like Iseyin (the historical home of Aso Oke) to experiment with lighter cotton threads, metallic Lurex, and unconventional dyes. The result is a fabric that retains its signature rich texture but moves with the fluidity required for modern ready-to-wear.
          </p>

          <blockquote style={{ 
            borderLeft: '4px solid var(--gold)', 
            paddingLeft: '24px', 
            margin: '40px 0',
            fontStyle: 'italic',
            fontSize: '22px',
            color: '#000'
          }}>
            &quot;We are not changing the culture; we are carrying it forward. Aso Oke is our tweed, our denim. It belongs in the everyday luxury conversation.&quot;
          </blockquote>

          <p>
            As international buyers increasingly look toward the continent for authentic craftsmanship, Aso Oke offers a compelling narrative of sustainable, slow fashion. Every yard takes hours to weave, ensuring that no two pieces are exactly identical. 
          </p>

          <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid #eee5da', display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Image 
              src="/images/designer-blue.jpg" 
              alt="Author" 
              width={60} 
              height={60} 
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <strong style={{ display: 'block', fontSize: '18px' }}>By StyleAtlas Editorial</strong>
              <span style={{ color: 'var(--muted)' }}>Curating the voices of Nigerian fashion.</span>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
