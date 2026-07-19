# Plan: mobile-heading-clip-fix

## TODOs

1. [x] Fix src/components/RevealText.jsx: CharReveal `className="inline"` → `className="inline-block"`
2. [x] Fix src/components/RevealText.jsx: KineticText `display: inline` → `display: inline-block`
3. [x] Fix src/App.jsx: Add `break-words` class to 3 h2 elements in "Our philosophy" section
4. [x] Verify: `npm run build` exits with code 0
5. [x] Deploy to Vercel (commit + push to main, live on rogue.codes)

## Final Verification Wave

F1. [x] Live rogue.codes page renders all philosophy section headings without clipping on mobile viewport (360px)
F2. [x] AboutUs page kinetic headings render without clipping on mobile

## Success Criteria

1. CharReveal character spans use `inline-block` instead of `inline` — enabling CSS transforms to work correctly and fixing mobile word-breaking.
2. KineticText character spans use `inline-block` instead of `inline` — same fix for AboutUs kinetic animation headings.
3. h2 elements in App.jsx philosophy section have `break-words` class as belt-and-suspenders protection.
4. Build succeeds with zero errors.
5. Changes are deployed to rogue.codes and visible at live URL.
6. Mobile viewport (~360px) headings are fully visible — NOT clipped.

## Evidence Required

- Build output showing exit code 0
- Live URL showing fixed headings on mobile viewport
- Screenshot or Playwright snapshot at 360px width confirming no clipping

## Dependencies

- `src/components/RevealText.jsx`
- `src/App.jsx`
- Vercel deployment access (main branch)
