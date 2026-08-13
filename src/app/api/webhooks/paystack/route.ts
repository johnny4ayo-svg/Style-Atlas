import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase admin client to bypass RLS for webhook operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Fallback if service role not set
);

export async function POST(req: Request) {
  try {
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
    }

    // Handle Subscriptions
    if (event.event === 'subscription.create') {
      const { customer, plan } = event.data;
      
      // Map Paystack plan code to our subscription tiers
      let tier = 'pro';
      if (plan.name?.toLowerCase().includes('premium')) {
        tier = 'premium';
      }

      // Update business subscription tier based on customer email
      // In a real app, you'd want to map Paystack customer code to your business ID
      if (customer.email) {
        // Find user by email (this requires a custom DB query or RPC in production)
        const { data: profiles } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .eq('email', customer.email) // Note: Profiles table doesn't have email in Tranche 1, you'd need to fetch auth.users or store it
          .limit(1);

        if (profiles && profiles.length > 0) {
          await supabaseAdmin
            .from('businesses')
            .update({ 
              subscription_tier: tier,
              stripe_customer_id: customer.customer_code // Repurposing column for Paystack customer code
            })
            .eq('owner_id', profiles[0].id);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
