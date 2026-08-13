require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function testLogin() {
  console.log("Attempting to log in as superadmin@styleatlas.com...");
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'superadmin@styleatlas.com',
    password: 'admin123'
  });
  
  if (error) {
    console.error("❌ Login Failed!");
    console.error("Error Object:", error);
    console.error("Error Message:", error.message);
  } else {
    console.log("✅ Login Succeeded!");
    console.log("User:", data.user.id);
  }
}

testLogin();
