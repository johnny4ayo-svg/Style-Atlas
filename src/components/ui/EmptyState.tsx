import Link from "next/link";
import React from "react";

interface EmptyStateProps {
  heading: string;
  supportingText: string;
  primaryButtonLabel: string;
  primaryButtonHref: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
}

export default function EmptyState({
  heading,
  supportingText,
  primaryButtonLabel,
  primaryButtonHref,
  secondaryButtonLabel,
  secondaryButtonHref,
}: EmptyStateProps) {
  return (
    <div className="empty-state" style={{ textAlign: 'center', padding: '60px 20px', margin: '40px auto', maxWidth: '600px', backgroundColor: 'var(--ivory-2)', borderRadius: '24px' }}>
      <h3 style={{ fontSize: '32px', fontFamily: 'var(--serif)', marginBottom: '16px' }}>{heading}</h3>
      <p style={{ fontSize: '16px', color: 'var(--ink)', opacity: 0.8, marginBottom: '32px' }}>{supportingText}</p>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href={primaryButtonHref} className="btn btn-gold">
          {primaryButtonLabel}
        </Link>
        {secondaryButtonLabel && secondaryButtonHref && (
          <Link href={secondaryButtonHref} className="btn btn-dark">
            {secondaryButtonLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
