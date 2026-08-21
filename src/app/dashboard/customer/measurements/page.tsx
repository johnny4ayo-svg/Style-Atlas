import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function MeasurementsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('measurement_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const measurements: any = profile?.measurements || {
    neck: '',
    chest: '',
    waist: '',
    hips: '',
    inseam: '',
    sleeve: ''
  };

  async function saveMeasurements(formData: FormData) {
    'use server';
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const data = {
      neck: String(formData.get('neck') || ''),
      chest: String(formData.get('chest') || ''),
      waist: String(formData.get('waist') || ''),
      hips: String(formData.get('hips') || ''),
      inseam: String(formData.get('inseam') || ''),
      sleeve: String(formData.get('sleeve') || ''),
    };

    const { data: existingProfile } = await supabase
      .from('measurement_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (existingProfile) {
      await supabase
        .from('measurement_profiles')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .update({ measurements: data as any })
        .eq('id', existingProfile.id);
    } else {
      await supabase
        .from('measurement_profiles')
        .insert({
          user_id: user.id,
          profile_name: 'My Measurements',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          measurements: data as any
        });
    }
  }

  return (
    <>
      <div className="dashboard-top">
        <div>
          <span className="eyebrow uppercase tracking-widest text-brand-gold font-bold text-xs mb-2 block">Customer workspace</span>
          <h1 className="font-serif text-3xl font-bold text-brand-black">Digital Measurement Passport</h1>
          <p className="text-gray-500 mt-2 max-w-xl">
            Save your precise bespoke measurements to seamlessly share with tailors and designers for faster, more accurate commissions.
          </p>
        </div>
      </div>
      
      <section className="mt-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl">
          <div className="bg-gray-50 p-6 border-b border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center text-brand-gold font-serif text-xl font-bold">
              M
            </div>
            <div>
              <h3 className="font-bold text-brand-black">Your Core Measurements</h3>
              <p className="text-sm text-gray-500">All measurements should be in centimeters (cm).</p>
            </div>
          </div>
          
          <form action={saveMeasurements} className="p-8">
            <div className="grid md:grid-cols-2 gap-12">
              
              <div className="space-y-6">
                <h4 className="font-serif text-xl font-bold border-b border-gray-100 pb-2">Upper Body</h4>
                
                <div>
                  <label htmlFor="neck" className="block text-sm font-bold text-brand-black mb-2">Neck</label>
                  <input type="number" id="neck" name="neck" defaultValue={measurements.neck} className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold" />
                </div>
                
                <div>
                  <label htmlFor="chest" className="block text-sm font-bold text-brand-black mb-2">Chest / Bust</label>
                  <input type="number" id="chest" name="chest" defaultValue={measurements.chest} className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold" />
                </div>
                
                <div>
                  <label htmlFor="sleeve" className="block text-sm font-bold text-brand-black mb-2">Sleeve Length</label>
                  <input type="number" id="sleeve" name="sleeve" defaultValue={measurements.sleeve} className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold" />
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-serif text-xl font-bold border-b border-gray-100 pb-2">Lower Body</h4>
                
                <div>
                  <label htmlFor="waist" className="block text-sm font-bold text-brand-black mb-2">Waist</label>
                  <input type="number" id="waist" name="waist" defaultValue={measurements.waist} className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold" />
                </div>
                
                <div>
                  <label htmlFor="hips" className="block text-sm font-bold text-brand-black mb-2">Hips</label>
                  <input type="number" id="hips" name="hips" defaultValue={measurements.hips} className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold" />
                </div>
                
                <div>
                  <label htmlFor="inseam" className="block text-sm font-bold text-brand-black mb-2">Inseam</label>
                  <input type="number" id="inseam" name="inseam" defaultValue={measurements.inseam} className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold" />
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-6 border-t border-gray-100 flex justify-end">
              <button type="submit" className="bg-brand-gold text-brand-black font-bold px-8 py-3 rounded-lg hover:bg-brand-gold/90 transition-colors shadow-sm">
                Save Passport
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
