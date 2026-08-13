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
          <span className="eyebrow">Customer workspace</span>
          <h1>My Measurements</h1>
          <p className="muted" style={{ fontSize: '10px', marginTop: '4px' }}>
            Save your measurements for bespoke orders and faster checkout.
          </p>
        </div>
      </div>
      
      <section className="dashboard-grid">
        <article className="dashboard-card" style={{ maxWidth: '800px' }}>
          <form action={saveMeasurements} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3>Upper Body (cm)</h3>
              <div className="form-group">
                <label htmlFor="neck">Neck</label>
                <input type="number" id="neck" name="neck" className="form-control" defaultValue={measurements.neck} />
              </div>
              <div className="form-group">
                <label htmlFor="chest">Chest / Bust</label>
                <input type="number" id="chest" name="chest" className="form-control" defaultValue={measurements.chest} />
              </div>
              <div className="form-group">
                <label htmlFor="sleeve">Sleeve Length</label>
                <input type="number" id="sleeve" name="sleeve" className="form-control" defaultValue={measurements.sleeve} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3>Lower Body (cm)</h3>
              <div className="form-group">
                <label htmlFor="waist">Waist</label>
                <input type="number" id="waist" name="waist" className="form-control" defaultValue={measurements.waist} />
              </div>
              <div className="form-group">
                <label htmlFor="hips">Hips</label>
                <input type="number" id="hips" name="hips" className="form-control" defaultValue={measurements.hips} />
              </div>
              <div className="form-group">
                <label htmlFor="inseam">Inseam</label>
                <input type="number" id="inseam" name="inseam" className="form-control" defaultValue={measurements.inseam} />
              </div>
            </div>
            
            <div style={{ gridColumn: '1 / -1', marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-gold">
                Save Measurements
              </button>
            </div>
          </form>
        </article>
      </section>
    </>
  );
}
