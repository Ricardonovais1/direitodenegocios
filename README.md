# lawfirm-startup-template

Production-ready law firm website template built with Next.js 15, Sanity CMS, and Tailwind CSS. Designed for personal injury firms, criminal defense practices, DUI attorneys, and solo law offices.

---

## Features

- **Sanity CMS backend** — manage all site content from a visual Studio at `/studio` (no code required after setup)
- **Multi-language** — English and Spanish out of the box via next-intl; add more locales by extending `messages/`
- **Contact forms** — server-validated (Zod) and delivered via Resend; runs in demo mode without credentials
- **Analytics** — GA4 via `@next/third-parties`, consent-gated (does not fire until cookie banner is accepted)
- **Cookie consent banner** — GDPR/CCPA-aware; blocks analytics until the user accepts
- **Live chat** — plug-in Tawk.to or Crisp via env var; zero code changes
- **Attorney profiles** — individual pages with photo, bio (rich text), specialties, bar memberships, and education
- **Practice area pages** — full rich-text content per area with cover image and CTA
- **Blog / articles** — full post pages with cover images, categories, and PortableText body
- **Case results section** — dollar amounts and verdicts managed in Sanity
- **Awards & bar memberships** — grid section editable in Sanity
- **Second CTA form** — shorter 3-field form mid-page for higher conversion
- **SEO** — `generateMetadata` per page, Open Graph, JSON-LD `LegalService` schema, sitemap.xml, robots.txt
- **Mobile-first** — Tailwind CSS with custom navy/gold brand palette
- **Accessible** — skip-to-content link, semantic HTML, ARIA roles

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| CMS | Sanity v3 |
| Email | Resend |
| Analytics | Google Analytics 4 |
| i18n | next-intl |
| Rich text | @portabletext/react |
| Validation | Zod |
| Live chat | Tawk.to / Crisp |

---

## Project Structure

```
lawfirm-startup-template/
├── app/
│   ├── [locale]/              # All public pages (en / es)
│   │   ├── layout.tsx         # html, body, NextIntlClientProvider
│   │   ├── page.tsx           # Home page
│   │   ├── attorneys/         # Attorney listing + detail pages
│   │   ├── blog/              # Blog listing + post pages
│   │   └── practice-areas/    # Individual practice area pages
│   ├── api/contact/           # POST handler — Zod + Resend
│   ├── studio/                # Sanity Studio (outside locale routing)
│   ├── globals.css
│   ├── sitemap.ts
│   └── robots.ts
├── components/                # All UI components
├── i18n/                      # next-intl routing + request config
├── lib/                       # Site data fetching, fallback data, image URL helper
├── messages/                  # en.json, es.json
├── sanity/                    # Client, queries, schemas
├── types/                     # Shared TypeScript types
├── middleware.ts              # next-intl locale routing middleware
├── sanity.config.ts           # Sanity Studio configuration
├── next.config.ts
├── tailwind.config.ts
└── .env.local.example
```

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/APonder-Dev/lawfirm-startup-template.git
cd lawfirm-startup-template
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your credentials. See the table below.

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | For CMS | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | For CMS | Usually `production` |
| `SANITY_API_READ_TOKEN` | Optional | For draft/private content |
| `RESEND_API_KEY` | For email | Resend API key |
| `RESEND_FROM_EMAIL` | For email | Verified sender address |
| `RESEND_TO_EMAIL` | For email | Where form submissions are delivered |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 measurement ID (`G-XXXXXXX`) |
| `NEXT_PUBLIC_SITE_URL` | For SEO | Your production domain |
| `NEXT_PUBLIC_LIVE_CHAT_PROVIDER` | Optional | `tawkto` or `crisp` |
| `NEXT_PUBLIC_TAWKTO_ID` | Optional | Tawk.to widget ID |
| `NEXT_PUBLIC_CRISP_ID` | Optional | Crisp website ID |

The site runs with placeholder content if no credentials are set. Contact form submissions are logged to the console in demo mode.

### 3. Set up Sanity (optional but recommended)

```bash
# Create a free project at sanity.io/manage, then:
npx sanity init --env .env.local
```

Or create a project manually at **sanity.io/manage**, copy the Project ID into `.env.local`, and restart.

### 4. Run the dev server

```bash
npm run dev
```

- Site: `http://localhost:3000`
- Spanish: `http://localhost:3000/es`
- CMS Studio: `http://localhost:3000/studio`

---

## CMS: Managing Content

Once Sanity is connected, visit `/studio` to manage:

| Schema | What it controls |
|---|---|
| **Site Settings** | Firm name, phone, hero text, about section, testimonial, second CTA, footer, SEO defaults |
| **Practice Areas** | Title, description, full rich-text content, cover image, slug, SEO |
| **Attorneys** | Name, photo, bio, specialties, bar memberships, education, contact info |
| **Blog Posts** | Title, body, cover image, categories, publish date, SEO |
| **Case Results** | Amount/verdict, label, description |
| **FAQs** | Question, answer, display order |

All content falls back to static placeholder data when no Sanity project is connected.

---

## Customization

### Brand colors

Edit `tailwind.config.ts`:

```ts
colors: {
  navy: { DEFAULT: '#0f1f33', dark: '#091422', soft: '#172f4d' },
  gold: { DEFAULT: '#c9a45c', light: '#e2c780' },
  offwhite: '#f7f5f0',
  muted: '#667085',
}
```

### Adding a language

1. Create `messages/fr.json` (copy structure from `messages/en.json`)
2. Add `'fr'` to the `locales` array in `i18n/routing.ts`

### Removing live chat

Delete `components/LiveChat.tsx` and remove it from `app/[locale]/layout.tsx`. No other changes needed.

---

## Deployment

The project deploys to Vercel with zero configuration.

```bash
npm run build   # Verify build passes locally first
```

Set all production environment variables in your Vercel project settings before deploying. Never commit `.env.local`.

---

## Security

See [security.md](security.md) for:
- Environment variable security guidance
- Contact form hardening (rate limiting, CAPTCHA)
- Sanity Studio access control
- Recommended HTTP security headers
- Pre-launch production checklist

---

## Versions

| Version | Description |
|---|---|
| v2.0.0 | Next.js 15 rebuild — Sanity CMS, Resend, GA4, i18n, attorney/blog/practice area pages |
| v1.0.0 | Initial HTML/CSS/JS static template |

---

## License

MIT

---

## Disclaimer

This is a starter template for educational and development purposes. Replace all placeholder content — firm name, phone number, attorney bios, case results, and legal copy — before launching for a real law firm. Consult a legal professional to review your site's disclaimers and privacy policy before going live.
