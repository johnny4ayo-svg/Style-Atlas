# STYLEATLAS DESIGN-FIDELITY AND COMPLETION CORRECTION PROMPT

Perform a strict design-fidelity and completion audit.

Compare the implementation against every desktop and mobile mockup inside the original STYLEATLAS design package.

Do not redesign anything.

Check:

- Page width
- Section order
- Typography
- Header height
- Navigation spacing
- Hero composition
- Image dimensions
- Image crops
- Search form proportions
- Category cards
- Designer cards
- Editorial grids
- City cards
- Profile layouts
- Dashboard layouts
- Footer structure
- Desktop responsive behaviour
- Mobile responsive behaviour
- Button styles
- Borders
- Colours
- Spacing
- Icons
- Text alignment
- Missing sections
- Missing pages
- Broken routes
- Dead controls

Open `PAGE_CHECKLIST.md` and verify every page against the actual route tree.

Open `COMPONENT_CHECKLIST.md` and verify every component is implemented.

Open `ROUTE_IMPLEMENTATION_STATUS.md` and repair every incomplete route.

Capture updated screenshots at the same viewport sizes as the supplied mockups and compare them side by side.

Repair every visible difference that can be corrected with HTML, CSS, React or responsive rules.

Then run:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npx playwright test
```

Update `TEST_REPORT.md` and `IMPLEMENTATION_STATUS.md` with the real results.

Do not finish while any required page, section, route, interaction or responsive state remains incomplete.
