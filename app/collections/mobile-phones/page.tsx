import { Suspense } from 'react';
import ProductFilters from './sections/ProductFilters';
import ProductGrid from './sections/ProductGrid';

export default async function CollectionMobilePhonesPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page) || 1;
  const brand = typeof searchParams.brand === 'string' ? searchParams.brand : undefined;
  const query = typeof searchParams.q === 'string' ? searchParams.q : undefined;
  
  return (
    <div className="grid md:grid-cols-[240px,1fr] gap-8">
      <aside className="space-y-6">
        <ProductFilters />
      </aside>
      <section>
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid 
            page={page}
            filters={{ brand }}
            query={query}
          />
        </Suspense>
      </section>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="group">
          <div className="aspect-square rounded-lg border bg-white overflow-hidden skeleton animate-shimmer" />
          <div className="mt-2 h-4 w-2/3 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}
