'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getBusinessId(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_id', user.id)
    .single();

  if (!business) throw new Error("Business not found");
  return business.id;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function uploadImage(supabase: any, imageFile: File | null) {
  if (!imageFile || imageFile.size === 0) return null;
  
  const fileExt = imageFile.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  
  const { error } = await supabase.storage
    .from('images')
    .upload(`public/${fileName}`, imageFile);
    
  if (error) {
    console.error("Upload error:", error);
    throw new Error('Image upload failed');
  }
  
  const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(`public/${fileName}`);
  return publicUrl;
}

export async function createProduct(formData: FormData) {
  const supabase = createClient();
  const businessId = await getBusinessId(supabase);

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const basePrice = parseInt(formData.get('base_price') as string) * 100; // Convert to kobo/cents
  
  const imageFile = formData.get('image_file') as File;
  const imageUrl = await uploadImage(supabase, imageFile);
  
  const size = formData.get('size') as string;
  const color = formData.get('color') as string;
  const inventory = parseInt(formData.get('inventory') as string);

  // 1. Create product
  const { data: product, error: productError } = await supabase
    .from('products')
    .insert({
      business_id: businessId,
      name,
      description,
      base_price: basePrice,
      image_url: imageUrl,
      is_published: true
    })
    .select()
    .single();

  if (productError || !product) {
    console.error(productError);
    throw new Error('Failed to create product');
  }

  // 2. Create variant
  const sku = `${name.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;
  const { error: variantError } = await supabase
    .from('product_variants')
    .insert({
      product_id: product.id,
      sku,
      size,
      color,
      inventory_count: inventory
    });

  if (variantError) {
    console.error(variantError);
    throw new Error('Failed to create product variant');
  }

  revalidatePath('/dashboard/business/products');
  revalidatePath('/marketplace');
  redirect('/dashboard/business/products');
}

export async function createJob(formData: FormData) {
  const supabase = createClient();
  const businessId = await getBusinessId(supabase);

  const title = formData.get('title') as string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const type = formData.get('type') as any; // public.job_type
  const location = formData.get('location') as string;
  const description = formData.get('description') as string;
  const salaryRange = formData.get('salary_range') as string;

  const { error } = await supabase
    .from('jobs')
    .insert({
      business_id: businessId,
      title,
      type,
      location,
      description,
      salary_range: salaryRange,
      is_active: true
    });

  if (error) {
    console.error(error);
    throw new Error('Failed to create job');
  }

  revalidatePath('/dashboard/business/jobs');
  revalidatePath('/jobs');
  redirect('/dashboard/business/jobs');
}

export async function createEvent(formData: FormData) {
  const supabase = createClient();
  const businessId = await getBusinessId(supabase);

  const title = formData.get('title') as string;
  const date = formData.get('event_date') as string;
  const location = formData.get('location') as string;
  const description = formData.get('description') as string;
  const ticketPrice = parseInt(formData.get('ticket_price') as string) * 100; // kobo
  
  const imageFile = formData.get('image_file') as File;
  const imageUrl = await uploadImage(supabase, imageFile);

  const { error } = await supabase
    .from('events')
    .insert({
      business_id: businessId,
      title,
      event_date: new Date(date).toISOString(),
      location,
      description,
      ticket_price: ticketPrice,
      image_url: imageUrl
    });

  if (error) {
    console.error(error);
    throw new Error('Failed to create event');
  }

  revalidatePath('/dashboard/business/events');
  revalidatePath('/events');
  redirect('/dashboard/business/events');
}
