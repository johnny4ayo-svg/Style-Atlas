import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function NewMoodboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  async function createMoodboard(formData: FormData) {
    'use server';
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!title || !user) return;

    const { data, error } = await supabase
      .from('moodboards')
      .insert({
        user_id: user.id,
        title,
        description
      })
      .select()
      .single();

    if (!error && data) {
      redirect(`/dashboard/customer/moodboards/${data.id}`);
    }
  }

  return (
    <>
      <div className="dashboard-top">
        <div>
          <span className="eyebrow">Customer workspace</span>
          <h1>Create New Moodboard</h1>
        </div>
      </div>
      
      <section className="dashboard-grid">
        <article className="dashboard-card" style={{ maxWidth: '600px' }}>
          <form action={createMoodboard} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label htmlFor="title">Moodboard Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                className="form-control" 
                placeholder="e.g. Wedding Inspiration, Summer Wardrobe" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description (Optional)</label>
              <textarea 
                id="description" 
                name="description" 
                className="form-control" 
                rows={4} 
                placeholder="Describe the vibe or purpose of this moodboard..."
              ></textarea>
            </div>
            
            <button type="submit" className="btn btn-gold" style={{ marginTop: '16px' }}>
              Create Moodboard
            </button>
          </form>
        </article>
      </section>
    </>
  );
}
