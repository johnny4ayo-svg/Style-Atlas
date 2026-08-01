# STYLEATLAS UI/UX and Full-Stack Handoff Package

STYLEATLAS is a premium Nigerian fashion discovery platform concept covering designers, brands, schools, stylists, marketplace products, jobs, events, editorial content, customer accounts, business accounts and platform administration.

This ZIP contains a responsive multi-page frontend prototype, original SVG branding, a custom SVG icon system, licensed stock photography stored locally, sample data, desktop and mobile mockups, route documentation and a detailed Claude conversion brief.

## Open the prototype

Run a local server from this folder:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173/index.html
```

Opening files directly also works for most pages, but a local server gives the most reliable SVG and JavaScript behaviour.

## Main screens

- `index.html`: full homepage
- `directory.html`: filters, search results, save and compare interactions
- `profile.html`: premium designer profile, portfolio, services and quote modals
- `marketplace.html`: product catalogue
- `product.html`, `cart.html`, `checkout.html`: commerce flow
- `article.html`: editorial story template
- `jobs.html`, `job-detail.html`: fashion recruitment
- `events.html`, `event-detail.html`: events discovery
- `concierge.html`: guided fashion matching interface
- `dashboard.html`: business dashboard
- `customer-dashboard.html`: customer account dashboard
- `admin-dashboard.html`: administrator dashboard
- `login.html`: authentication screen
- `add-business.html`: business onboarding
- `pricing.html`: membership plans
- `style-guide.html`: visual design system

## Important scope note

This is a frontend design and handoff package. Buttons and forms demonstrate intended interactions without pretending that a database, payment gateway, email provider or authentication server is already active. `docs/FULL_STACK_SPEC.md` explains how Claude should connect the final Next.js and Supabase application.

## Quality checks

```bash
python3 scripts/check_links.py
```

The package includes local images, SVG logos and an SVG icon sprite. No hidden credentials are included.
