// app/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200">
      <div className="container grid gap-6 py-10 md:grid-cols-4 text-sm">
        <div>
          <div className="font-semibold mb-3">Policies</div>
          <ul className="space-y-2">
            <li><Link href="/warranty">Warranty</Link></li>
            <li><Link href="/shipping">Shipping</Link></li>
            <li><Link href="/returns">Returns & Refunds</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/return-form">Return Form</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Company</div>
          <p>Refurb Store Ltd<br/>London, United Kingdom</p>
          <p className="mt-2">Email: hello@example.co.uk<br/>Phone: +44 20 1234 5678</p>
        </div>
        <div>
          <div className="font-semibold mb-3">Support</div>
          <ul className="space-y-2">
            <li><Link href="/faqs">FAQs</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/trade-in">Trade-in</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">WhatsApp</div>
          <a
            href="https://wa.me/440000000000"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-lime-400 text-black px-4 py-2"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Refurb Store Ltd. All rights reserved.
      </div>
    </footer>
  );
}
