# Claude Code Handoff Prompt

You are converting the attached STYLEATLAS static UI/UX package into a production-grade Next.js full-stack application.

## Source of truth

Treat the supplied HTML pages, CSS, SVG brand assets, SVG icon sprite, images, mockups and JSON data as the approved design source of truth.

Do not redesign, simplify, omit, replace or merge approved sections without written approval. Do not add a generic SaaS visual style. Do not replace the STYLEATLAS logo or colour system.

## Conversion rules

1. Build with Next.js App Router, TypeScript strict mode, Tailwind CSS and Supabase.
2. Convert repeated patterns into reusable components while preserving their rendered appearance.
3. Preserve the responsive behaviour at 1440 px, 1024 px, 768 px, 430 px, 390 px and 360 px.
4. Use the local images and SVG assets in `public` with Next.js Image where appropriate.
5. Implement the route plan in `docs/ROUTE_MAP.md`.
6. Implement the data and security plan in `docs/FULL_STACK_SPEC.md`.
7. Keep verification separate from paid subscriptions and sponsored placement.
8. Use fictional seed businesses. Do not imply that real designers are registered members.
9. Connect every visible button to a real route, modal, server action or intentionally labelled disabled state.
10. Implement loading, empty, error and permission states for every data-driven feature.
11. Do not claim that payments, email or AI matching work until the provider adapter and environment configuration are complete.
12. Use Paystack as the primary Nigerian payment provider with an abstract interface for Stripe.
13. Use Supabase Row Level Security and server-side permission checks.
14. Run lint, type checking, unit tests, Playwright tests and a production build before packaging.

## Visual acceptance

Capture screenshots of the converted application and compare them with the supplied `/mockups` images. Fix spacing, typography, image cropping, card dimensions, responsive order and mobile navigation before declaring completion.

## Completion evidence

Return:

- Working repository
- Database migrations and seed data
- `.env.example`
- Test results
- Route coverage report
- Screenshot comparison set
- List of external credentials still required
- Final ZIP package
