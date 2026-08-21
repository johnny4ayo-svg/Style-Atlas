import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "@/components/ui/icons";

export default async function ClaimBusinessPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: business } = await supabase
    .from("businesses")
    .select("id, business_name, is_claimed, is_verified")
    .eq("slug", params.slug)
    .single();

  if (!business) {
    notFound();
  }

  // Already claimed or verified
  if (business.is_claimed || business.is_verified) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle width={32} height={32} />
          </div>
          <h1 className="font-serif text-3xl font-bold text-brand-black mb-4">Already Claimed</h1>
          <p className="text-gray-600 mb-8">
            The profile for <strong>{business.business_name}</strong> has already been claimed or verified by its owner.
          </p>
          <Link href={`/profile/${params.slug}`} className="btn btn-outline-dark inline-block">
            Return to Profile
          </Link>
        </div>
      </main>
    );
  }

  async function submitClaim(formData: FormData) {
    'use server';
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      redirect('/login?next=/claim-business/' + params.slug);
    }

    const businessId = formData.get('business_id') as string;
    
    // In a real app, you would save the documents/role to a 'business_claims' table.
    // For now, we'll just set it to pending on the business record.
    await supabase
      .from('businesses')
      .update({
        is_claimed: true,
        verification_status: 'pending',
        claim_requested_at: new Date().toISOString(),
      })
      .eq('id', businessId);

    redirect(`/profile/${params.slug}?claim=success`);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        
        <div className="mb-8">
          <Link href={`/profile/${params.slug}`} className="text-gray-500 hover:text-brand-black text-sm font-medium flex items-center">
            ← Back to Profile
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-brand-black p-8 text-white text-center">
            <span className="eyebrow uppercase tracking-widest text-brand-gold font-bold text-xs mb-3 block">Verification</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">Claim Your Business</h1>
            <p className="text-gray-300">
              Verify you own <strong>{business.business_name}</strong> to manage your portfolio and respond to clients.
            </p>
          </div>

          <div className="p-8 md:p-12">
            <form action={submitClaim} className="space-y-6">
              <input type="hidden" name="business_id" value={business.id} />
              
              <div>
                <label className="block text-sm font-bold text-brand-black mb-2">Your Role at the Company</label>
                <select name="role" required className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold">
                  <option value="">Select your role...</option>
                  <option value="owner">Owner / Founder</option>
                  <option value="manager">Manager / Director</option>
                  <option value="marketing">Marketing / PR</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-black mb-2">Business Email</label>
                <input 
                  type="email" 
                  name="work_email" 
                  required 
                  placeholder="name@yourcompany.com"
                  className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                />
                <p className="text-xs text-gray-500 mt-2">We will send a verification code to this address.</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-black mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  placeholder="+234 ..."
                  className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button 
                  type="submit" 
                  className="w-full bg-brand-gold text-brand-black font-bold py-4 rounded-lg hover:bg-brand-gold/90 transition-colors shadow-sm"
                >
                  Submit Verification Request
                </button>
                <p className="text-xs text-center text-gray-500 mt-4">
                  By submitting this form, you agree to our Terms of Service. Our team will review your request within 24-48 hours.
                </p>
              </div>
            </form>
          </div>
        </div>

      </div>
    </main>
  );
}
