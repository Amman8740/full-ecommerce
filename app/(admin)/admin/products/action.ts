// app/(admin)/admin/products/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

function toArrayCSV(input: FormDataEntryValue | null) {
  const raw = (input?.toString() ?? "").trim();
  if (!raw) return [] as string[];
  return raw.split(",").map(s => s.trim()).filter(Boolean);
}

export async function createProductAction(form: FormData) {
  const s = createSupabaseAdminClient();

  const priceCents = Number(form.get("priceCents"));
  const compareAtCents = Number(form.get("compareAtCents")) || Math.round(priceCents * 1.25);

  const { error } = await s.from("product").insert({
    slug: String(form.get("slug")),
    name: String(form.get("name")),
    brand: String(form.get("brand") || "Unknown"),
    description: String(form.get("description") || ""),
    category: String(form.get("category") || "phone"),
    price_cents: priceCents,
    compare_at_cents: compareAtCents,
    images: toArrayCSV(form.get("images")),       // comma-separated URLs
    variants: [],                                 // fill later if you want
    specs: [],
    reviews: [],
    stock: Number(form.get("stock") || 0),
    is_published: true,
  });

  if (error) throw error;
  revalidatePath("/admin/products");
}

export async function deleteProductAction(form: FormData) {
  const s = createSupabaseAdminClient();
  const { error } = await s.from("product").delete().eq("id", String(form.get("id")));
  if (error) throw error;
  revalidatePath("/admin/products");
}
