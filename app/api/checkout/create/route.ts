import { NextResponse } from 'next/server';
import { appMode } from '@/lib/env';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

type Item = {
  slug: string;
  name: string;
  priceCents: number;
  qty: number;
  image?: string;
};

export async function POST(req: Request) {
  if (appMode === 'mock') {
    return NextResponse.json({ clientSecret: 'mock_client_secret', orderId: 'mock-order-1' });
  }
   try {
    const { items } = (await req.json()) as { items: Item[] };

    if (!items?.length) {
      return NextResponse.json({ error: "No items" }, { status: 400 });
    }

    // TODO (security): fetch canonical prices by slug from your DB
    // and ignore client-provided priceCents to prevent tampering.
    // For now we use the provided priceCents for demo.

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (it) => ({
        quantity: it.qty,
        price_data: {
          currency: "gbp",
          unit_amount: it.priceCents,
          product_data: {
            name: it.name,
            images: it.image ? [it.image] : [],
            metadata: { slug: it.slug },
          },
        },
      })
    );

    const site = process.env.NEXT_PUBLIC_SITE_URL!;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: `${site}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/cart`,
      // optional niceties for UK store:
      shipping_address_collection: { allowed_countries: ["GB"] },
      phone_number_collection: { enabled: true },
      metadata: {
        // quick breadcrumb of cart content
        cart: items.map((i) => `${i.slug}:${i.qty}`).join(","),
      },
    });

    return NextResponse.json({ id: session.id }, { status: 200 });
  } catch (err: any) {
    console.error("Stripe session error", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}