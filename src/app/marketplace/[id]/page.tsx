import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      businesses ( business_name, slug ),
      product_variants ( * )
    `)
    .eq('id', params.id)
    .single();

  if (!product) {
    notFound();
  }

  const Icon = ({ name }: { name: string }) => (
    <svg className="icon" aria-hidden="true">
      <use href={`/icons/sprite.svg#icon-${name}`}></use>
    </svg>
  );

  return (
    <main>
      <section className="page-hero" style={{ padding: '40px 0' }}>
        <div className="container">
          <div className="breadcrumb" style={{ marginBottom: '24px' }}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/marketplace">Marketplace</Link>
            <span>/</span>
            <span>{product.name}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
            <div>
              <Image 
                src={product.image_url || "/images/designer-green.jpg"} 
                alt={product.name} 
                width={600} 
                height={800} 
                style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
              />
            </div>
            
            <div style={{ padding: '24px 0' }}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Link href={`/profile/${(product.businesses as any)?.slug}`} className="eyebrow" style={{ color: 'var(--color-primary)' }}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(product.businesses as any)?.business_name}
              </Link>
              <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>{product.name}</h1>
              <p style={{ fontSize: '24px', fontWeight: '500', marginBottom: '24px' }}>
                ₦{(product.base_price / 100).toLocaleString()}
              </p>

              <div style={{ marginBottom: '32px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                <strong>Product Description</strong>
                <p style={{ marginTop: '8px', color: '#555' }}>{product.description}</p>
              </div>

              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {product.product_variants && (product.product_variants as any[]).length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <strong>Available Options:</strong>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(product.product_variants as any[]).map(variant => (
                      <span key={variant.id} className="tag" style={{ border: '1px solid #ddd', padding: '8px 16px', background: '#fff' }}>
                        {variant.color} - {variant.size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <AddToCartButton product={product} variant={(product.product_variants as any[])?.[0]} />
              
              <div style={{ marginTop: '24px', display: 'flex', gap: '16px', color: '#666', fontSize: '14px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Icon name="check" /> Authentic guarantee</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Icon name="lock" /> Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
