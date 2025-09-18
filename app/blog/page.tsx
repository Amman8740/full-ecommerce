import Link from 'next/link';

const posts = [
  { slug: 'why-refurbished', title: 'Why buy refurbished?', excerpt: 'Save money and the planet.' },
  { slug: 'care-guide', title: 'Refurb care guide', excerpt: 'Keep your device like new.' },
];

export default function BlogPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Blog</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((p)=> (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="block rounded-lg border p-4">
            <div className="font-medium">{p.title}</div>
            <p className="text-sm text-slate-600">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
