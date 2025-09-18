# Refurb Store - Full-Stack E-commerce

A production-grade UK refurbished phones storefront built with Next.js 14, Supabase, and Stripe.

## Features

- **Dual Data Mode**: Runs with mock data by default, switches to Supabase when env keys are provided
- **Complete E-commerce Flow**: Product listings, detailed pages, cart, checkout, orders
- **Stripe Integration**: Payment processing with webhooks (live mode)
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Accessibility**: WCAG compliant with proper ARIA labels
- **SEO Optimized**: Meta tags, structured data, sitemap ready

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Visit the app:**
   Open [http://localhost:3000](http://localhost:3000)

The app runs in **Mock mode** by default with sample data. No database setup required!

## Live Mode Setup

To enable live mode with Supabase and Stripe:

1. **Create a Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Get your project URL and anon key

2. **Set up Stripe:**
   - Create a [Stripe account](https://stripe.com)
   - Get your secret key and webhook secret

3. **Configure environment:**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run database migrations:**
   ```bash
   # Install Supabase CLI
   npm install -g supabase
   
   # Link to your project
   supabase link --project-ref your-project-ref
   
   # Apply migrations
   supabase db push
   
   # Seed the database
   supabase db seed
   ```

5. **Set up storage buckets:**
   - In Supabase dashboard, go to Storage
   - Create buckets: `product-images` (public) and `rma-uploads` (private)

6. **Configure Stripe webhook:**
   - In Stripe dashboard, go to Webhooks
   - Add endpoint: `https://your-domain.com/api/stripe/webhook`
   - Select events: `payment_intent.succeeded`
   - Copy the webhook secret to your env

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── collections/        # Product listing pages
│   ├── products/          # Product detail pages
│   ├── checkout/          # Checkout flow
│   ├── api/               # API routes
│   └── components/        # Shared components
├── lib/                   # Utilities and data layer
│   ├── data/             # Data providers (mock/live)
│   ├── store/            # Zustand stores
│   └── supabase/         # Supabase client configs
├── data/                  # Mock data JSON files
├── supabase/             # Database migrations and seeds
└── public/               # Static assets
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **State**: Zustand
- **Icons**: Lucide React

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Mock vs Live Mode

### Mock Mode (Default)
- Uses JSON files in `/data` directory
- No database connection required
- Simulated checkout flow
- Perfect for development and demos

### Live Mode
- Requires Supabase and Stripe configuration
- Real database operations
- Actual payment processing
- Production-ready features

## Database Schema

The app includes a complete e-commerce schema with:
- Products, variants, pricing, inventory
- Customer management and orders
- Reviews and RMA system
- Row Level Security (RLS) policies

See `/supabase/migrations` for full schema details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
