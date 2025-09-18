import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { env } from '@/lib/env';

export const createSupabaseServerClient = () => {
  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    throw new Error('Supabase URL or anon key missing');
  }
  return createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      get(name: string) { return cookies().get(name)?.value; },
      set() {},
      remove() {},
    },
  });
};
