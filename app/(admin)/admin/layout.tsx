// app/(admin)/admin/layout.tsx
import { appMode } from "@/lib/env";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (appMode !== "live") {
    return (
      <div className="container py-16">
        <h1 className="text-2xl font-bold">Admin disabled (mock mode)</h1>
        <p className="text-slate-600 mt-2">
          Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to enable admin.
        </p>
      </div>
    );
  }
  return (
    <div className="container py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Admin</h1>
        <nav className="flex gap-4 text-sm">
          <Link href="/admin/products" className="hover:underline">Products</Link>
          <Link href="/" className="hover:underline">Back to store</Link>
        </nav>
      </div>
      {children}
    </div>
  );
}
