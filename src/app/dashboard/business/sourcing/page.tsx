// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function B2BSourcingHubPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Ensure user owns a business to access B2B hub
  const { data: business } = await supabase
    .from('businesses')
    .select('id, is_verified, verification_tier')
    .eq('owner_id', user.id)
    .single();

  if (!business) {
    redirect('/dashboard/business');
  }

  // Fetch B2B suppliers
  const { data: suppliers } = await supabase
    .from('businesses')
    .select('id, business_name, slug, city, state, cover_image_url, verification_tier, business_categories(categories(name))')
    .eq('is_b2b_supplier', true)
    .order('created_at', { ascending: false });

  const Icon = ({ name }: { name: string }) => (
    <svg className="icon" aria-hidden="true">
      <use href={`/icons/sprite.svg#icon-${name}`}></use>
    </svg>
  );

  return (
    <>
      <div className="dashboard-top">
        <div>
          <span className="eyebrow">Business workspace</span>
          <h1>B2B Sourcing Hub</h1>
          <p className="text-gray-500 mt-2 max-w-xl">
            A private directory of verified fabric suppliers, freelance tailors, pattern makers, and fashion logistics companies.
          </p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-4">
        <div className="text-amber-600 mt-1">
          <Icon name="lock" />
        </div>
        <div>
          <h4 className="font-bold text-amber-900 text-sm">Private Network</h4>
          <p className="text-amber-800 text-xs mt-1">
            This sourcing hub is only visible to registered fashion businesses on STYLEATLAS. Connect directly with suppliers to negotiate B2B rates.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {suppliers && suppliers.length > 0 ? (
          suppliers.map((supplier: any) => (
            <article className="designer-card" key={supplier.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="designer-media" style={{ height: '200px' }}>
                <Image src={supplier.cover_image_url || "/images/designer-blue.jpg"} alt={supplier.business_name} fill style={{ objectFit: 'cover' }} />
                <div className="card-badges">
                  {supplier.verification_tier !== 'none' && (
                    <span className="badge">
                      <Icon name="verified" /> 
                      {supplier.verification_tier === 'guaranteed' ? 'Guaranteed' : 
                       supplier.verification_tier === 'studio' ? 'Studio Verified' : 'Verified'}
                    </span>
                  )}
                </div>
              </div>
              <div className="designer-body" style={{ flex: 1, marginTop: '-40px' }}>
                <h3>{supplier.business_name}</h3>
                <div className="location-line">
                  <Icon name="pin" /> {supplier.city}, {supplier.state}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100/10">
                  <Link className="btn btn-gold w-full justify-center" href={`/profile/${supplier.slug}`}>
                    Contact Supplier
                  </Link>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full">
            <div className="empty-state bg-white">
              <Icon name="search" />
              <h3>No suppliers listed yet</h3>
              <p>We are currently onboarding verified fabric vendors and pattern makers. Check back soon.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
