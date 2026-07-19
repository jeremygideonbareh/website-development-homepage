# Rogue Code — Pricing Honesty + Real Project Showcase

Replace subscription-style monthly/yearly pricing with honest one-time project fees, swap third-party example sites for real Rogue Code client projects, replace JMJ with Kiki's portfolio, fix rendering bugs in AboutUs and ServicesSection, and unify tier names across all components.

## TL;DR (For humans)

**Pricing:** The current monthly/yearly toggle (₹7K/mo → ₹70K/yr) makes it look like a SaaS subscription. We own the code — clients pay once and own everything. Change to one-time fees with payment terms ("50% upfront, 50% on delivery").

**Case Studies:** JMJ Events was replaced by Kiki's portfolio in the live product. With the recent project URL mapping, we know Kiki's repo exists and deploys to GitHub Pages. Swap JMJ → Kiki in CaseStudiesSection.

**Examples:** ServicesSection shows Awwwards/third-party sites (Mod Mutt Salon, Indaba Coffee, Cuberto, etc.) that Rogue Code didn't build. Replace with real client projects showing preview screenshots.

**Bugs:** `service.from` renders `undefined` in ServicesSection (no `from` field in services array). Mobile heading overflow in AboutUs needs `max-w-3xl` on KineticText h2s.

**LeadForm:** Tier name "The Apex Architecture" should be "The Rogue Architecture" for brand consistency. Missing 4th "The Custom Animated Experience" tier.

## Scope In
- PricingSection: Replace monthlyPrice/yearlyPrice with single `price` + `paymentTerms`
- PricingSection: Delete BillingToggle component and isYearly state
- CaseStudiesSection: Replace JMJ entry (lines 41-50) with Kiki Garod Filmmaker Portfolio
- ServicesSection: Replace all external example websites with real Rogue Code project URLs
- ServicesSection: Fix `service.from` — add `from` field to all 4 services OR remove from template
- ExamplesPage: Replace all third-party example sites with Rogue Code projects
- LeadForm: Rename "The Apex Architecture" → "The Rogue Architecture"
- LeadForm: Add 4th tier "The Custom Animated Experience"
- AboutUs: Fix mobile heading overflow on 6 KineticText h2s with `max-w-3xl`
- AboutUs: Change `md:overflow-x-hidden` to `overflow-x-hidden` at line 316

## Scope Out
- No pricing amount changes — only billing model change (monthly/yearly → one-time)
- No new sections or pages
- No i18n text changes beyond what's needed for pricing model
- No backend/api changes
- No font or design system changes

## TODOs

- [x] 1. PricingSection: Replace monthly/yearly toggle with one-time pricing + payment terms
- [x] 2. CaseStudiesSection: Replace JMJ Events with Kiki Garod Filmmaker Portfolio
- [x] 3. ServicesSection: Replace external example sites with real Rogue Code project URLs
- [x] 4. ServicesSection: Fix `service.from` bug — add missing `from` fields to all services
- [x] 5. ExamplesPage: Replace all third-party example sites with real Rogue Code client projects
- [x] 6. LeadForm: Fix tier names — "The Apex Architecture" → "The Rogue Architecture", add 4th tier
- [x] 7. AboutUs: Fix mobile heading overflow on 6 KineticText h2s + overflow-x-hidden
- [x] 8. Build & verify: `npm run build` passes, no lsp_diagnostics errors

## Final Verification Wave

- [x] F1. Momus Plan Review — Verify all TODOs are complete and meeting acceptance criteria
- [x] F2. Build verification — `npm run build` exits 0 with no errors
- [x] F3. Pricing renders one-time prices (no monthly/yearly toggle visible)
- [x] F4. No third-party example sites remain in ServicesSection or ExamplesPage

## Success Criteria

- [ ] `npm run build` passes with exit code 0
- [ ] PricingSection shows one-time prices with payment terms, no toggle
- [ ] CaseStudiesSection shows Kiki's portfolio instead of JMJ
- [ ] ServicesSection shows only real Rogue Code projects
- [ ] ExamplesPage shows only real Rogue Code projects
- [ ] LeadForm has "The Rogue Architecture" and "The Custom Animated Experience" tiers
- [ ] AboutUs headings wrap correctly on mobile (no overflow)
- [ ] No `undefined` values rendered in ServicesSection `from` badges
- [ ] `lsp_diagnostics` clean (no errors)
