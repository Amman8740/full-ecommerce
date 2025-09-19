"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import Link from "next/link";
import { Search, User, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { useCartUI } from "@/lib/store/cart-ui";

export default function HeaderRight() {
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const { open } = useCartUI();

  const [openSearch, setOpenSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (openSearch) inputRef.current?.focus(); }, [openSearch]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = inputRef.current?.value?.trim();
    if (q) window.location.href = `/search?q=${encodeURIComponent(q)}`;
  };

  return (
    <div className="flex items-center gap-3">
      {/* Search */}
      <form onSubmit={onSubmit} className="flex items-center">
        <button
          type="button"
          onClick={() => setOpenSearch((s) => !s)}
          className="p-2 text-slate-600 hover:text-blue-600"
          aria-label="Toggle search"
          aria-expanded={openSearch}
        >
          <Search className="w-5 h-5" />
        </button>

        <div
          className={[
            "overflow-hidden transition-[max-width,opacity] duration-200 h-9 flex items-center",
            "border rounded-lg shadow-sm bg-white",
            openSearch ? "ml-2 max-w-40 sm:max-w-48 opacity-100 px-2 border-slate-300"
                       : "ml-0 max-w-0  opacity-0  px-0 border-transparent shadow-none",
          ].join(" ")}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search…"
            className="w-full text-sm outline-none placeholder:text-slate-400"
          />
        </div>
      </form>

      {/* Account */}
      <Link href="/account" className="p-2 text-slate-600 hover:text-blue-600" aria-label="Account">
        <User className="w-5 h-5" />
      </Link>

      {/* Cart */}
      <button
        onClick={open}
        type="button"
        className="relative p-2 text-slate-600 hover:text-blue-600"
        aria-label="Open cart"
      >
        <ShoppingCart className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 bg-lime-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
          {count}
        </span>
      </button>
    </div>
  );
}
