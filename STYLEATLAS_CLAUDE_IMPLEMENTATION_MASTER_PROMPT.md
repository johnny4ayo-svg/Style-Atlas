# STYLEATLAS MASTER IMPLEMENTATION PROMPT FOR CLAUDE CODE

## Project

**Name:** STYLEATLAS  
**Type:** Luxury Nigerian fashion designers, brands, schools, professionals, marketplace, jobs, events and editorial directory platform  
**Approved design source:** `styleatlas-uiux-package.zip`

## Primary objective

Convert the supplied STYLEATLAS UI/UX design package into a complete, production-ready full-stack application.

The supplied package is the approved design source of truth. Your task is implementation, not redesign.

Do not simplify the layouts. Do not remove sections. Do not replace the design with a generic template. Do not reinterpret the visual identity. Do not create a different homepage. Do not stop after implementing the homepage. Inspect every file, reproduce the design accurately, connect every route and interaction, build the backend, test the application and prepare it for deployment.

---

## 1. Audit the supplied package before coding

Extract `styleatlas-uiux-package.zip`, then inspect every folder and file, including:

- Desktop and mobile mockups
- HTML pages
- CSS files
- JavaScript files
- JSON design tokens and data
- Logo files
- Icon files
- Image assets and credits
- Route map
- Component map
- User flows
- Database notes
- Full-stack specification
- Static preview
- Documentation files

Create these files before implementation begins:

- `IMPLEMENTATION_PLAN.md`
- `DESIGN_AUDIT.md`
- `PAGE_CHECKLIST.md`
- `COMPONENT_CHECKLIST.md`
- `ROUTE_IMPLEMENTATION_STATUS.md`
- `ASSET_MANIFEST.md`
- `BACKEND_IMPLEMENTATION_PLAN.md`
- `TESTING_CHECKLIST.md`

`DESIGN_AUDIT.md` must list every page, section, shared component, unique component, desktop layout, mobile layout, colour, font, spacing rule, border, radius, shadow, icon, image, button, form pattern, navigation behaviour, interaction and responsive change.

Do not begin by creating a new design system. The design system already exists.

---

## 2. Source-of-truth priority

When implementing, use this order:

1. Desktop and mobile mockup screenshots
2. Existing HTML structure
3. Existing CSS
4. Design token JSON
5. Component and page documentation
6. Existing JavaScript interactions
7. Written project notes

When files conflict, follow the version that most closely matches the approved screenshots.

---

## 3. Required stack

Use:

- Next.js latest stable version
- App Router
- React
- TypeScript with strict mode
- Tailwind CSS
- CSS variables for design tokens
- Shadcn UI only where it can be fully restyled to match the approved design
- Framer Motion for restrained motion
- Supplied SVG icons, with Lucide React only where no supplied icon exists
- React Hook Form
- Zod
- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage
- Supabase Row Level Security
- Next.js server actions and route handlers
- Paystack adapter
- Stripe-ready payment abstraction
- Resend email adapter
- PostHog integration structure
- Google Analytics integration structure
- Sentry integration structure
- Vitest
- React Testing Library
- Playwright
- Axe accessibility tests
- ESLint
- Prettier

Use npm unless an existing lock file requires another package manager.

---

## 4. Project architecture

Use a feature-based structure similar to:

```text
styleatlas/
  app/
    (marketing)/
    (directory)/
    (marketplace)/
    (editorial)/
    (auth)/
    (customer)/
    (business)/
    (admin)/
    api/
  components/
    layout/
    navigation/
    home/
    directory/
    profiles/
    marketplace/
    editorial/
    forms/
    dashboard/
    shared/
    ui/
  features/
    auth/
    directory/
    favourites/
    comparisons/
    quotes/
    messaging/
    bookings/
    marketplace/
    jobs/
    events/
    reviews/
    subscriptions/
    notifications/
    editorial/
  lib/
    supabase/
    payments/
    email/
    analytics/
    seo/
    validation/
    permissions/
    constants/
    utils/
  hooks/
  types/
  public/
    brand/
    icons/
    images/
  supabase/
    migrations/
    seed/
  emails/
  tests/
    unit/
    integration/
    e2e/
    accessibility/
  docs/
  static-preview/
```

Do not place everything in one directory or one large file.

