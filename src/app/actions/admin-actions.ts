'use server';

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleBusinessVerification(businessId: string, currentStatus: boolean) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  // Verify this user is an admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from('businesses')
    .update({ is_verified: !currentStatus })
    .eq('id', businessId);

  if (error) {
    throw new Error("Failed to update verification status");
  }

  revalidatePath('/dashboard/admin');
  revalidatePath('/directory');
}

export async function updateUserRole(targetUserId: string, newRole: 'customer' | 'admin' | 'professional') {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  // Verify this user is an admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    throw new Error("Unauthorized");
  }

  // Prevent admin from downgrading themselves
  if (user.id === targetUserId && newRole !== 'admin') {
    throw new Error("Cannot downgrade your own account");
  }

  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', targetUserId);

  if (error) {
    throw new Error("Failed to update user role");
  }

  revalidatePath('/dashboard/admin/users');
}

export async function deleteProduct(productId: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  // Verify this user is an admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) {
    throw new Error("Failed to delete product");
  }

  revalidatePath('/dashboard/admin/products');
}

export async function promoteToAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('id', user.id);

  if (error) {
    throw new Error("Failed to update user role");
  }

  revalidatePath('/dashboard/customer');
}
