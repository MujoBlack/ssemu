# Ssemu Cleaning Services Ltd — Website Project Plan

## 1. Project Description
A polished, trustworthy multi-page website for **Ssemu Cleaning Services Ltd** (short name "Ssemu", initials SCS), a professional cleaning company based in **Kampala, Uganda**.

- **Tagline:** "Customer's satisfaction, our priority"
- **Target users:** Offices, banks, shops, homes, institutions, hotels, schools and events across Kampala and Uganda.
- **Core value:** Cleaning, fumigation, integrated waste management, scaffolding, crane hire and high-rise window cleaning — delivered by trained, supervised staff with free, clear quotes.

## 2. Page Structure
- `/` — Home (scroll-controlled video hero, client strip, services, dynamic team, how it works, service menu, testimonials, areas, FAQ, CTA)
- `/services` — Detailed service sections with "What's included" + request-a-quote
- `/about` — Who we are, vision, mission, core values, team photo
- `/team` — Our Team (technical + field staff)
- `/team/:slug` — Team member profile
- `/blog` — Blog (category-filtered post grid)
- `/blog/:slug` — Blog post
- `/contact` — Contact + quotation/booking form (anchor `#book`)
- `*` — 404

## 3. Core Features
- [x] Floating pill header (logo, nav, phone, Book Now)
- [x] Scroll-controlled video hero (wheel/touch scrubs the video, synced text + cards)
- [x] Client marquee, services grid, stats, how-it-works, service menu, testimonial slider, area cards, FAQ
- [x] Mobile sticky "Book Now" bar + floating WhatsApp button on every page
- [x] Team profiles and blog with category filtering
- [x] Quote/booking form via Readdy Form storage
- [x] Accessible (alt text, WCAG AA text over photos, reduced-motion fallbacks)
- [x] SEO metadata + ProfessionalService schema
- [x] All company content in `src/mocks` data files (ready to move to a database)

## 4. Data Model
No database required for the MVP. The quote/booking form submits via Readdy Form storage.
All page content (services, clients, testimonials, team, blog, areas, contacts) lives in `src/mocks/*.ts` so it can later be moved to a database.

## 5. Third-party Integrations
- **Readdy Form** — quote/booking submissions (`Cleaning Quote & Booking Form`)
- **Google Maps embed** — office locations
- **WhatsApp click-to-chat** — direct link
- *(Optional later)* Supabase database for leads/CRM, and the Built-in Agent for a booking assistant

## 6. Development Phase Plan

### Phase 1: Rebrand + Home (current, complete)
- Swap design tokens to the Ssemu palette (sky blue #2CA9E3, near-black #0B0B0B, deep blue #0E3A5C)
- Build the scroll-controlled video hero and all home sections
- Floating pill header, deep-blue footer, mobile sticky bar, floating WhatsApp

### Phase 2: Inner pages (complete)
- Services, About Us, Our Team (+ profiles), Blog (+ posts), Contact + form

### Phase 3: Content + polish
- Replace placeholder bios, YouTube/social URLs and licence details with final content
- Add more blog posts and real project photos
- [x] Site-wide type + spacing system (single source of truth in `src/index.css`):
  - Type: `.t-h1` 40/64, `.t-h2` 32/48, `.t-h3` 20/24, `.t-body` 16/17 (measure 65ch), `.t-card` 15/1.55, `.t-label` 12 uppercase +0.08em
  - Spacing: `.section-lg` (160 desktop / 96 mobile), `.section-md` (112 / 72), `.section-sm` (64 / 48) — each step is the total gap between sections
  - Heading block rhythm: `.stack-label` 16px, `.stack-sub` 20px, `.stack-content` 56px
  - `.grid-gap` 24px desktop / 16px mobile; `.site-container` max 1240px with 32px desktop / 20px mobile padding

### Phase 4 (optional): Backend
- Connect Readdy Backend / SaaS Supabase for lead storage and a simple CRM