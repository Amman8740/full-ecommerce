import { NextResponse } from 'next/server';
import { appMode } from '@/lib/env';

export async function POST() {
  if (appMode === 'mock') {
    return NextResponse.json({ clientSecret: 'mock_client_secret', orderId: 'mock-order-1' });
  }
  // Live mode: to be implemented with Stripe and Supabase order creation
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}
