import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const reference = searchParams.get('reference');

  if (!reference) {
    return NextResponse.json({ error: 'Missing reference' }, { status: 400 });
  }

  const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!paystackSecretKey) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  try {
    // 1. Verify transaction with Paystack
    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`
      }
    });

    const verifyData = await verifyRes.json();

    if (!verifyData.status || verifyData.data.status !== 'success') {
      console.error("Paystack verification failed:", verifyData);
      // Redirect to a generic failure page or back to cart
      const url = req.nextUrl.clone();
      url.pathname = '/cart';
      url.searchParams.set('error', 'payment_failed');
      return NextResponse.redirect(url);
    }

    // 2. Update order status in Supabase
    // The reference we sent to Paystack was our order.id
    const orderId = verifyData.data.metadata?.order_id || reference;
    
    const supabase = createClient();
    
    const { error: updateError } = await supabase
      .from('orders')
      .update({ status: 'paid' })
      .eq('id', orderId);

    if (updateError) {
      console.error("Failed to update order status:", updateError);
      // Even if update fails, payment was successful, so we should log heavily but still redirect to success
    } else {
      // Send receipt email
      const { data: orderDetails } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();
        
      if (orderDetails) {
        // Mock email receipt sending without email available
        console.log('Sending receipt for order:', orderDetails.id, {
          orderId: orderDetails.id,
          amount: orderDetails.total_amount,
          address: orderDetails.shipping_address || 'N/A',
          date: new Date(orderDetails.created_at).toLocaleDateString()
        });
      }
    }

    // 3. Redirect to success page with order ID
    const url = req.nextUrl.clone();
    url.pathname = '/checkout/success';
    url.searchParams.set('order_id', orderId);
    return NextResponse.redirect(url);
    
  } catch (error) {
    console.error("Verification error:", error);
    const url = req.nextUrl.clone();
    url.pathname = '/cart';
    url.searchParams.set('error', 'verification_error');
    return NextResponse.redirect(url);
  }
}
