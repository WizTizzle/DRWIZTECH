import { createClient } from '@supabase/supabase-js';

// Check for required environment variables
if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error(
    'Missing VITE_SUPABASE_URL - Please connect to Supabase using the "Connect to Supabase" button'
  );
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error(
    'Missing VITE_SUPABASE_ANON_KEY - Please connect to Supabase using the "Connect to Supabase" button'
  );
}

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
