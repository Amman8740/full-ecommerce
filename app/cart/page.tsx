'use client';
import { useCart } from '@/lib/store/cart';
import Link from 'next/link';

export default function CartPage() {
  const { items, setQty, removeItem, clear } = useCart();
  const subtotal = items.reduce((sum, item) => sum + (item.priceCents * item.qty), 0);
  const shipping = subtotal > 0 ? 0 : 0; // Free shipping
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
        <p className="text-slate-600 mb-6">Add some products to get started.</p>
        <Link href="/collections/mobile-phones" className="inline-flex items-center justify-center rounded-md bg-emerald-600 text-white px-6 py-3">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Your cart ({items.length} item{items.length !== 1 ? 's' : ''})</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.slug} className="flex gap-4 p-4 border border-slate-200 rounded-lg">
              <div className="w-20 h-20 rounded border overflow-hidden flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                <p className="text-emerald-700 font-semibold">£{(item.priceCents/100).toFixed(0)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <label className="text-sm">Qty:</label>
                  <select
                    value={item.qty}
                    onChange={(e) => setQty(item.slug, Number(e.target.value))}
                    className="text-sm border rounded px-2 py-1 w-16"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map((q) => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeItem(item.slug)}
                    className="text-sm text-red-600 hover:text-red-700 ml-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="pt-4">
            <button
              onClick={clear}
              className="text-sm text-slate-600 hover:text-slate-700"
            >
              Clear cart
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="border border-slate-200 rounded-lg p-4">
            <h2 className="font-semibold mb-4">Order summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>£{(subtotal/100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `£${(shipping/100).toFixed(2)}`}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>£{(total/100).toFixed(2)}</span>
              </div>
            </div>
            <Link
              href="/checkout/shipping"
              className="w-full mt-4 inline-flex items-center justify-center rounded-md bg-emerald-600 text-white px-6 py-3"
            >
              Proceed to checkout
            </Link>
          </div>
          
          <div className="text-xs text-slate-600 space-y-1">
            <div>✓ Free UK delivery</div>
            <div>✓ 30-day returns</div>
            <div>✓ 13-month warranty</div>
          </div>
        </div>
      </div>
    </div>
  );
}
