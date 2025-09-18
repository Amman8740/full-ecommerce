import Link from 'next/link';

export default function CheckoutShippingPage() {
  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Shipping</h1>
      <div className="rounded-lg border p-6 space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Full name" />
        <input className="w-full border rounded px-3 py-2" placeholder="Address line 1" />
        <div className="grid grid-cols-2 gap-3">
          <input className="border rounded px-3 py-2" placeholder="City" />
          <input className="border rounded px-3 py-2" placeholder="Postcode" />
        </div>
        <Link href="/checkout/payment" className="inline-flex items-center justify-center rounded-md bg-emerald-600 text-white px-5 py-2.5">Continue to payment</Link>
      </div>
    </div>
  );
}