---

## 5. Design fidelity rules

Reproduce the approved design as closely as possible.

Preserve:

- Obsidian black, ivory, champagne gold and bronze palette
- Editorial serif headings and modern sans-serif interface text
- Luxury Nigerian fashion photography
- STYLEATLAS logo and SA monogram
- Supplied icon system
- Exact section order
- Card proportions
- Image crops
- Container widths
- Border treatments
- Spacing rhythm
- Button shapes
- Header and footer composition
- Dashboard layouts
- Content density
- Editorial grids
- Directory filter system
- Mobile layouts

Do not introduce:

- Purple gradients
- Blue SaaS dashboard styles
- Generic glassmorphism
- Oversized rounded cards
- Floating blobs
- Generic template sections
- Emoji icons
- Unapproved fonts
- A different logo
- Cheap gold gradients
- Excessive animation
- Empty decorative areas
- Generic AI wording

At the approved viewport sizes, the implementation should visually match the supplied mockups.

---

## 6. Design tokens

Convert the approved design rules into reusable CSS variables and Tailwind extensions for:

- Backgrounds
- Surfaces
- Text colours
- Champagne gold and bronze accents
- Success, warning and error colours
- Border colours
- Font families
- Type scale
- Line heights
- Letter spacing
- Spacing scale
- Container widths
- Border radii
- Shadows
- Z-index values
- Animation durations
- Easing curves
- Breakpoints

Use `next/font` for approved fonts where possible. Do not substitute random colours or typography.

---

## 7. Logo and brand assets

Use the original files from the package:

- Main horizontal logo
- Stacked logo
- Dark-background logo
- Light-background logo
- Monochrome logo
- SA monogram
- Favicon
- App icon
- Social mark

Do not rebuild the logo with text, distort it, recolour it outside the approved variations or change its spacing.

Create:

- `app/favicon.ico`
- `app/icon.png`
- `app/apple-icon.png`
- Web manifest icons
- Open Graph brand image

---

## 8. Image implementation

Use the supplied local image assets. Do not hotlink production images.

For every image:

- Use `next/image`
- Preserve the approved crop
- Add width and height
- Add accurate alt text
- Add responsive `sizes`
- Prevent layout shift
- Use priority only above the fold
- Lazy-load offscreen images
- Keep meaningful filenames
- Use WebP or AVIF where suitable

Do not replace assets unless a file is unusable. Do not repeat the same model across unrelated sections.

---

## 9. Global navigation

Implement the approved custom header with:

- STYLEATLAS logo
- Home
- Designers
- Brands
- Schools
- Professionals
- Marketplace
- Jobs
- Events
- Inspiration
- Cities
- Search
- Saved profiles
- Login
- Add Your Business

Build premium mega menus where shown. Include category groups, featured links, cities, editorial items, business actions and imagery where the design includes it.

Add:

- Sticky state
- Scroll-state styling
- Active-route styling
- Keyboard navigation
- Escape-to-close
- Click-outside close
- Focus management

Implement the approved mobile menu. Do not use a basic unstyled drawer.

---

## 10. Homepage

Implement every section in the approved order:

1. Custom luxury header
2. Editorial hero
3. Directory search interface
4. Popular searches
5. Platform statistics
6. Category discovery
7. Featured designers and brands
8. Fashion inspiration grid
9. Discover by city
10. Designer spotlight
11. Marketplace preview
12. Latest fashion jobs
13. Upcoming events
14. Top fashion schools
15. Verified customer reviews
16. AI fashion concierge
17. Latest editorial stories
18. Business growth CTA
19. Premium footer

Every button must work. Every category, city, profile, product, job, event, school and article card must lead to a real route.

---

## 11. Search system

Implement homepage search fields for:

- Keyword
- Category
- City
- Speciality
- Budget

Search should generate meaningful URL parameters, for example:

```text
/designers?q=bridal&city=lagos&category=designer&budget=premium
```

Add search suggestions, popular searches, recent searches, keyboard navigation, clear controls, loading, errors, empty results and a custom mobile search experience.

---

## 12. Directory experience

Build working directories for:

- Designers
- Brands
- Fashion schools
- Stylists
- Bridal experts
- Tailors and ateliers
- Makeup artists
- Photographers
- Fabric and textile stores
- Models and agencies
- Accessories
- Footwear
- Jewellery

