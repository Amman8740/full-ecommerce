import { createBrowserClient } from '@supabase/ssr';
import { env } from '@/lib/env';

export const createSupabaseBrowserClient = () => {
  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    throw new Error('Supabase URL or anon key missing');
  }
  return createBrowserClient(env.supabaseUrl, env.supabaseAnonKey);
};
