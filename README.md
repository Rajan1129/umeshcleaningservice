# Umesh Cleaning Services — MERN website

A production-ready website for Umesh Cleaning Services, a house cleaning service in Jalandhar, Punjab.
React + Vite + Tailwind on the front end, Express + MongoDB on the back end, with a JWT-protected admin panel.

**No prices appear anywhere on the public site.** Every service leads to a call, a WhatsApp message, or the
booking form instead. There is no price field in any model, page or component.

---

## Quick start

You need Node 18+ and MongoDB (local, or a free MongoDB Atlas cluster).

### 1. Backend

```bash
cd server
npm install
cp .env.example .env        # then edit .env
npm run seed                # creates the admin login + loads the 13 services
npm run dev                 # http://localhost:5000
```

`.env` values:

| Variable | What it is |
|---|---|
| `PORT` | API port, e.g. `5000` |
| `MONGO_URI` | `mongodb://127.0.0.1:27017/umesh_cleaning` or your Atlas string |
| `JWT_SECRET` | A long random string — never commit it |
| `CLIENT_URL` | Front-end origin(s) allowed by CORS, comma-separated |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Used once by `npm run seed` to create the first admin |

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env        # set VITE_API_URL and VITE_SITE_URL
npm run dev                 # http://localhost:5173
```

Sign in to the admin panel at `/admin/login` with the email and password from the seed step.
Change that password after the first sign-in.

---

## What the owner manages from `/admin`

| Section | What it does |
|---|---|
| Dashboard | Counts for total, new, contacted, scheduled, completed and cancelled enquiries |
| Enquiries | Search, filter by status, open an enquiry, change status, add notes, call/WhatsApp in one tap, delete |
| Services | Add, edit, delete, upload a photo, rewrite descriptions and meta tags, hide a service |
| Gallery | Upload photos, set title, alt text and category, mark as before or after, delete |
| Before & After | Upload a before/after pair, publish or unpublish, delete |
| Reviews | Enter real Google reviews by hand |

---

## Photos

The site never passes a stock photo off as the business's own work. Where a photo is missing it shows a
labelled "Photo needed" placeholder instead.

- **Fixed page photos** (hero, deep cleaning, about, service pages) go in `client/public/images/` —
  see `client/public/images/README.md` for the exact file names.
- **Gallery and before/after photos** are uploaded through the admin panel, so they can change without
  a redeploy. Uploads land in `server/uploads/` and are served from `/uploads/...`.

The three Google Maps links supplied by the client are photo references for the kind of photography
needed. They are not embedded as images — download the real photos from the Google Business Profile and
add them through the admin panel or the `public/images` folder.

---

## Content honesty

The site deliberately contains no invented statistics, testimonials, certifications, awards, years in
business, employee counts or guarantees. The only numbers shown are the Google rating (4.8) and review
count (26) supplied by the business. `LocalBusiness` schema carries only the city, region, country and
phone number — no invented street address, opening hours or email.

If the business later supplies a street address, opening hours, an email or a GST number, add them in
`client/src/utils/constants.js` and `client/src/utils/seo.js`.

---

## SEO

- Unique title, meta description and canonical URL on every page (`components/Seo.jsx`)
- Open Graph and Twitter card tags
- `HouseCleaningService` (LocalBusiness) schema on the home, about, area and index pages
- `Service` schema on each of the 13 service pages
- `FAQPage` schema on the home page, FAQ page and every service page that has FAQs
- `BreadcrumbList` schema plus visible breadcrumbs
- Clean URLs: `/services/home-deep-cleaning`, `/cleaning-services-in-phagwara`
- One H1 per page, ordered H2/H3 beneath it
- `robots.txt` (admin disallowed) and a generated `sitemap.xml` — `npm run build` regenerates it
- Nine area pages, each with its own written content rather than the same paragraph with the town swapped

Before going live: set `VITE_SITE_URL` to the real domain, update the `Sitemap:` line in
`client/public/robots.txt`, and add `client/public/og-image.jpg` (1200×630).

---

## Performance and accessibility

- Route-level code splitting; the home page loads without the admin bundle
- Icons imported individually, not as a namespace
- `loading="lazy"` and `decoding="async"` on every image except the hero, which is eager and high priority
- Framer Motion used once, on the hero, rather than on every section
- `prefers-reduced-motion` respected globally
- Visible keyboard focus rings, skip-to-content link, labelled form fields, ARIA on the before/after
  slider (it is operable with arrow keys), lightbox closes on Escape

---

## Security

Helmet, CORS driven by `CLIENT_URL`, `express-mongo-sanitize`, rate limiting (global, plus tighter limits
on sign-in and the public booking form), bcrypt password hashing at cost 12, JWT auth on every write
endpoint, `express-validator` on all public input, upload restricted to images under 6 MB, and a central
error handler that hides stack traces in production. No secret is ever read from anywhere but `.env`.

---

## Deploying

**Backend** (Render, Railway, a VPS): set the env vars, run `npm start`. If you use a platform with an
ephemeral filesystem, move uploads to S3 or Cloudinary — the multer storage in
`server/middleware/upload.js` is the only file to change.

**Frontend** (Vercel, Netlify, Cloudflare Pages): build command `npm run build`, output `dist`. Add a
rewrite of all paths to `/index.html` so client-side routes work on refresh.

Then point `CLIENT_URL` at the deployed front end and `VITE_API_URL` at the deployed API.

---

## Project structure

```
client/
  public/images/            photos the business drops in (with a README naming each slot)
  scripts/generate-sitemap.mjs
  src/
    components/             Navbar, Footer, MobileCtaBar, BookingForm, ServiceCard, GalleryGrid
      home/                 one file per home-page section
      ui/                   SmartImage, BeforeAfterSlider, Lightbox, Accordion, CtaGroup, Breadcrumbs
      admin/                shared admin form and panel pieces
    data/                   services.json, areas.js, faqs.js
    hooks/                  useAuth, useApi, useServices
    layouts/                PublicLayout, AdminLayout
    pages/                  public pages + pages/admin
    routes/                 AppRoutes, ProtectedRoute
    services/api.js         fetch wrapper with token handling
    utils/                  constants, images, seo schema builders

