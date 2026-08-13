import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ImageUpload from "@/components/ui/ImageUpload";
import { updateBusinessCoverImage, updateProfileAvatar } from "@/app/actions/update-actions";

export default async function BusinessProfileEditPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('owner_id', user.id)
    .single();

  if (!business) {
    return <div>You don&apos;t have a business profile yet.</div>;
  }

  // We need to fetch the profile to get the avatar
  const { data: profile } = await supabase.from('profiles').select('avatar_url').eq('id', user.id).single();

  return (
    <>
      <div className="dashboard-top">
        <div>
          <span className="eyebrow">Profile settings</span>
          <h1>Edit Profile Media</h1>
        </div>
      </div>

      <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <section style={{ padding: '24px', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: '#fff' }}>
          <h3 style={{ marginBottom: '8px' }}>Cover Image</h3>
          <p className="muted" style={{ marginBottom: '16px' }}>This is the large image displayed at the top of your public directory profile.</p>
          <ImageUpload 
            currentImageUrl={business.cover_image_url || undefined} 
            folder="covers"
            onUploadSuccess={updateBusinessCoverImage} 
          />
        </section>

        <section style={{ padding: '24px', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: '#fff' }}>
          <h3 style={{ marginBottom: '8px' }}>Avatar Image</h3>
          <p className="muted" style={{ marginBottom: '16px' }}>This image shows up in messages and quotes.</p>
          <ImageUpload 
            currentImageUrl={profile?.avatar_url || undefined} 
            folder="avatars"
            onUploadSuccess={updateProfileAvatar}
          />
        </section>
      </div>
    </>
  );
}
