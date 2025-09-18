'use client';
import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const ok = typeof window !== 'undefined' && localStorage.getItem('cookie-ok');
    if (!ok) setOpen(true);
  }, []);
  if (!open) return null;
  return (
    <div className="fixed bottom-4 inset-x-0 flex justify-center z-50">
      <div className="max-w-2xl mx-auto rounded-xl border bg-white shadow p-4 text-sm">
        We use cookies to improve your experience. By using this site, you accept cookies.
        <div className="mt-3 flex justify-end gap-2">
          <button onClick={()=> setOpen(false)} className="px-3 py-1.5 rounded border">Close</button>
          <button onClick={()=> { localStorage.setItem('cookie-ok','1'); setOpen(false); }} className="px-3 py-1.5 rounded bg-emerald-600 text-white">Accept</button>
        </div>
      </div>
    </div>
  );
}
