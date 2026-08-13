'use server';

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function sendMessage(conversationId: string, content: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      sender_id: user.id,
      content: content,
      is_read: false
    });

  if (error) {
    console.error("Failed to send message:", error);
    throw new Error("Failed to send message");
  }

  revalidatePath('/dashboard/customer/messages');
  revalidatePath('/dashboard/business/messages');
}

export async function startConversation(businessId: string, message: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  // Check if conversation already exists
  let conversationId;
  const { data: existing } = await supabase
    .from('conversations')
    .select('id')
    .eq('customer_id', user.id)
    .eq('business_id', businessId)
    .single();

  if (existing) {
    conversationId = existing.id;
  } else {
    // Create new conversation
    const { data: newConv, error: convError } = await supabase
      .from('conversations')
      .insert({
        customer_id: user.id,
        business_id: businessId
      })
      .select('id')
      .single();

    if (convError || !newConv) {
      console.error("Failed to create conversation:", convError);
      throw new Error("Failed to start conversation");
    }
    conversationId = newConv.id;
  }

  // Send the initial message
  await sendMessage(conversationId, message);
  return conversationId;
}

export async function getMessages(conversationId: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from('messages')
    .select('*, sender:profiles(*)')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error("Failed to fetch messages:", error);
    throw new Error("Failed to fetch messages");
  }

  return data;
}

export async function getConversations() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from('conversations')
    .select('*, customer:profiles(*), business:businesses(*)')
    .or(`customer_id.eq.${user.id},business.owner_id.eq.${user.id}`)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error("Failed to fetch conversations:", error);
    throw new Error("Failed to fetch conversations");
  }

  return data;
}

export async function createOrGetConversation(businessId: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  let conversationId;
  const { data: existing } = await supabase
    .from('conversations')
    .select('id')
    .eq('customer_id', user.id)
    .eq('business_id', businessId)
    .single();

  if (existing) {
    conversationId = existing.id;
  } else {
    const { data: newConv, error: convError } = await supabase
      .from('conversations')
      .insert({
        customer_id: user.id,
        business_id: businessId
      })
      .select('id')
      .single();

    if (convError || !newConv) {
      console.error("Failed to create conversation:", convError);
      throw new Error("Failed to create conversation");
    }
    conversationId = newConv.id;
  }

  return conversationId;
}