Support filters for:

- Keyword
- Category and subcategory
- City and state
- Price range
- Rating
- Verified only
- Remote clients
- Bridal
- Bespoke
- Ready-to-wear
- Menswear
- Womenswear
- Children’s fashion
- Delivery
- Consultation type
- Availability
- Language
- Sustainability features

Implement URL-based filter state, sorting, grid view, list view, map-ready view, pagination, save, compare, quick view, share, request quote, loading skeletons, error states and empty states.

Mobile directories must use the approved filter sheet.

---

## 13. Profile pages

Build adapted profile experiences for:

- Designer
- Fashion brand
- Fashion school
- Stylist
- Makeup artist
- Photographer
- Fabric store
- Modelling agency

Include relevant sections such as:

- Hero cover
- Logo or profile image
- Verification status
- Location
- Rating and review count
- Response time
- Price level
- Availability
- Save and share
- Contact
- Request quote
- Book consultation
- About
- Services
- Specialities
- Portfolio
- Collections
- Videos
- Pricing guide
- Areas served
- Opening hours
- Team
- Awards
- Press
- Reviews
- FAQs
- Similar professionals
- Related articles
- Report profile

Do not use one identical profile template for every business type. Adapt the information and layout.

Add mobile sticky actions for contact, quote, save and booking.

---

## 14. Marketplace

Implement:

- Marketplace landing page
- Product categories
- Product detail
- Cart
- Checkout
- Order confirmation
- Customer orders
- Seller product management

Product pages must include gallery, variants, size, colour, quantity, price, sale price, stock, seller, delivery, returns, save, add to cart, related products, recently viewed and reviews.

Persist cart state. Build checkout with contact information, address, delivery, order summary, discount code, Paystack test adapter, success and failure states.

Never hardcode production payment credentials.

---

## 15. Jobs

Implement jobs landing, filters, job detail, employer profile, post-a-job, saved jobs, applications and employer management.

Include title, employer, location, type, compensation, experience, skills, description, deadline, apply, save, share and related jobs.

Add `JobPosting` structured data.

---

## 16. Events

Implement events landing, filters, detail, organiser profile, submit event, registration, saved events and organiser management.

Include image, date, time, venue, city, organiser, tickets, description, schedule, speakers or designers, registration, share and related events.

Add Event structured data.

---

## 17. Fashion schools

Implement school directory, school profile, courses, course detail, enquiry, save and compare.

Include programmes, duration, tuition, entry requirements, teaching format, facilities, location, accreditation information, reviews, application process and contact details.

---

## 18. Editorial platform

Implement:

- Inspiration hub
- Article archive
- Categories
- Single article
- Designer interview
- Fashion collection
- Author page
- Search
- Related articles

Article pages must include hero, headline, excerpt, author, publication date, reading time, category, main image, correct H2 and H3 structure, pull quotes, captions, related businesses, related designers, related articles, share actions, newsletter CTA and author information.

Add Article structured data. Do not use thin placeholder articles.

---

## 19. City pages

Create unique pages for:

- Lagos
- Abuja
- Port Harcourt
- Benin City
- Ibadan
- Enugu
- Calabar
- Kano
- Kaduna
- Uyo
- Warri
- Abeokuta

Each page needs a unique hero, local fashion overview, featured designers, brands, bridal professionals, schools, events, popular categories, city-specific editorial content, FAQs and internal links.

Do not duplicate the same page and only swap the city name.

---

## 20. Authentication

Use Supabase Auth for:

- Customer
- Fashion professional
- Fashion business
- School administrator
- Employer
- Event organiser
- Editor
- Administrator

Implement registration, login, logout, email verification, forgot password, reset password, protected routes, session handling, role assignment, account deletion, profile completion and terms acceptance.

Prepare social login through Supabase provider configuration. Provide a local demo mode when credentials are missing.

---

## 21. Customer dashboard

Implement:

- Overview
- Saved profiles
- Saved products
- Comparisons
- Quote requests
- Messages
- Appointments
- Orders
- Reviews
- Recently viewed
- Notifications
- Account settings
- Privacy settings

Use realistic demo data and complete loading, error and empty states.

---

## 22. Business dashboard

Implement:

