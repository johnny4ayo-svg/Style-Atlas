# STYLEATLAS Master Product and Build Specification

## Product identity

STYLEATLAS is a premium Nigerian fashion designers, brands and industry directory. It combines trusted discovery, editorial storytelling, professional profiles, a marketplace, fashion jobs, events, schools and business growth tools in one connected platform.

The product should feel like a luxury fashion publication, a curated marketplace and a trusted professional network. It should never resemble a generic directory template or a basic SaaS dashboard.

## Product promise

People can discover, compare and contact fashion professionals with enough information to make a confident decision. Fashion businesses can present their craft properly, receive qualified enquiries and manage the commercial side of their visibility.

## Main audiences

1. Customers looking for designers, bridal professionals, stylists, tailors and related services.
2. Nigerian fashion designers and brands seeking customers and visibility.
3. Fashion schools seeking students.
4. Employers, job seekers and creative professionals.
5. Event organisers and attendees.
6. Buyers shopping for Nigerian fashion products.
7. Editors, journalists and fashion enthusiasts.
8. International customers discovering Nigerian fashion talent.
9. Organisations sourcing uniforms, costumes, styling or production partners.

## Approved visual direction

Use the supplied static HTML, CSS, local photography, original logo system and mockups as the visual source of truth.

### Brand character

- Editorial
- Assured
- Warm
- Luxurious
- Culturally grounded
- Precise
- Contemporary

### Core palette

- Obsidian: `#080807`
- Deep charcoal: `#12110F`
- Warm ivory: `#F7F2E9`
- Soft ivory: `#EFE7DB`
- Champagne gold: `#C69A52`
- Burnished bronze: `#8A6032`
- Stone: `#B8B0A5`
- Dark emerald: `#174C3C`
- White: `#FFFFFF`

### Typography

Use an expressive editorial serif for display copy and a clean sans serif for interface content. The static prototype falls back to system fonts so it remains self-contained. The Next.js version should use `next/font` with an open-source editorial serif and modern sans serif.

### Avoid

- Generic directory templates
- Purple AI gradients
- Excessive glass effects
- Repeated identical card sections
- Cheap gold gradients
- Emoji icons
- Unstructured empty space
- Oversized rounded containers everywhere
- Generic stock imagery with no Nigerian fashion relevance
- Placeholder copy or lorem ipsum
- Unlabelled sponsored placement

## Brand asset requirements

The package contains:

- Horizontal logo for dark surfaces
- Horizontal logo for light surfaces
- SA compass monogram
- Wordmark
- Favicon
- Transparent SVG and PNG exports
- Custom SVG interface icon sprite

The mark combines an SA monogram with a subtle compass and atlas reference. Do not replace it with a hanger, shopping bag, needle or another common fashion-directory symbol.

## Approved frontend stack for conversion

- Next.js App Router
- React
- TypeScript strict mode
- Tailwind CSS
- Shadcn UI where it improves accessible behaviour
- Framer Motion for restrained transitions
- React Hook Form
- Zod
- Supabase PostgreSQL
- Supabase Auth
- Supabase Storage
- Supabase Row Level Security
- Paystack as the primary Nigerian payment provider
- Stripe-compatible payment adapter for future international billing
- Resend for transactional email
- PostHog and Google Analytics integration points
- Sentry
- Vitest
- React Testing Library
- Playwright
- Vercel deployment

## Public product areas

### Homepage

The approved homepage includes:

1. Luxury utility bar and custom header.
2. Desktop mega menus and an intentionally designed mobile menu.
3. Editorial hero with two conversion paths.
4. Multi-field directory search.
5. Platform trust and discovery statistics.
6. Fashion category navigation.
7. Featured designer cards with save, compare and profile actions.
8. Curated editorial style collections.
9. City discovery.
10. Designer spotlight.
11. Connected marketplace, jobs, events and schools hub.
12. Separate customer and fashion-business journeys.
13. Verified review pattern.
14. Guided fashion concierge.
15. Editorial stories.
16. Business-listing conversion section.
17. Full footer with useful routes and newsletter capture.

