import Link from "next/link";

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const orderId = searchParams.order_id;

  return (
    <main className="container" style={{ padding: '64px', background: '#fff', borderRadius: '4px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', minHeight: '60vh' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#e8f5e9', color: '#2e7d32', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg className="icon" aria-hidden="true" style={{ width: '40px', height: '40px' }}>
              <use href="/icons/sprite.svg#icon-check"></use>
            </svg>
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: '32px', marginBottom: '8px' }}>Order Confirmed!</h1>
            <p style={{ color: '#666', maxWidth: '400px', margin: '0 auto' }}>Thank you for your purchase. Your payment has been securely processed.</p>
            {orderId && (
              <p style={{ marginTop: '16px', fontSize: '14px', fontFamily: 'monospace', background: '#f5f5f5', padding: '8px 16px', borderRadius: '4px', display: 'inline-block' }}>
                Order ID: {orderId}
              </p>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
        <Link href="/dashboard/customer" className="btn btn-outline-dark">View My Orders</Link>
        <Link href="/marketplace" className="btn btn-gold">Continue Shopping</Link>
      </div>
    </main>
  );
}
