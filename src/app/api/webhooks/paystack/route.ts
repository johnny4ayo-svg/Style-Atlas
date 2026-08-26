import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';



export async function POST(req: Request) {
  try {
    // Initialize Supabase admin client inside handler to avoid build-time crashes on Vercel
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Verify Paystack signature
    const secret = process.env.PAYSTACK_SECRET_KEY || '';
    const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');
    
    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    // Handle Escrow Payments (charge.success)
    if (event.event === 'charge.success') {
      const { metadata, amount } = event.data;
      
      // If this was an escrow payment for an order
      if (metadata && metadata.order_id && metadata.type === 'escrow') {
        const { error } = await supabaseAdmin
          .from('escrow_transactions')
          .insert({
            order_id: metadata.order_id,
            amount: amount,
            status: 'held',
          });

        if (error) {
          console.error('Failed to create escrow transaction:', error);
          return NextResponse.json({ error: 'Database error' }, { status: 500 });
        }
      }

      // If this was an ad campaign payment
      if (metadata && metadata.campaign_id && metadata.type === 'ad_campaign') {
        const durationDays = metadata.duration_days || 7;
        const startsAt = new Date();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + durationDays);

        const { error } = await supabaseAdmin
          .from('promoted_campaigns')
          .update({
            status: 'active',
            amount_paid: amount,
            starts_at: startsAt.toISOString(),
            expires_at: expiresAt.toISOString(),
          })
          .eq('id', metadata.campaign_id);

        if (error) {
          console.error('Failed to activate ad campaign:', error);
          return NextResponse.json({ error: 'Database error' }, { status: 500 });
        }
      }
      // If this was a business subscription payment
      if (metadata && metadata.tier && metadata.type === 'subscription' && metadata.business_id) {
        const { error } = await supabaseAdmin
          .from('businesses')
          .update({
            subscription_tier: metadata.tier,
          })
          .eq('id', metadata.business_id);

        if (error) {
          console.error('Failed to update business subscription:', error);
          return NextResponse.json({ error: 'Database error' }, { status: 500 });
        }
      }
    }



    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