### Directory search

Support:

- Keyword
- Category and subcategory
- City and state
- Distance-ready location field
- Speciality
- Budget
- Rating
- Verification
- Remote-client availability
- Bespoke, bridal and ready-to-wear capabilities
- Menswear, womenswear and children's fashion
- Delivery
- Consultation type
- Date availability
- Language
- Sustainability attributes

Results require grid, list and map-ready layouts. Sorting should cover relevance, rating, recency, popularity and price. Search state must be reflected in stable URL parameters.

### Professional profiles

Each profile is a premium mini-site with:

- Art-directed hero
- Business mark or portrait
- Verification state
- Location, rating, response time, pricing and availability
- Save, compare and share
- Quote and consultation actions
- About
- Services
- Specialities
- Portfolio
- Collections and video
- Pricing guide
- Areas served
- Opening hours
- Team
- Awards and press when verified
- Reviews and owner responses
- FAQs
- Similar profiles
- Related editorial stories
- Reporting tools

Create adapted layouts for designers, brands, schools, stylists, makeup artists, photographers, fabric stores and agencies. Do not force every business type into an identical template.

### Marketplace

Support:

- Category discovery
- Search and filters
- Product variants
- Size and colour choices
- Ready-to-ship and made-to-order states
- Lead times
- Seller identity
- Save product
- Cart
- Checkout
- Paystack payment flow
- Shipping address
- Order confirmation
- Order history
- Refund and fulfilment states

### Fashion jobs

Support job browsing, job details, employer identity, structured JobPosting data, posting packages, applications and employer management.

### Fashion events

Support event browsing, event details, sessions, registration, promotion packages, organiser tools and structured Event data.

### Editorial

Support the journal homepage, categories, articles, designer interviews, curated collections, authors, disclosures, related entities and internal linking to directory profiles.

### Fashion schools

School pages need course discovery, duration, delivery format, facilities, admission information, reviews, location and enquiry actions.

## Account roles

- Customer
- Professional
- Business owner
- School administrator
- Employer
- Event organiser
- Editor
- Moderator
- Administrator

## Customer workspace

- Overview
- Saved profiles
- Saved products
- Comparisons
- Quote requests
- Messages
- Consultations
- Orders
- Reviews
- Recently viewed
- Notifications
- Account and privacy settings

## Business workspace

- Profile completion
- Listing editor
- Portfolio manager
- Services and pricing
- Enquiries
- Quote responses
- Messages
- Consultations
- Reviews
- Analytics and lead sources
- Subscription and billing
- Verification
- Promotions
- Jobs
- Events
- Products
- Orders
- Team members
- Notifications
- Account settings

The business workspace should look like part of STYLEATLAS, not a generic purchased admin template.

## Administration

- Users and roles
- Business listings
- Approval queues
- Verification requests
- Categories and taxonomy
- Cities and states
- Reviews and reports
- Quote and message moderation
- Products and orders
- Payments and refunds
- Jobs
- Events
- Schools and courses
- Editorial content
- Homepage features
- Advertising and sponsorship
- Plans and promo codes
- Newsletter subscribers
- Contact submissions
- Analytics
- SEO metadata
- Platform settings
- Audit logs

## Core database entities

Create migrations and indexes for:

- users
- profiles
- roles
- user_roles
- businesses
- business_locations
- categories
- subcategories
- business_categories
- services
- service_prices
- portfolios
- portfolio_media
- collections
- verification_requests
- availability
- reviews
- review_responses
- favourites
- comparisons
- recently_viewed
- quote_requests
- quote_responses
- conversations
- messages
- appointments
- schools
- courses
- jobs
- job_applications
- events
- event_sessions
- event_registrations
- products
- product_variants
- inventory
- carts
- cart_items
- orders
- order_items
- payments
- refunds
- fulfilment_events
- subscriptions
- plans
- promotions
- articles
- article_categories
- authors
- article_entities
- newsletter_subscribers
- notifications
- contact_submissions
- reports
- moderation_cases
- audit_logs
- seo_metadata

