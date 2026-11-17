# Ssemu Cleaning Services Ltd website

React + Vite + Tailwind site for ssemucleaningservices.com, exported from Readdy.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static files in out/
```

## How it deploys to Hostinger

Hostinger is set up as a **Web app** connected to this repo's `main` branch with
auto-deployment on: it runs `npm run build` and serves `out/`. Every push to `main`
goes live within a few minutes.

The older route below (static files on the `deploy` branch) is kept as a fallback.

1. Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site
   and force-pushes the static files (`out/`) to the `deploy` branch.
2. Hostinger hPanel → Websites → ssemucleaningservices.com → Advanced → **Git**:
   - Repository: `https://github.com/MujoBlack/ssemu.git`
   - Branch: `deploy`
   - Install path: leave empty (deploys into `public_html`, which must be empty first)
   - Turn on **Auto Deployment** and add the webhook URL Hostinger shows to
     GitHub → Settings → Webhooks (content type `application/json`, push events only).
3. hPanel → Security → SSL: install the free SSL for the domain.

`public/.htaccess` is copied into the build. It forces https, redirects www to the
bare domain, and sends routes like `/about` to `index.html` so refreshes work.

## Notes

- All photos and the hero videos live in `public/media/` (served at `/media/...`).
  Photos were converted to WebP (max 2000px) when they were moved off Readdy.
- The contact form posts to Readdy's form endpoint (`src/pages/contact/page.tsx`).
- If you keep editing in Readdy, download the code again and replace the files here.
