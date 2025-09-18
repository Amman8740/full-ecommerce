'use client';
import { useState } from 'react';
import { appMode } from '@/lib/env';
import { useRouter } from 'next/navigation';

export default function CheckoutPaymentPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onPay = async () => {
    setLoading(true);
    // In mock mode, pretend payment succeeded and route to order page
    await new Promise((r) => setTimeout(r, 800));
    router.push(`/order/mock-order-1`);
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Payment</h1>
      <div className="rounded-lg border p-6 space-y-4">
        {appMode === 'mock' ? (
          <>
            <div className="text-sm text-slate-600">Mock mode: No real payment. Click Pay to simulate success.</div>
            <button onClick={onPay} disabled={loading} className="rounded-md bg-emerald-600 text-white px-5 py-2.5 disabled:opacity-50">
              {loading ? 'Processing…' : 'Pay £0'}
            </button>
          </>
        ) : (
          <div className="text-sm text-slate-600">Stripe Payment Element will render here in live mode.</div>
        )}
      </div>
    </div>
  );
}