- Overview
- Profile completion
- Listing editor
- Business details
- Portfolio
- Collections
- Services and pricing
- Enquiries
- Quote responses
- Messages
- Consultation requests
- Reviews
- Analytics
- Leads
- Subscription
- Billing
- Verification
- Promotions
- Jobs
- Events
- Products
- Orders
- Team members
- Notifications
- Settings

Preserve the supplied dashboard design. Do not replace it with a generic admin template.

Every data screen needs loading, empty, error, success, confirmation and validation states.

---

## 23. Admin dashboard

Implement role-protected admin areas for:

- Users
- Businesses
- Listing approvals
- Verification applications
- Categories and subcategories
- Cities and states
- Reviews
- Reports
- Quote requests
- Conversations
- Products
- Orders
- Payments and refunds
- Jobs
- Events
- Schools
- Editorial content
- Homepage features
- Advertising
- Plans
- Promo codes
- Newsletter
- Contacts
- Analytics
- SEO metadata
- Settings
- Moderation logs

Support search, filters, sorting, pagination, bulk actions, detail drawers, approvals, rejection reasons, confirmations, audit trails and role permissions.

---

## 24. Database

Create Supabase migrations for at least:

- users
- profiles
- roles
- user_roles
- businesses
- business_categories
- categories
- subcategories
- services
- service_prices
- locations
- cities
- states
- portfolios
- portfolio_media
- collections
- verification_requests
- reviews
- review_responses
- favourites
- comparisons
- comparison_items
- recently_viewed
- quote_requests
- quote_responses
- conversations
- conversation_participants
- messages
- appointments
- schools
- courses
- jobs
- job_applications
- events
- event_registrations
- products
- product_variants
- carts
- cart_items
- orders
- order_items
- payments
- subscriptions
- plans
- promotions
- articles
- article_categories
- article_tags
- authors
- newsletter_subscribers
- notifications
- contact_submissions
- reports
- audit_logs
- seo_metadata

Add UUID primary keys, foreign keys, indexes, unique constraints, timestamps, soft deletes where appropriate, status enums, audit fields, Row Level Security, role policies, storage policies and seed data.

Document everything in `DATABASE_SCHEMA.md`.

---

## 25. Demo data

Create fictional Nigerian demo data with at least:

- 30 designers
- 20 fashion brands
- 12 schools
- 15 stylists
- 12 makeup artists
- 12 photographers
- 15 fabric stores
- 10 agencies
- 40 products
- 20 jobs
- 15 events
- 25 articles
- 50 reviews
- 12 Nigerian cities

Do not present real designers as members unless permission is confirmed. Label all seeded records as demo data in the documentation.

---

## 26. Favourites and comparison

Implement saved profiles and products.

Allow comparison of up to four profiles using category, city, rating, price level, specialities, services, availability, verification, consultation type, delivery and response time.

Persist data in Supabase for logged-in users and local storage for guests. Merge guest state after login where practical.

---

## 27. Quote requests

Implement a complete workflow.

Customer fields:

- Service
- Garment type
- Occasion
- Event date
- Budget
- City
- Measurements
- Style description
- Colours
- Reference uploads
- Delivery requirements
- Contact preference

Business actions:

- Accept
- Decline
- Ask question
- Send quote
- Update quote
- Mark booked
- Mark completed

Customer actions:

- Review quote
- Accept
- Decline
- Message provider
- Track status

Trigger in-app notifications and email adapter events.

---

## 28. Messaging

Implement conversation list, conversation view, unread counts, timestamps, attachment-ready interface, quote-linked messages, appointment-linked messages, mobile layout, empty state and loading state.

Use Row Level Security so only conversation members can read messages.

---

## 29. Bookings

Implement consultation request, date and time selection, in-person or virtual option, provider availability, booking status, rescheduling, cancellation, customer view, business view and notifications.

Store dates in UTC and display them in the user’s locale and timezone.

---

## 30. AI fashion concierge

The first version must work without an external AI API.

Build a guided recommendation flow using:

- Occasion
- City
- Service
- Style
- Budget
- Date
- Garment type
- Preferred colours
- Customer type
- Remote or local preference

Rank matching professionals from stored data.

Create adapters for future OpenAI and Anthropic connections. Do not claim live AI unless a real model is configured.

