'use server'

import { createClient } from "@/lib/supabase/server"
import { sendQuoteNotification } from "@/lib/email"

export async function submitQuoteRequest(formData: FormData) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    // Return an error string or handle client side redirect before this
    throw new Error('Not authenticated')
  }

  const businessId = formData.get('businessId') as string
  const occasion = formData.get('occasion') as string
  const targetDate = formData.get('targetDate') as string
  const budgetRange = formData.get('budgetRange') as string
  const details = formData.get('details') as string

  const { error } = await supabase.from('quote_requests').insert({
    customer_id: user.id,
    business_id: businessId,
    occasion,
    target_date: targetDate,
    budget_range: budgetRange,
    details,
    status: 'pending'
  })

  if (error) {
    console.error('Error inserting quote request:', error)
    throw new Error('Failed to submit quote request')
  }

  // Send email notification to business owner
  try {
    const { data: business } = await supabase
      .from('businesses')
      .select('business_name, profiles!businesses_owner_id_fkey(email)')
      .eq('id', businessId)
      .single()

    const { data: customer } = await supabase
      .from('profiles')
      .select('first_name, last_name')
      .eq('id', user.id)
      .single()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ownerEmail = (business?.profiles as any)?.email

    if (ownerEmail && business) {
      await sendQuoteNotification(ownerEmail, {
        businessName: business.business_name,
        customerName: `${customer?.first_name || ''} ${customer?.last_name || ''}`.trim() || 'A customer',
        occasion,
        budget: budgetRange
      });
    }
  } catch (emailError) {
    console.error('Failed to send quote notification email:', emailError)
    // Don't throw here, the quote was still created successfully
  }
}
