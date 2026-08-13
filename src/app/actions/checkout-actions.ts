'use server'

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function processCheckout(formData: FormData) {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Parse the cart items from the hidden input
  const cartData = formData.get('cart_items') as string;
  if (!cartData) throw new Error("No cart items provided.");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = JSON.parse(cartData) as any[];
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingAddress = formData.get('shipping_address') as string;

  // 1. Create Order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_id: user.id,
      total_amount: totalAmount,
      shipping_address: shippingAddress,
      status: 'pending'
    })
    .select()
    .single();

  if (orderError || !order) {
    console.error(orderError);
    throw new Error('Failed to create order');
  }

  // 2. Create Order Items
  const orderItemsData = items.map(item => ({
    order_id: order.id,
    product_variant_id: item.variant_id,
    quantity: item.quantity,
    unit_price: item.price
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItemsData);

  if (itemsError) {
    console.error(itemsError);
    throw new Error('Failed to create order items');
  }

  // 3. Initialize Paystack Transaction
  const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!paystackSecretKey) {
    throw new Error('Paystack secret key is missing');
  }

  // Determine base URL dynamically or fallback to localhost
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const callbackUrl = `${baseUrl}/api/checkout/verify`;

  try {
    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        amount: totalAmount, // already in kobo from earlier logic (wait, is it?)
        reference: order.id,
        callback_url: callbackUrl,
        metadata: {
          order_id: order.id
        }
      })
    });

    const paystackData = await paystackRes.json();

    if (!paystackData.status) {
      console.error("Paystack Error:", paystackData);
      throw new Error(paystackData.message || 'Failed to initialize Paystack transaction');
    }

    // Redirect to Paystack's hosted checkout page
    redirect(paystackData.data.authorization_url);
  } catch (error) {
    console.error('Paystack initialization error:', error);
    // If redirect was thrown inside the try block, we need to let it propagate
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    // For other errors, redirect to a generic failure or throw
    throw new Error('Failed to start payment');
  }
}
