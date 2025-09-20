// app/(admin)/admin/products/page.tsx
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createProductAction, deleteProductAction } from "./action";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const s = createSupabaseServerClient();
  const { data } = await s
    .from("product")
    .select("id,slug,name,brand,category,price_cents,stock,images,created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="grid gap-8">
      <form action={createProductAction} className="rounded-lg border p-4 bg-white grid grid-cols-2 gap-4">
        <input name="name" placeholder="Name" className="border rounded px-3 py-2" required />
        <input name="slug" placeholder="slug (unique)" className="border rounded px-3 py-2" required />
        <input name="brand" placeholder="Brand" className="border rounded px-3 py-2" />
        <select name="category" className="border rounded px-3 py-2">
          <option value="phone">Phone</option>
          <option value="tablet">Tablet</option>
          <option value="laptop">Laptop</option>
          <option value="accessory">Accessory</option>
        </select>
        <input name="priceCents" type="number" placeholder="Price (pence)" className="border rounded px-3 py-2" required />
        <input name="compareAtCents" type="number" placeholder="Compare at (pence, optional)" className="border rounded px-3 py-2" />
        <input name="stock" type="number" placeholder="Stock" className="border rounded px-3 py-2" />
        <input name="images" placeholder="Image URLs (comma separated)" className="col-span-2 border rounded px-3 py-2" />
        <textarea name="description" placeholder="Description" className="col-span-2 border rounded px-3 py-2" />
        <div className="col-span-2">
          <button className="px-5 py-2.5 rounded bg-slate-900 text-white hover:bg-slate-800">Create product</button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(data ?? []).map((p) => (
          <div key={p.id} className="rounded-lg border p-4 bg-white flex items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={(Array.isArray(p.images) ? p.images[0] : "") || "/placeholder.png"}
              alt={p.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <div className="font-semibold">{p.name}</div>
              <div className="text-xs text-slate-500">
                {p.category} · £{Math.round((p.price_cents ?? 0) / 100)} · stock {p.stock}
              </div>
            </div>
            <form action={deleteProductAction}>
              <input type="hidden" name="id" value={p.id} />
              <button className="text-red-600 text-sm hover:underline" type="submit">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
