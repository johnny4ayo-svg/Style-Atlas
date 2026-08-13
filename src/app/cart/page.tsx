'use client'

import { useCart } from "@/components/CartProvider";
import Image from "next/image";
import Link from "next/link";
import { processCheckout } from "@/app/actions/checkout-actions";
import { useFormStatus } from "react-dom";

function CheckoutButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-gold" type="submit" disabled={pending} style={{ width: '100%', padding: '16px', fontSize: '18px' }}>
      {pending ? 'Processing...' : 'Place Order'}
    </button>
  );
}

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="container" style={{ padding: '120px 0', textAlign: 'center', minHeight: '60vh' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>Your Cart is Empty</h1>
        <p style={{ color: '#666', marginBottom: '32px' }}>Looks like you haven&apos;t added anything to your bag yet.</p>
        <Link href="/marketplace" className="btn btn-gold">Continue Shopping</Link>
      </main>
    );
  }

  return (
    <main className="container" style={{ padding: '60px 0' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '40px' }}>Your Cart</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '64px' }}>
        <div>
          {items.map(item => (
            <div key={item.variant_id} style={{ display: 'flex', gap: '24px', paddingBottom: '24px', marginBottom: '24px', borderBottom: '1px solid #eaeaea' }}>
              <Image src={item.image_url} alt={item.name} width={100} height={130} style={{ objectFit: 'cover', borderRadius: '4px' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '20px', margin: '0 0 8px 0' }}>{item.name}</h3>
                <div style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
                  <span>Size: {item.size}</span>
                  <span style={{ margin: '0 8px' }}>·</span>
                  <span>Color: {item.color}</span>
                </div>
                
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
                    <button type="button" onClick={() => updateQuantity(item.variant_id, item.quantity - 1)} style={{ padding: '8px 12px', background: '#f9f9f9', border: 'none', cursor: 'pointer' }}>-</button>
                    <span style={{ padding: '8px 12px', borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd' }}>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.variant_id, item.quantity + 1)} style={{ padding: '8px 12px', background: '#f9f9f9', border: 'none', cursor: 'pointer' }}>+</button>
                  </div>
                  <button type="button" onClick={() => removeFromCart(item.variant_id)} className="text-link" style={{ fontSize: '14px' }}>Remove</button>
                </div>
              </div>
              <div style={{ textAlign: 'right', fontWeight: 'bold' }}>
                ₦{((item.price * item.quantity) / 100).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <aside>
          <div style={{ padding: '32px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '24px', borderBottom: '1px solid #ddd', paddingBottom: '16px' }}>Order Summary</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: '#666' }}>Subtotal</span>
              <span>₦{(cartTotal / 100).toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <span style={{ color: '#666' }}>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '20px', marginBottom: '32px', borderTop: '1px solid #ddd', paddingTop: '16px' }}>
              <span>Total</span>
              <span>₦{(cartTotal / 100).toLocaleString()}</span>
            </div>

            <form action={processCheckout} onSubmit={() => setTimeout(clearCart, 1000)}>
              <input type="hidden" name="cart_items" value={JSON.stringify(items)} />
              
              <div className="form-group" style={{ marginBottom: '24px', textAlign: 'left' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Shipping Address</label>
                <textarea name="shipping_address" required rows={3} placeholder="Enter your full delivery address" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
              </div>

              <CheckoutButton />
              
              <p style={{ fontSize: '12px', color: '#666', marginTop: '16px', textAlign: 'center' }}>
                For this MVP, this acts as a &quot;Cash on Delivery&quot; order. No payment will be processed.
              </p>
            </form>
          </div>
        </aside>
      </div>
    </main>
  );
}
