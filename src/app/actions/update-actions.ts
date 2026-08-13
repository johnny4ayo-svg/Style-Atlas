'use server';

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateBusinessCoverImage(url: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  
  await supabase.from('businesses').update({ cover_image_url: url }).eq('owner_id', user.id);
  revalidatePath('/dashboard/business/profile');
}

export async function updateProfileAvatar(url: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  
  await supabase.from('profiles').update({ avatar_url: url }).eq('id', user.id);
  revalidatePath('/dashboard/business/profile');
}
