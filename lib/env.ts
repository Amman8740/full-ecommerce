export type AppMode = 'live' | 'mock';

const has = (key: string) => typeof process.env[key] === 'string' && process.env[key]!.trim().length > 0;

export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
};

export const appMode: AppMode = (has('NEXT_PUBLIC_SUPABASE_URL') && has('NEXT_PUBLIC_SUPABASE_ANON_KEY')) ? 'live' : 'mock';

if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line no-console
  console.log(`[Refurb Store] Data provider: ${appMode === 'live' ? 'Supabase' : 'Mock'} mode`);
}
