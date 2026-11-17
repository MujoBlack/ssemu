# Ssemu Cleaning Services Ltd website

React + Vite + Tailwind site for ssemucleaningservices.com, exported from Readdy.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static files in out/
```

## How it deploys to Hostinger

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

- Images and the hero video are still hosted on Readdy's storage/CDN
  (storage.helloreaddy.io, static.readdy.ai, cloudfront). Moving them into
  `public/` would make the site independent of Readdy.
- The contact form posts to Readdy's form endpoint (`src/pages/contact/page.tsx`).
- If you keep editing in Readdy, download the code again and replace the files here.
