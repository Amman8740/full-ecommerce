export default function ReturnsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Returns & Refunds</h1>
      <p className="text-slate-600">30-day returns. Items must be in original condition.</p>
      <form className="max-w-lg space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Order ID" />
        <input className="w-full border rounded px-3 py-2" placeholder="Email" />
        <textarea className="w-full border rounded px-3 py-2" placeholder="Reason" rows={4} />
        <button className="rounded-md bg-emerald-600 text-white px-5 py-2.5">Start a return</button>
      </form>
    </div>
  );
}
