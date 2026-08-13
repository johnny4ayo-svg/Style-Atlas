'use server';

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createAdCampaign(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const targetType = formData.get('target_type') as 'profile' | 'product' | 'event';
  const durationDays = parseInt(formData.get('duration_days') as string, 10);
  
  let amount = 0;
  if (durationDays === 7) amount = 5000;
  else if (durationDays === 14) amount = 9000;
  else if (durationDays === 30) amount = 15000;
  else throw new Error("Invalid duration");

  // Get business ID and email
  const { data: business } = await supabase
    .from('businesses')
    .select('id, owner_id')
    .eq('owner_id', user.id)
    .single();

  if (!business) throw new Error("Business not found");

  // Create pending campaign
  const { data: campaign, error } = await supabase
    .from('promoted_campaigns')
    .insert({
      business_id: business.id,
      target_type: targetType,
      status: 'pending_payment',
      amount_paid: 0, // Will be updated by webhook
    })
    .select('id')
    .single();

  if (error || !campaign) {
    console.error("Error creating campaign:", error);
    throw new Error("Failed to create campaign");
  }

  // Initialize Paystack Transaction
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: user.email || 'business@example.com',
      amount: amount * 100, // Paystack is in kobo
      metadata: {
        type: 'ad_campaign',
        campaign_id: campaign.id,
        duration_days: durationDays
      },
      callback_url: `${baseUrl}/dashboard/business/ads`
    })
  });

  const paystackData = await paystackRes.json();
  
  if (paystackData.status && paystackData.data?.authorization_url) {
    redirect(paystackData.data.authorization_url);
  } else {
    console.error("Paystack initialization failed:", paystackData);
    throw new Error("Payment initialization failed");
  }
}
