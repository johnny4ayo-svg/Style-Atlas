require('dotenv').config({ path: '.env.local' });
global.WebSocket = require('ws');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createAdmin() {
  const email = 'styleatlasadmin@gmail.com';
  const password = 'StyleAtlas123!';

  console.log(`Trying to register ${email}...`);
  let { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError && authError.message.includes('already registered')) {
    console.log(`User already registered. Trying to log in...`);
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) {
      console.error('Failed to log in. The password might be wrong or the user was seeded with dummy_hash.', signInError);
      console.log('Registering a completely new email: theboss@styleatlas.demo');
      const fallbackEmail = 'theboss@styleatlas.demo';
      const { data: fbData, error: fbError } = await supabase.auth.signUp({
        email: fallbackEmail,
        password,
      });
      if (fbError) {
        console.error('Fallback registration failed', fbError);
        return;
      }
      authData = fbData;
      console.log('Successfully registered theboss@styleatlas.demo');
    } else {
      authData = signInData;
    }
  } else if (authError) {
    console.error('Registration failed', authError);
    return;
  }

  const user = authData.user;
  if (!user) {
    console.error('No user returned.');
    return;
  }

  console.log(`Updating role to 'admin' for user ${user.id}...`);
  const { data: updateData, error: updateError } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('id', user.id)
    .select();

  if (updateError) {
    console.error('Failed to update role. Did the trigger create the profile yet?', updateError);
  } else {
    console.log('SUCCESS! Profile updated to admin:');
    console.log(updateData);
    console.log(`\n\n--- LOGIN DETAILS ---`);
    console.log(`Email: ${user.email}`);
    console.log(`Password: ${password}`);
  }
}

createAdmin();