Add demo mode, loading, no match, error, restart, save and contact actions.

---

## 31. Payments

Build a provider abstraction.

Primary provider: Paystack.  
Future provider: Stripe.

Support marketplace checkout, subscriptions, featured listings, job posts, event promotion and advertising packages.

Implement test-mode initialisation, callbacks, webhook-ready routes, verification, success, failure, pending state, payment records and idempotency.

Keep secret keys server-side.

---

## 32. Email and notifications

Create Resend-ready templates for:

- Welcome
- Email verification
- Password reset
- Quote received
- Quote response
- New message
- Appointment request
- Appointment confirmation
- Appointment cancellation
- Order confirmation
- Payment confirmation
- Event registration
- Job application
- Verification approval
- Verification rejection
- Subscription receipt

Create corresponding in-app notifications. The app must still run in local demo mode without Resend credentials.

---

## 33. SEO, AEO and AI search readiness

Implement:

- Unique metadata
- Dynamic titles and descriptions
- Canonicals
- Open Graph
- Twitter cards
- XML sitemap
- robots.txt
- Breadcrumbs
- Semantic headings
- Internal linking
- Pagination metadata
- Alt text
- Noindex rules for private and duplicate pages
- Redirects
- Custom 404
- `llms.txt`

Add structured data for:

- Organization
- WebSite
- SearchAction
- BreadcrumbList
- ItemList
- LocalBusiness
- ProfessionalService
- EducationalOrganization
- Course
- Product
- Offer
- AggregateRating
- Review
- Event
- JobPosting
- Article
- Person
- FAQPage

Validate JSON-LD.

---

## 34. Content rules

Use supplied copy where available. New copy must match STYLEATLAS, sound natural, use Nigerian fashion language where appropriate and avoid keyword stuffing.

Do not use Lorem ipsum, generic AI phrases, invented awards, invented partnerships, false customer claims or unsupported statistics.

---

## 35. Accessibility

Target WCAG 2.2 AA.

Implement semantic HTML, keyboard navigation, visible focus, skip link, form labels, error announcements, accessible modals, focus trapping, Escape handling, descriptive labels, screen-reader text, alt text, reduced motion, colour contrast, touch targets, accessible tables, dropdowns, carousels and pagination.

Run Axe tests and repair serious and critical issues.

---

## 36. Responsive behaviour

Test at:

- 1440px
- 1280px
- 1024px
- 768px
- 430px
- 390px
- 360px

Follow the supplied mobile mockups. Do not merely stack desktop columns.

Implement mobile-specific hero, navigation, filters, profile actions, dashboards, tables, forms, comparison, marketplace and article typography.

No page may have unintended horizontal scrolling.

---

## 37. Motion

Use restrained motion for header transitions, card hover, image reveal, filter panels, modals, tabs, save feedback, counters, section entrance and button response.

Respect `prefers-reduced-motion`. Avoid continuous floating, heavy parallax, slow loading animation and distracting text effects.

---

## 38. Loading, empty and error states

Every data-driven section needs loading, empty, error, retry and success states where relevant.

Create STYLEATLAS-specific states for no results, no saved items, empty cart, no jobs, no events, no messages, no quotes, no appointments, no reviews, no notifications, payment failure, network error, permission denied and missing pages.

---

## 39. Preserve the static preview

Keep the supplied static HTML preview under:

```text
/static-preview
```

The Next.js app is the production application. The static preview remains an offline design reference.

---

## 40. Required routes

Build and connect every route represented in the package. At minimum:

