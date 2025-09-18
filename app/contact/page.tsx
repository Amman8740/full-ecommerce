export default function ContactPage() {
  return (
    <div className="space-y-3 max-w-xl">
      <h1 className="text-2xl font-semibold">Contact us</h1>
      <p className="text-slate-600">Email: hello@example.co.uk · Phone: +44 20 1234 5678 · WhatsApp: see footer</p>
      <input className="w-full border rounded px-3 py-2" placeholder="Your email" />
      <textarea className="w-full border rounded px-3 py-2" placeholder="How can we help?" rows={5} />
      <button className="rounded-md bg-emerald-600 text-white px-5 py-2.5">Send</button>
    </div>
  );
}
