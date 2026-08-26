/* eslint-disable */
// @ts-nocheck
'use server';

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createAdCampaign(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const targetType = formData.get('target_type') as 'profile' | 'product' | 'event';
  const packageTier = formData.get('package_tier') as 'basic' | 'premium' | 'enterprise';
  
  let amount = 0;
  let durationDays = 0;
  if (packageTier === 'basic') {
    amount = 5000;
    durationDays = 7;
  } else if (packageTier === 'premium') {
    amount = 15000;
    durationDays = 14;
  } else if (packageTier === 'enterprise') {
    amount = 30000;
    durationDays = 30;
  } else {
    throw new Error("Invalid package tier");
  }

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
      package_tier: packageTier,
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
        package_tier: packageTier,
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
