# Homemade Happiness 🧁

> Fresh from our home to your heart

A full-stack bakery ordering web application built with React, TypeScript, TanStack Router, and Supabase.

## Tech Stack

| Technology      | Purpose                 |
| --------------- | ----------------------- |
| React 18        | UI Framework            |
| TypeScript      | Type Safety             |
| Vite            | Build Tool              |
| TanStack Router | File-based Routing      |
| Tailwind CSS    | Styling                 |
| shadcn/ui       | UI Components           |
| Zustand         | State Management (Cart) |
| Supabase        | Backend (Auth + DB)     |
| Bun             | Package Manager         |
| Sonner          | Toast Notifications     |
| Lucide React    | Icons                   |
| React Hook Form | Form Management         |
| Zod             | Validation              |
| Recharts        | Admin Charts            |

## Project Structure

```
homemade-happiness/
├── src/
│   ├── components/
│   │   ├── ui/          # shadcn/ui components (40+)
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   └── WhatsAppButton.tsx
│   ├── hooks/
│   │   └── use-mobile.tsx
│   ├── integrations/supabase/
│   │   ├── client.ts
│   │   ├── client.server.ts
│   │   ├── types.ts
│   │   ├── auth-attacher.tsx
│   │   └── auth-middleware.ts
│   ├── lib/api/
│   │   ├── cart-store.ts
│   │   ├── use-auth.ts
│   │   ├── config.server.ts
│   │   └── ...
│   ├── routes/
│   │   ├── __root.tsx    # Root layout
│   │   ├── index.tsx     # Home page
│   │   ├── menu.tsx      # Product listing
│   │   ├── product.$id.tsx # Product detail
│   │   ├── cart.tsx      # Shopping cart
│   │   ├── checkout.tsx  # Checkout flow
│   │   ├── orders.tsx    # Order history
│   │   ├── track.$id.tsx # Order tracking
│   │   ├── auth.tsx      # Login/Register
│   │   ├── admin.tsx     # Admin dashboard
│   │   ├── claim-admin.tsx
│   │   ├── contact.tsx
│   │   └── ...
│   ├── styles.css
│   └── main.tsx
├── supabase/migrations/
│   ├── 20260616060000_initial.sql
│   └── 20260616060001_products.sql
└── ...
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.0+)
- [Supabase](https://supabase.com) account

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun dev
```

### Supabase Setup

1. Create a new Supabase project
2. Run the migrations in order:
   - `supabase/migrations/20260616060000_initial.sql`
   - `supabase/migrations/20260616060001_products.sql`
3. Enable Google Auth in Supabase dashboard
4. Copy your project URL and anon key to `.env`

### Available Scripts

```bash
bun dev      # Start dev server
bun build    # Production build
bun preview  # Preview production build
bun lint     # Run ESLint
```

## Features

- 🛒 **Product Catalog** - Browse 32+ products across 12 categories
- 🔍 **Search & Filter** - Search by name, filter by category
- 🛍️ **Shopping Cart** - Add/remove items, adjust quantities
- 💳 **Checkout** - UPI payment or Cash on Delivery
- 📦 **Order Tracking** - Real-time status with Swiggy-style tracker
- 👤 **User Authentication** - Email/password + Google OAuth
- 📊 **Admin Dashboard** - Stats, orders, product management
- 📱 **Responsive** - Mobile-first design
- 🌙 **Dark Mode** - Toggle in admin panel
- 💬 **WhatsApp Integration** - Direct chat support

## Routes

| Path              | Page           | Description              |
| ----------------- | -------------- | ------------------------ |
| `/`               | Home           | Hero, bestsellers, CTA   |
| `/menu`           | Menu           | Products with filters    |
| `/product/$id`    | Product Detail | Full product information |
| `/cart`           | Cart           | Shopping cart            |
| `/checkout`       | Checkout       | Order placement          |
| `/orders`         | Orders         | Order history            |
| `/track/$id`      | Tracking       | Live order tracking      |
| `/auth`           | Auth           | Login / Register         |
| `/admin`          | Admin          | Dashboard & management   |
| `/claim-admin`    | Claim Admin    | First-user admin claim   |
| `/contact`        | Contact        | Contact form & info      |

## Database

PostgreSQL schema with 4 tables:
- `profiles` - User profiles with role management
- `products` - Product catalog with categories and pricing
- `orders` - Order records with status tracking
- `cart_items` - Synced cart for logged-in users

Row Level Security (RLS) enforced on all tables.
