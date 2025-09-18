export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <article className="prose max-w-none">
      <h1 className="text-3xl font-semibold">{params.slug.replace(/-/g,' ')}</h1>
      <p className="text-slate-700">This is a mock post. Swap for CMS later.</p>
    </article>
  );
}