```text
/
/designers
/designers/[slug]
/brands
/brands/[slug]
/schools
/schools/[slug]
/schools/[slug]/courses/[courseSlug]
/stylists
/stylists/[slug]
/bridal
/tailors
/makeup-artists
/photographers
/fabric-stores
/models-agencies
/accessories
/footwear
/jewellery
/marketplace
/marketplace/[category]
/products/[slug]
/cart
/checkout
/checkout/success
/jobs
/jobs/[slug]
/jobs/post
/events
/events/[slug]
/events/submit
/inspiration
/articles
/articles/[slug]
/categories/[slug]
/authors/[slug]
/collections/[slug]
/cities
/cities/[slug]
/search
/compare
/saved
/recently-viewed
/request-quote
/fashion-concierge
/pricing
/add-your-business
/business-onboarding
/verification
/advertise
/about
/contact
/help
/faq
/terms
/privacy
/cookies
/editorial-policy
/review-policy
/community-guidelines
/accessibility
/login
/register
/forgot-password
/reset-password
/customer
/customer/saved
/customer/comparisons
/customer/quotes
/customer/messages
/customer/appointments
/customer/orders
/customer/reviews
/customer/settings
/business
/business/profile
/business/portfolio
/business/services
/business/enquiries
/business/quotes
/business/messages
/business/appointments
/business/reviews
/business/analytics
/business/subscription
/business/billing
/business/verification
/business/products
/business/orders
/business/jobs
/business/events
/business/team
/business/settings
/admin
/admin/users
/admin/businesses
/admin/verifications
/admin/categories
/admin/locations
/admin/reviews
/admin/reports
/admin/products
/admin/orders
/admin/payments
/admin/jobs
/admin/events
/admin/schools
/admin/articles
/admin/advertising
/admin/plans
/admin/newsletter
/admin/contacts
/admin/analytics
/admin/seo
/admin/settings
/admin/audit-logs
```

No menu, footer or CTA may point to a missing route.

---

## 41. Reusable components

Create reusable components for header, mega menu, mobile navigation, footer, search, filters, profile cards, product cards, job cards, event cards, school cards, article cards, review cards, city cards, stats, breadcrumbs, pagination, modal, drawer, tabs, forms, alerts, toasts, empty states, skeletons, dashboard navigation, tables and charts.

Do not force visually different sections into one generic component.

---

## 42. Security

Implement secure authentication, server-side permission checks, Row Level Security, input validation, output encoding, upload restrictions, allowed MIME types, file size limits, rate-limit adapter structure, secure payment verification, webhook signature verification, environment validation, safe errors, admin protection, audit logging and no committed secrets.

Document decisions in `SECURITY_NOTES.md`.

---

## 43. Environment variables

Create `.env.example`:

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
PAYSTACK_PUBLIC_KEY=
PAYSTACK_SECRET_KEY=
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
NEXT_PUBLIC_GA_ID=
SENTRY_DSN=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
```

Validate variables on startup and provide local demo fallbacks where possible.

---

## 44. Testing

Create unit, integration, E2E and accessibility tests for:

- Homepage
- Header and mobile menu
- Directory filters
- Search parameters
- Save and compare
- Profiles
- Quote validation
- Auth and roles
- Cart and checkout
- Jobs
- Events
- Articles
- Customer dashboard
- Business dashboard
- Admin protection
- Forms
- Responsive behaviour
- Accessibility
- Broken links

Playwright journeys must include:

### Customer

1. Search for a verified bridal designer in Lagos.
2. Save and compare a profile.
3. Open the profile.
4. Submit a quote request.
5. View it in the customer dashboard.

### Business

1. Register a business.
2. Complete onboarding.
3. Add services and portfolio.
4. Receive an enquiry.
5. Reply with a quote.
6. View analytics.

### Marketplace

1. Open a product.
2. Select a variant.
3. Add to cart.
4. Complete test checkout.
5. View confirmation.

### Admin

1. Log in as admin.
2. Review a pending business.
3. Approve verification.
4. Review reported content.
5. Inspect the audit log.

---

## 45. Visual comparison

After each major page:

1. Run the app.
2. Capture a screenshot at the same viewport as the supplied mockup.
3. Compare them side by side.
4. Correct spacing, type, widths, crops, proportions, alignment and responsive behaviour.

Capture at least:

- Homepage desktop and mobile
- Directory desktop and mobile
- Profile desktop and mobile
- Marketplace desktop and mobile
- Article desktop and mobile
- Business dashboard desktop
- Customer dashboard mobile
- Admin dashboard desktop

Store them in:

```text
/design/implementation-screenshots
```

Do not claim visual completion without this comparison.

---

## 46. Performance

Target Lighthouse:

- Performance 90+
- Accessibility 95+
- Best Practices 95+
- SEO 95+

Use server components where appropriate, minimal client JavaScript, dynamic imports, image and font optimisation, route splitting, caching, stable dimensions, efficient queries, skeleton loading and no unnecessary dependencies.

---

## 47. Documentation

Create or update:

- `README.md`
- `SETUP.md`
- `DEPLOYMENT.md`
- `DESIGN_SYSTEM.md`
- `BRAND_GUIDELINES.md`
- `DATABASE_SCHEMA.md`
- `ROUTE_MAP.md`
- `COMPONENT_MAP.md`
- `USER_FLOWS.md`
- `SEO_STRATEGY.md`
- `CONTENT_GUIDE.md`
- `IMAGE_CREDITS.md`
- `TEST_REPORT.md`
- `SECURITY_NOTES.md`
- `CHANGELOG.md`
- `DEMO_ACCOUNTS.md`
- `IMPLEMENTATION_STATUS.md`

`README.md` must include overview, stack, features, installation, environment setup, database setup, seed commands, development, tests, build, deployment and demo accounts.

---

## 48. Demo accounts

Create local seeded accounts for:

- Customer
- Designer
- Fashion brand
- School administrator
- Employer
- Event organiser
- Editor
- Administrator

Use development-only credentials and document them in `DEMO_ACCOUNTS.md`.

---

## 49. Build and validation

Run:

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run build
npx playwright test
```

