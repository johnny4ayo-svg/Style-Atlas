'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function toggleFavourite(businessId: string) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login?returnUrl=/directory')
  }

  // Check if it exists
  const { data: existing } = await supabase
    .from('favourites')
    .select('id')
    .eq('user_id', user.id)
    .eq('business_id', businessId)
    .single()

  if (existing) {
    await supabase.from('favourites').delete().eq('id', existing.id)
  } else {
    await supabase.from('favourites').insert({
      user_id: user.id,
      business_id: businessId
    })
  }

  revalidatePath('/directory')
  revalidatePath('/')
}

export async function toggleComparison(businessId: string) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login?returnUrl=/directory')
  }

  // Check if it exists
  const { data: existing } = await supabase
    .from('comparisons')
    .select('id')
    .eq('user_id', user.id)
    .eq('business_id', businessId)
    .single()

  if (existing) {
    await supabase.from('comparisons').delete().eq('id', existing.id)
  } else {
    await supabase.from('comparisons').insert({
      user_id: user.id,
      business_id: businessId
    })
  }

  revalidatePath('/directory')
  revalidatePath('/')
}
