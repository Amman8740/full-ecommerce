'use client';

import { Fragment, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { X, Minus, Plus } from 'lucide-react';
import { useCart } from '@/lib/store/cart';
import { useCartUI } from '@/lib/store/cart-ui';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

async function handleCheckout() {
  const stripe = await stripePromise;
  const items = useCart.getState().items; // { slug, name, priceCents, qty, image }

  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });

  const data = await res.json();
  if (!res.ok) {
    alert(data.error ?? 'Checkout failed');
    return;
  }
  await stripe!.redirectToCheckout({ sessionId: data.id });
}

export default function CartDrawer() {
  const { isOpen, close } = useCartUI();
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const removeItem = useCart((s) => s.removeItem);

  const totalCents = useMemo(
    () => items.reduce((sum, it) => sum + it.priceCents * it.qty, 0),
    [items],
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in duration-200"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="w-screen max-w-md">
                <div className="flex h-full flex-col bg-white shadow-xl">
                  <div className="flex items-center justify-between px-6 py-4 border-b">
                    <Dialog.Title className="text-lg font-semibold">
                      Your Cart
                    </Dialog.Title>
                    <button
                      onClick={close}
                      className="p-2 text-slate-600 hover:text-slate-900"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                    {items.length === 0 ? (
                      <div className="text-sm text-slate-500">
                        Your cart is empty.
                      </div>
                    ) : (
                      items.map((it) => (
                        <div
                          key={it.slug}
                          className="flex gap-3 border rounded-lg p-3"
                        >
                          <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-slate-100">
                            {it.image ? (
                              <Image
                                src={it.image}
                                alt={it.name}
                                fill
                                className="object-cover"
                              />
                            ) : null}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{it.name}</div>
                            <div className="text-xs text-slate-500 mt-0.5">
                              £{(it.priceCents / 100).toFixed(2)}
                            </div>

                            <div className="mt-2 flex items-center gap-2">
                              <button
                                className="rounded border p-1 hover:bg-slate-50"
                                onClick={() =>
                                  setQty(it.slug, Math.max(0, it.qty - 1))
                                }
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center text-sm">
                                {it.qty}
                              </span>
                              <button
                                className="rounded border p-1 hover:bg-slate-50"
                                onClick={() => setQty(it.slug, it.qty + 1)}
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-4 h-4" />
                              </button>

                              <button
                                className="ml-auto text-xs text-red-600 hover:underline"
                                onClick={() => removeItem(it.slug)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="border-t p-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Subtotal</span>
                      <span className="font-semibold">
                        £{(totalCents / 100).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Taxes and shipping calculated at checkout.
                    </p>

                    <div className="flex gap-3 pt-2">
                      <Link
                        href="/cart"
                        className="flex-1 inline-flex items-center justify-center rounded-md bg-slate-900 text-white px-4 py-2 font-medium hover:bg-slate-800"
                        onClick={close}
                      >
                        View cart
                      </Link>
                      <button
                        onClick={handleCheckout}
                        className="flex-1 inline-flex items-center justify-center rounded-md bg-emerald-600 text-white px-4 py-2 font-medium hover:bg-emerald-700"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
