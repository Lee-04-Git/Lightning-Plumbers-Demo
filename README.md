# Plumb It Right CPT: website concept

A website concept for **Plumb It Right CPT**, a plumbing business in Portland, Mitchell's Plain, Cape Town. It was built independently as a proposal for the owner. It is **not** the official site and the owner has not yet approved it.

**Stack:** Vite · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react

```bash
npm install
npm run dev       # local preview at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build
npm run images    # regenerate optimised images from assets/source/
```

## Editing content

All business details live in **`src/config/site.ts`**: phone, WhatsApp, Facebook, location, service area, hours, services, reviews and photo credits. Components read from this file, so most updates don't touch any component code.

| To change… | Edit |
| --- | --- |
| Phone / WhatsApp number | `site.phone`, `site.whatsapp` |
| Service area, street address | `site.serviceArea`, `site.location` (`showStreetAddress`) |
| Business hours | `site.hours` (hidden while `null`) |
| Services (add or remove) | `services` / `moreServices` arrays (photos for the Services page are listed in `src/pages/ServicesPage.tsx`) |
| Reviews (About Us page) | `reviews` array |
| Showcase projects | `projects` array |
| Logo | replace `assets/source/logo-facebook.jpg`, run `npm run images` |
| Photos | replace the matching file in `assets/source/` (same name), run `npm run images` |

## Awaiting owner confirmation

These details are shown on the site but still need the owner's sign-off (tracked with `confirmed: false` in `src/config/site.ts`, not shown to visitors).

- [x] Phone number and WhatsApp **+27 81 583 2999** (confirmed by the client)
- [ ] **Service area** wording ("Mitchell's Plain & greater Cape Town")
- [ ] Whether **Nile Way, Portland, 7785** may be shown publicly (currently hidden)
- [ ] Email address **Plumbitrightcpt@gmail.com** (from the flyer)
- [ ] Business hours, any additional services
- [ ] Permission to use the reviews and the logo on the website

**Before launch:** mark the confirmed fields `confirmed: true` and remove the `<meta name="robots" content="noindex, nofollow">` line from `index.html`.

## Content principles

Nothing has been invented. No registration details, qualifications, years in business, guarantees, prices or extra services appear on the site. The "Why choose" points come directly from the supplied reviews and the business's own Facebook description. Theo Oliver's longer review was truncated in the source material, so it is shown as a labelled summary of the visible content rather than as a quote.

## Page banners

Every page opens with a full-width photo banner (`src/components/layout/Banner.tsx`). The images are wide crops of the business's own job photos, made by `npm run images` (see `BANNERS` in `scripts/optimize-images.mjs`).

To use your own artwork instead, for example AI-generated images:

1. Save it as `assets/source/banners/<page>.jpg` (`home`, `about`, `services`, `showcase` or `contact`). A wide image of at least 1600px works best.
2. Run `npm run images`.
3. Update that banner's `alt` text in `banners` in `src/config/site.ts`.

## Pages

Home · About Us · Services · Showcase · Contact. Old `/projects` and `/testimonials` URLs redirect to Showcase and About Us. The Contact page shows only the phone number and email as contact details, plus a WhatsApp button (`https://wa.me/27815832999`, with a prefilled message).

## Enquiry form

There is no backend. The form validates the input, then opens **WhatsApp** or the visitor's **email** app with the enquiry written out. It clearly tells the visitor that nothing is sent until they press Send in that app. No fake success message is shown. To collect enquiries directly later, connect a form service (e.g. Formspree or Netlify Forms) in `src/components/contact/EnquiryForm.tsx`.

## Images

- **Logo:** the business's own logo from its Facebook page, converted to transparent navy and white PNGs by `scripts/optimize-images.mjs`.
- **Photos:** the business's own job photos, from posts on its Facebook page.

## Deploying

`npm run build` type-checks the code and writes a static site to `dist/` (about 8 MB, mostly photos). Upload that folder to any static host, or connect the project and let the host build it. Node **20.19+** or **22.12+** is required (set in `package.json`).

| Host | Build command | Output folder | Already configured |
| --- | --- | --- | --- |
| Vercel | `npm run build` | `dist` | `vercel.json`: page routing, caching, missing files return 404 |
| Netlify | `npm run build` | `dist` | `public/_redirects` and `public/_headers`: the same rules |
| Cloudflare Pages | `npm run build` | `dist` | page routing works out of the box |

Check a build locally with `npm run preview`.

### Before going live

- [ ] **Search engines:** `index.html` contains `<meta name="robots" content="noindex, nofollow">`, which keeps the site out of Google. Remove that line when the owner approves the site.
- [ ] **Social previews:** change `og:image` in `index.html` to the full address once the domain is known, e.g. `https://example.co.za/images/og-image.jpg`. Facebook and WhatsApp need the full address to show the preview image.
- [ ] Confirm the email address and the other details listed under "Awaiting owner confirmation".