Every table needs appropriate primary keys, foreign keys, indexes, timestamps, ownership rules and soft deletion where suitable.

## Trust rules

- Paid membership never creates a verification badge automatically.
- Sponsored placement must be labelled.
- Organic ranking and paid promotion must be separate.
- Reviews need purchase, enquiry or appointment verification signals where possible.
- Profile owners can respond to reviews but cannot silently remove them.
- Moderation actions need audit records.
- Personal contact details should not be exposed before product rules permit it.

## AI fashion concierge

Version one should use a guided recommendation flow based on structured profile data. Inputs include occasion, city, date, style, garment type, preferred colours and budget.

Build a provider adapter for a later OpenAI or Anthropic integration. Do not claim a model is active without credentials and server-side implementation. A deterministic local recommendation mode should remain available for development and testing.

## Monetisation

Suggested plans:

- Free Listing
- Professional
- Premium
- Fashion House
- School
- Enterprise

Paid tools may include increased portfolio limits, qualified lead tools, analytics, priority support, labelled featured placement, city-page promotion, editorial sponsorship, job packages, event promotion and marketplace seller tools.

Use Paystack test mode for subscriptions, promotions, job posting, event promotion and marketplace checkout. Secret keys remain server-side.

## SEO, AEO and machine-readable content

Implement:

- Unique metadata
- Canonical URLs
- XML sitemaps
- Image sitemap structure
- Robots rules
- Open Graph and social metadata
- Breadcrumbs
- Semantic heading order
- Search-friendly URLs
- Pagination metadata
- Correct noindex rules
- Redirect handling
- `llms.txt`
- Clear entity descriptions
- Answer-first summaries where helpful
- Useful FAQs
- Original category and city copy

Structured data should cover Organization, WebSite, SearchAction, BreadcrumbList, ItemList, LocalBusiness, ProfessionalService, EducationalOrganization, Course, Product, Offer, AggregateRating, Review, Event, JobPosting, Article, Person and FAQPage.

## Accessibility

Meet WCAG 2.2 AA. Include keyboard access, visible focus, skip navigation, semantic landmarks, form labels, validation announcements, dialog focus management, reduced-motion support, descriptive alternatives and touch targets suitable for mobile use.

## Performance

Target at least 90 performance and 95 for accessibility, best practices and SEO in representative production pages. Prefer server components, minimise client JavaScript, optimise images and fonts, prevent layout shift and use caching deliberately.

## Responsive acceptance sizes

- 1440 desktop
- 1280 laptop
- 1024 tablet landscape
- 768 tablet
- 430 mobile
- 390 mobile
- 360 mobile

Mobile is an authored layout. It is not a simple stack of desktop columns.

## Required production states

Every data-driven feature needs:

- Loading
- Success
- Empty
- Validation error
- Server error
- Permission denied
- Retry or offline state where useful

## Conversion acceptance rules

1. Treat the HTML, CSS and screenshots as the visual source of truth.
2. Preserve section order, copy intent, image crops, hierarchy and responsive behaviour.
3. Convert repeated patterns into reusable components without flattening page identity.
4. Connect every visible control to a route, modal, server action or clearly labelled unavailable state.
5. Do not omit inner pages because the homepage is complete.
6. Do not replace approved assets without written approval.
7. Run lint, strict type checks, tests, Playwright and a production build.
8. Capture converted screenshots and compare them with `/mockups`.
9. Document external credentials and any provider still operating in local demo mode.
10. Return a clean repository, migrations, seed data, `.env.example`, test results and final ZIP.
