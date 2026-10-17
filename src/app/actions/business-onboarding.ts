'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type BusinessSubmissionResult = { ok: boolean; message: string };

const types: Record<string, string> = {
  'Fashion designer / atelier': 'designer',
  'Fashion brand': 'brand',
  'Fashion school': 'school',
  'Stylist': 'stylist',
  'Photographer': 'photographer',
};

export async function submitBusinessProfile(input: {
  businessName: string;
  category: string;
  city: string;
  state: string;
  description: string;
  startingPrice: string;
}): Promise<BusinessSubmissionResult> {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { ok: false, message: 'Sign in before submitting your business.' };

  const name = input.businessName?.trim();
  const city = input.city?.trim();
  const state = input.state?.trim();
  const description = input.description?.trim() || null;
  const type = types[input.category];
  if (!name || name.length < 3 || name.length > 120 || !city || city.length > 90 || !state || state.length > 90 || !type || (description && description.length > 3000)) {
    return { ok: false, message: 'Please check your business name, category, location and description.' };
  }
  const priceText = (input.startingPrice || '').trim().replace(/[₦,\\s]/g, '');
  const price = priceText ? Number(priceText) : null;
  if (price !== null && (!Number.isSafeInteger(price) || price < 0 || price > 1000000000)) {
    return { ok: false, message: 'Enter a valid starting price in naira.' };
  }

  const { data: existing, error: lookupError } = await supabase.from('businesses').select('id').eq('owner_id', user.id).limit(1);
  if (lookupError) return { ok: false, message: 'Could not check your existing business. Please try again.' };
  if (existing?.length) return { ok: false, message: 'You already have a business profile. Manage it from your dashboard.' };

  const base = name.toLowerCase().normalize('NFKD').replace(/[\\u0300-\\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 55) || 'fashion-business';
  const slug = `${base}-${crypto.randomUUID().slice(0, 8)}`;
  const { error } = await supabase.from('businesses').insert({
    owner_id: user.id,
    business_name: name,
    slug,
    type,
    city,
    state,
    description,
    starting_price: price === null ? null : price * 100,
    is_verified: false,
    verification_status: 'pending',
  });
  if (error) {
    console.error('Business submission failed:', error.code);
    return { ok: false, message: 'We could not submit your business. Please try again or contact support.' };
  }
  revalidatePath('/dashboard/business');
  return { ok: true, message: 'Your business has been submitted for review. It will not appear publicly until approved.' };
}