server/
  config/                   db connection, shared constants
  controllers/              auth, bookings, services, gallery, before-after, reviews
  middleware/               auth, optionalAuth, validate, upload, errorHandler
  models/                   Admin, Booking, Service, Gallery, BeforeAfter, Review
  routes/                   one router per resource, mounted in routes/index.js
  utils/                    seed script, service content, ApiError, asyncHandler
  server.js
```

## API

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/login` | — | Admin sign in |
| GET | `/api/auth/me` | JWT | Current admin |
| PATCH | `/api/auth/password` | JWT | Change password |
| POST | `/api/bookings` | — | Public booking form |
| GET | `/api/bookings` | JWT | List, search, filter, paginate |
| GET | `/api/bookings/stats` | JWT | Dashboard counts |
| GET/PATCH/DELETE | `/api/bookings/:id` | JWT | View, change status, delete |
| POST | `/api/bookings/:id/notes` | JWT | Add a note |
| GET | `/api/services`, `/api/services/:slug` | — | Public services |
| POST/PUT/PATCH/DELETE | `/api/services/...` | JWT | Manage services |
| GET | `/api/gallery?category=` | — | Public gallery |
| POST/PUT/DELETE | `/api/gallery/...` | JWT | Manage gallery |
| GET | `/api/before-after?category=` | — | Public comparisons |
| POST/PUT/PATCH/DELETE | `/api/before-after/...` | JWT | Manage comparisons |
| GET | `/api/reviews` | — | Published reviews |
| POST/PUT/DELETE | `/api/reviews/...` | JWT | Manage reviews |
