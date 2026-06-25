import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const handler = async (event: { httpMethod: string; body: string | null }) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { email, password, fullName } = JSON.parse(event.body || '{}');

    if (!email || !password) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Email and password required' }) };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Try to create user - if already exists, that's fine
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    // If user already exists, that's OK - we just need to sign in
    if (authError && authError.message.includes('already exists')) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: null, message: 'User already exists' })
      };
    }

    if (authError) throw authError;

    if (authData.user) {
      // Insert into users table (ignore if already exists)
      await supabase
        .from('users')
        .upsert({
          id: authData.user.id,
          email: authData.user.email,
          full_name: fullName || null,
          auth_provider: 'email'
        }, { onConflict: 'id' });
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: authData.user })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: (error as Error).message })
    };
  }
};
