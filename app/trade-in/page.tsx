export default function TradeInPage() {
  return (
    <div className="space-y-3 max-w-xl">
      <h1 className="text-2xl font-semibold">Trade-in</h1>
      <input className="w-full border rounded px-3 py-2" placeholder="Device model (e.g., iPhone 13)" />
      <input className="w-full border rounded px-3 py-2" placeholder="Storage (e.g., 128GB)" />
      <select className="w-full border rounded px-3 py-2">
        <option>Condition: Like New</option>
        <option>Condition: Excellent</option>
        <option>Condition: Very Good</option>
        <option>Condition: Fair</option>
      </select>
      <button className="rounded-md bg-emerald-600 text-white px-5 py-2.5">Get quote</button>
    </div>
  );
}
