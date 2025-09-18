export default function TrustpilotSection() {
  const reviews = [
    {
      name: 'Sarah M.',
      rating: 5,
      text: 'Excellent condition iPhone, looks and works like new. Great value for money!',
      product: 'iPhone 13 Pro',
      date: '2 days ago'
    },
    {
      name: 'James K.',
      rating: 5,
      text: 'Fast delivery and the phone was exactly as described. Very happy with my purchase.',
      product: 'Samsung Galaxy S21',
      date: '1 week ago'
    },
    {
      name: 'Emma L.',
      rating: 5,
      text: 'Amazing service! The refurbished iPad works perfectly and saved me hundreds.',
      product: 'iPad Air',
      date: '2 weeks ago'
    },
    {
      name: 'Mike R.',
      rating: 4,
      text: 'Good quality refurbished laptop. Minor cosmetic wear but everything works great.',
      product: 'MacBook Air',
      date: '3 weeks ago'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex text-yellow-400 text-2xl">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <div className="text-2xl font-bold text-slate-900">4.8/5</div>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Trusted by 1,190+ Customers</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            See what our customers are saying about their refurbished electronics experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <span className="text-sm text-slate-600">{review.date}</span>
              </div>
              
              <p className="text-slate-700 mb-4 line-clamp-3">&ldquo;{review.text}&rdquo;</p>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">{review.name}</div>
                  <div className="text-sm text-slate-600">{review.product}</div>
                </div>
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-semibold text-sm">
                    {review.name.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a
            href="https://trustpilot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-slate-800 transition-colors shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Read all reviews on Trustpilot
          </a>
        </div>
      </div>
    </section>
  );
}
