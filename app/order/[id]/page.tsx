export default function OrderPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Order placed</h1>
      <p className="text-slate-600">Thank you. Your order ID is <span className="font-mono">{params.id}</span>.</p>
    </div>
  );
}
