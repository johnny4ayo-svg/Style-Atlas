# Backend Implementation Plan (Phase 4)

This document details the backend strategy for STYLEATLAS, built on **Supabase (PostgreSQL + GoTrue Auth)**. As required by the master specification, the database will ultimately contain 50+ tables. To manage this complexity, we will implement the schema in logical tranches.

## Tranche 1: Core Identity & Business Profiles (Immediate Focus)

These tables form the absolute foundation of the directory and must be built first.

### 1. `users` (Managed by Supabase Auth / `auth.users`)
- We will leverage the built-in Supabase `auth.users` table for identity.
- Additional metadata (like user role: `customer`, `professional`, `admin`) will be stored in a public `profiles` table.

### 2. `profiles`
- `id` (uuid, references `auth.users`)
- `first_name` (text)
- `last_name` (text)
- `role` (enum: 'customer', 'professional', 'admin')
- `avatar_url` (text)
- `created_at` (timestamptz)

### 3. `businesses`
- `id` (uuid, primary key)
- `owner_id` (uuid, references `profiles`)
- `business_name` (text)
- `slug` (text, unique)
- `business_type` (enum: 'designer', 'brand', 'school', 'stylist', etc.)
- `description` (text)
- `logo_url` (text)
- `cover_image_url` (text)
- `is_verified` (boolean, default false)
- `city` (text)
- `state` (text)
- `created_at` (timestamptz)

### 4. `business_categories` & `categories`
- Taxonomy tables for the search and filter system (e.g., "Menswear", "Bridal Couture", "Agbada").

### 5. `services`
- Services offered by businesses (e.g., "Bespoke Occasionwear", "Remote Design Consultation").
- Includes `starting_price` and `description`.

### 6. `portfolios` & `portfolio_media`
- Visual galleries for designers and brands to showcase their work.

---

## Tranche 2: Directory Interaction & Engagement

Once Core Profiles are active, we will implement user interactions.

- `favourites`: Users saving designers/brands.
- `reviews`: Verified client feedback and ratings (1-5 stars).
- `review_responses`: Business replies to feedback.
- `comparisons`: Saving profiles for side-by-side comparison.

---

## Tranche 3: Concierge, Enquiries & Messaging

- `quote_requests`: Client submissions specifying occasion, budget, and dates.
- `quote_responses`: Business replies with estimates.
- `conversations` & `messages`: Direct messaging between clients and professionals.
- `appointments`: Booking paid/free consultations (virtual or in-person).

---

## Tranche 4: Marketplace, Jobs & Events

- **Marketplace**: `products`, `product_variants`, `carts`, `orders`, `payments`.
- **Jobs**: `jobs`, `job_applications`.
- **Events**: `events`, `event_registrations`.
- **Editorial**: `articles`, `authors`.

---

## Security (Row Level Security - RLS)

- **Public Data**: Business profiles, portfolios, and published reviews will have `SELECT` policies for `anon` and `authenticated` roles.
- **Private Data**: `messages`, `quote_requests`, and `orders` will be strictly locked down. A user can only read/write their own records (`auth.uid() = user_id`).
- **Admin Access**: Users with `role = 'admin'` will have bypass policies.

## Implementation Steps for Tranche 1

1. Write `supabase/migrations/00001_core_schema.sql` to define Tranche 1 tables.
2. Define Row Level Security policies for these tables.
3. Write `supabase/seed.sql` to inject the 30 designers, 20 brands, and 12 cities required by the spec.
4. Verify the database tables appear in the Supabase Dashboard.
