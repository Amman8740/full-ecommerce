import type { Product } from '@/lib/data/provider';

export default function ProductReviews({ reviews }: { reviews: Product['reviews'] }) {
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
      
      {reviews.length === 0 ? (
        <p className="text-slate-600">No reviews yet. Be the first to review this product!</p>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold">{averageRating}</div>
            <div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((star) => (
                  <span key={star} className="text-yellow-400">★</span>
                ))}
              </div>
              <div className="text-sm text-slate-600">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</div>
            </div>
          </div>
          
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{review.title}</div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <span key={star} className={star <= review.rating ? 'text-yellow-400' : 'text-slate-300'}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-slate-700 mb-2">{review.body}</p>
                <div className="text-sm text-slate-500">
                  {review.author} • {new Date(review.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
