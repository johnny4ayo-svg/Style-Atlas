'use server';

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createSubscription(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const tier = formData.get('tier') as 'pro' | 'premium';
  
  let amount = 0;
  if (tier === 'pro') {
    amount = 15000;
  } else if (tier === 'premium') {
    amount = 45000;
  } else {
    throw new Error("Invalid subscription tier");
  }

  // Get business ID
  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_id', user.id)
    .single();

  if (!business) throw new Error("Business not found");

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
        type: 'subscription',
        tier: tier,
        business_id: business.id
      },
      callback_url: `${baseUrl}/dashboard/business`
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
