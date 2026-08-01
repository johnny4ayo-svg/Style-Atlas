# STYLEATLAS Full-Stack Specification

## Recommended production stack

- Next.js App Router with TypeScript strict mode
- React Server Components by default
- Tailwind CSS with tokens generated from `assets/data/design-tokens.json`
- Shadcn UI only where it improves accessibility or behaviour
- Framer Motion for restrained page and component transitions
- Supabase PostgreSQL, Auth, Storage and Row Level Security
- React Hook Form and Zod
- Paystack primary payment adapter
- Stripe-compatible payment interface for later international billing
- Resend for transactional email
- PostHog for product analytics
- Sentry for error tracking
- Vitest, React Testing Library and Playwright

## Core domains

### Identity and access

Roles: customer, professional, business_owner, school_admin, employer, organiser, editor, moderator and administrator.

Use a profile table linked to Supabase Auth. Keep authorisation decisions on the server and reinforce them with Row Level Security.

### Directory

Key tables: businesses, business_locations, categories, business_categories, services, service_prices, portfolios, portfolio_media, availability, verification_requests, reviews and review_responses.

Search filters should use stable URL parameters so category, city and speciality pages are crawlable and shareable.

### Enquiries and consultations

Use quote_requests, quote_responses, conversations, messages, appointments and appointment_payments. Do not expose personal contact details until the product rules allow it.

### Marketplace

Use products, product_variants, inventory, carts, cart_items, orders, order_items, shipping_addresses, payments, refunds and fulfilment_events.

Made-to-order products need production lead times, measurement requirements and explicit seller acceptance states.

### Jobs and events

Use employers, jobs, job_applications, events, event_sessions, event_registrations and ticket_orders.

### Editorial

Use articles, article_categories, authors, article_entities and editorial_disclosures. Keep sponsored content flags explicit.

### Trust and moderation

Use verification_requests, moderation_cases, reports, review_flags and audit_logs. A paid subscription must never automatically grant verification.

## Required states for every interactive feature

- Loading
- Success
- Empty
- Validation error
- Server error
- Permission denied
- Offline or retry state where useful

## Search and ranking

Rank by textual relevance, verified structured profile completeness, category fit, location relevance and user-selected sort. Paid placement must be labelled and kept separate from organic rank calculations.

## SEO and AEO

Generate unique metadata, canonicals, sitemaps, robots rules and JSON-LD for Organization, WebSite, SearchAction, BreadcrumbList, ItemList, LocalBusiness, EducationalOrganization, Course, Product, Offer, Review, Event, JobPosting and Article.

## Payments

Create a provider interface with methods for checkout initiation, verification, webhook handling, refunds and subscription management. Store provider references but never secret keys in client bundles.

## Responsive implementation

Match the supplied mockups at 1440 px and 390 px. Use the intermediate layouts already defined in `assets/css/styles.css` as the behavioural reference.
