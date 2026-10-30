# Raajlaxmi Group website

Next.js 16 (App Router, TypeScript, Tailwind CSS v4) rebuild of [raajlaxmi.com](https://raajlaxmi.com), replacing the WordPress/Elementor site. Form submissions go to Google Sheets through a Google Apps Script web app.

## Pages

| URL | Notes |
| --- | --- |
| `/` | Home |
| `/about-us/` | About, mission/vision/values, brands |
| `/on-going-projects/` | Krishna Niwas, Raajlaxmi Park, Aarvi Apartment, Shanti Niwas (filter by Vasai / Virar / Saphale) |
| `/completed-projects/` | 11 delivered projects |
| `/redevelopment/` | Redevelopment pitch + society enquiry form |
| `/testimonials/` | Reviews, video stories, customer moments |
| `/contact-us/` | Contact details, map, call-back form |
| `/acacia/` | Campaign landing page (not linked from the main site) |
| `/acacia-thankyou/` | Post-submit page for Acacia leads (`noindex`) |

URLs keep the trailing slash used by WordPress (`trailingSlash: true`), so existing links and ads keep working.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the two values
npm run dev
```

Without `GOOGLE_SCRIPT_URL`, forms still work in development: leads are printed to the terminal instead of being sent. In production, a missing URL shows the visitor an error message.

## Form delivery (Google Sheets)

1. Create a Google Sheet → **Extensions → Apps Script** → paste [`google-apps-script/Code.gs`](google-apps-script/Code.gs).
2. **Project Settings → Script properties**: add `SHARED_SECRET` (any long random string) and optionally `NOTIFY_EMAILS` (comma-separated) to get an email per lead.
3. **Deploy → New deployment → Web app**, *Execute as: Me*, *Who has access: Anyone*. Copy the `/exec` URL.
4. Set `GOOGLE_SCRIPT_URL` (the `/exec` URL) and `GOOGLE_SCRIPT_SECRET` (same as `SHARED_SECRET`) in your hosting environment.

Each form writes to its own tab (`Acacia Leads`, `Website Enquiries`, `Contact Page`, `Redevelopment`), which is created automatically. Every lead includes the page URL, referrer and UTM / gclid / fbclid parameters. Submissions go through a server action (`lib/leads/submit-lead.ts`), so the script URL is never exposed to the browser. A hidden honeypot field filters basic spam bots.

Acacia forms redirect to `/acacia-thankyou/`. Every successful lead pushes a `lead_submit` event to the GTM `dataLayer` (container `GTM-TF2LLXP4`), so it can be used as a conversion trigger.

## Where to edit content

- Contact numbers, email, social links: `lib/site.ts`
- Projects (on-going and completed): `lib/data/projects.ts`
- Reviews and customer photos: `lib/data/testimonials.ts`
- Brands and headline stats: `lib/data/brands.ts`
- Acacia landing page content: `lib/data/acacia.ts`

Images live in `public/images/…` and videos (compressed for the web, with poster frames) in `public/videos/…`.

## Loading states

- Brand splash on first page load: `components/loading/PageLoader.tsx`
- Route-level loaders: `app/(site)/loading.tsx`, `app/(landing)/acacia/loading.tsx`
- Blur-up placeholders on all photos (`placeholder="blur"`), a shimmer on maps, a spinner on buffering videos, and a "Sending…" spinner on every form submit button.
