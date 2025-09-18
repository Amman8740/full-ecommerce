import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = { slug: string; name: string; priceCents: number; qty: number; image?: string };

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  removeItem: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(persist((set, get) => ({
  items: [],
  addItem: (item, qty = 1) => {
    const items = get().items.slice();
    const idx = items.findIndex(i => i.slug === item.slug);
    if (idx >= 0) items[idx].qty += qty; else items.push({ ...item, qty });
    set({ items });
  },
  removeItem: (slug) => set({ items: get().items.filter(i => i.slug !== slug) }),
  setQty: (slug, qty) => set({ items: get().items.map(i => i.slug === slug ? { ...i, qty } : i) }),
  clear: () => set({ items: [] }),
}), { name: 'refurb-cart' }));