Also verify:

- No TypeScript errors
- No ESLint errors
- No broken local links
- No missing assets
- No console errors
- No hydration errors
- No invalid HTML nesting
- No empty image sources
- No `href="#"`
- No Lorem ipsum
- No dead buttons
- No unintended horizontal overflow
- No exposed secrets

Record real results in `TEST_REPORT.md`. Do not mark a test as passed unless it ran successfully.

---

## 50. Completion conditions

The project is complete only when:

- Every supplied screen is implemented
- Homepage matches the design
- Mobile screens match the mobile design
- Every route exists
- Every menu and footer link works
- Every button performs an action
- Forms validate
- Search and filters work
- Save and comparison work
- Quote requests work
- Auth works
- Customer, business and admin dashboards work
- Cart and test checkout work
- Database migrations and RLS exist
- Seed data exists
- Tests run
- Production build succeeds
- Documentation is complete
- No real credentials are included

Where credentials are missing, create a complete adapter and local demo mode. Do not delete the feature.

---

## 51. Working phases

Work in this sequence:

1. Audit the supplied package.
2. Set up the app and design system.
3. Build global navigation, footer and shared components.
4. Implement the homepage accurately.
5. Implement directories and profile pages.
6. Implement marketplace, jobs, events, schools and editorial.
7. Implement authentication and dashboards.
8. Implement Supabase schema, policies and seed data.
9. Implement payments, email, notifications and AI concierge adapters.
10. Complete SEO, accessibility and performance.
11. Run visual comparisons and repair differences.
12. Run tests, production build and final validation.

Update `IMPLEMENTATION_STATUS.md` after each phase. Do not ask for approval after every minor file. Continue until the entire implementation is complete.

---

## 52. No-omission audit

Before completion, compare:

- Extracted package page list
- `PAGE_CHECKLIST.md`
- Actual Next.js route tree
- Navigation links
- Footer links
- Sitemap routes

Mark each page as implemented, tested, responsive, linked, SEO complete and accessible.

Nothing may remain planned or pending.

---

## 53. Final delivery

After implementation:

1. Remove temporary files.
2. Keep the original design package under `/design/source`.
3. Keep the static preview.
4. Keep implementation screenshots.
5. Keep `.env.example`.
6. Remove real `.env` files.
7. Confirm the production build.
8. Create:

```text
styleatlas-fullstack-production.zip
```

The ZIP must contain source code, assets, logos, icons, migrations, seed data, tests, documentation, static preview, screenshots, environment example and lock file.

At the end report:

1. Completion summary
2. Project directory
3. ZIP location
4. Installation commands
5. Database setup commands
6. Development command
7. Test results
8. Build result
9. Demo accounts
10. Features requiring external credentials
11. Remaining limitations

Do not hide unfinished work or describe planned features as completed.

---

## 54. Final instruction

The STYLEATLAS design package is already approved.

Your task is implementation, not redesign.

Inspect it carefully, preserve its visual identity, implement every connected screen, complete the full-stack architecture and deliver a tested production-ready application.

Begin by extracting and auditing `styleatlas-uiux-package.zip`.
