// @ts-nocheck
import Link from "next/link";
import SaveButton from "./SaveButton";
import CompareButton from "./CompareButton";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BusinessCard({ business }: { business: any }) {
  return (
    <article className="designer-card">
      <div className="designer-media">
        <img src={business.cover_image_url || "/images/designer-blue.jpg"} alt={`${business.business_name}`} />
        {business.verification_tier && business.verification_tier !== 'none' && (
          <div className="card-badges">
            <span className="badge">
              <svg className="icon"><use href="/icons/sprite.svg#icon-verified"></use></svg>
              {business.verification_tier === 'guaranteed' ? 'Guaranteed' : business.verification_tier === 'studio' ? 'Studio Verified' : 'Verified'}
            </span>
          </div>
        )}
        <SaveButton businessId={business.id} businessName={business.business_name} />
      </div>
      <div className="designer-body">
        <h3>
          {business.business_name}{" "}
          {business.verification_tier && business.verification_tier !== 'none' && <svg className="icon" title={business.verification_tier}><use href="/icons/sprite.svg#icon-verified"></use></svg>}
        </h3>
        <div className="location-line">
          <svg className="icon"><use href="/icons/sprite.svg#icon-pin"></use></svg>
          {business.city}, {business.state}
        </div>
        <div className="tag-row">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {business.business_categories?.slice(0, 2).map((bc: any, idx: number) => (
            <span key={idx} className="tag">{bc.categories?.name}</span>
          ))}
        </div>
        <div className="card-meta">
          <span className="rating">
            <svg className="icon"><use href="/icons/sprite.svg#icon-star"></use></svg>
            {Number(business.rating || 0).toFixed(1)} · {business.review_count || 0}
          </span>
          <span className="price-level">From ₦{(business.starting_price || 0) / 1000}k</span>
        </div>
        <div className="card-actions">
          <Link className="btn btn-gold btn-sm" href={`/profile`}>View profile</Link>
          <CompareButton businessId={business.id} businessName={business.business_name} />
        </div>
      </div>
    </article>
  );
}
