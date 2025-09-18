import type { Product } from '@/lib/data/provider';

export default function ProductSpecs({ specs }: { specs: Product['specs'] }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Specifications</h2>
      <div className="space-y-3">
        {specs.map((spec, index) => (
          <div key={index} className="flex justify-between py-2 border-b border-slate-100 last:border-b-0">
            <span className="font-medium text-slate-700">{spec.key}</span>
            <span className="text-slate-600">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
