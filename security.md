# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| v2.x.x  | Yes       |
| v1.x.x  | No        |

---

## Reporting a Vulnerability

If you discover a security issue, please avoid creating a public GitHub issue.

Instead:
- Open a **private security advisory** through GitHub (Security → Advisories → New)
- Or email the maintainer directly at **Anthony@aponder.dev**

Please include:
- Description of the issue
- Steps to reproduce
- Potential impact
- Suggested remediation if available

Allow reasonable time for investigation and remediation before public disclosure.

---

## Environment Variables

This project uses both server-side and client-side environment variables. Understand the difference before deploying.

### Server-side only (never expose to the browser)
| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Sends contact form emails via Resend |
| `SANITY_API_READ_TOKEN` | Authenticated Sanity reads (draft content) |
| `RESEND_TO_EMAIL` | Destination address for contact form submissions |

### Public (safe to expose via `NEXT_PUBLIC_` prefix)
| Variable | Notes |
|----------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID is not a secret |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name (typically `production`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID |
| `NEXT_PUBLIC_SITE_URL` | Used for canonical URLs and sitemaps |
| `NEXT_PUBLIC_LIVE_CHAT_PROVIDER` | `tawkto` or `crisp` |
| `NEXT_PUBLIC_TAWKTO_ID` | Tawk.to widget ID |
| `NEXT_PUBLIC_CRISP_ID` | Crisp website ID |

**Never commit `.env.local` to version control.** The `.gitignore` excludes it by default.

---

## Security Considerations by Feature

### Contact Form (`/api/contact`)
- All fields are validated server-side with **Zod** before any email is sent
- The Resend API key never reaches the client
- **Add rate limiting** before production deployment (e.g., Upstash Rate Limit or Vercel Edge middleware)
- Consider adding a CAPTCHA (hCaptcha, Cloudflare Turnstile) to prevent spam

### Sanity CMS (`/studio`)
- Studio is accessible at `/studio` — **restrict access in production** via:
  - Sanity's built-in user management (invite-only)
  - Vercel password protection on the `/studio` path
  - Middleware-level auth check if self-hosted
- The `SANITY_API_READ_TOKEN` should have **read-only** permissions; write operations go through the authenticated Studio UI
- Review your Sanity project's **CORS settings** to allow only your deployed domain

### Google Analytics (GA4)
- The GA4 script is **consent-gated** — it does not load until the user accepts the cookie banner
- No tracking occurs for users who decline
- Review your privacy policy to ensure it accurately describes data collection

### Cookie Consent
- Consent state is stored in `localStorage` under the key `cookie_consent`
- This implementation is a starting point — consult a legal professional to confirm GDPR/CCPA compliance for your jurisdiction before launch

### Live Chat (Tawk.to / Crisp)
- Third-party chat scripts are injected client-side via `useEffect`
- These providers may set their own cookies — disclose this in your cookie/privacy policy
- If not using live chat, remove the relevant env vars and delete `components/LiveChat.tsx` to eliminate the third-party dependency entirely

### Sanity Image URLs
- Images are served from `cdn.sanity.io` — this domain is whitelisted in `next.config.ts`
- Do not add broad wildcard patterns to `remotePatterns`; keep it scoped to `cdn.sanity.io`

---

## Pre-Launch Checklist

Before deploying to a production law firm domain:

- [ ] Set all required environment variables in your hosting provider (never `.env.local`)
- [ ] Enable HTTPS (automatic on Vercel, Netlify, etc.)
- [ ] Add rate limiting to `/api/contact`
- [ ] Add CAPTCHA to contact forms if spam is a concern
- [ ] Restrict Sanity Studio access to authorized users
- [ ] Configure Sanity CORS to your production domain only
- [ ] Review and update cookie/privacy policy language with an attorney
- [ ] Replace all placeholder copy (phone, address, attorney bios) with real firm content
- [ ] Test contact form delivery end-to-end with real credentials
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your live domain (affects sitemap + canonical URLs)
- [ ] Verify `robots.txt` and `sitemap.xml` are correct for your domain

---

## Dependency Management

Review dependencies regularly for:
- Outdated packages (`npm audit`)
- Known CVEs (`npm audit --audit-level=moderate`)
- Deprecated tooling
- Supply chain risks (prefer packages with active maintenance and broad community use)

Run `npm audit` before each production deployment.

---

## Headers

Consider adding security headers via `next.config.ts` for production:

```ts
headers: async () => [
  {
    source: '/(.*)',
    headers: [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ],
  },
],
```

A full Content Security Policy (CSP) will need to account for Sanity CDN, GA4, and your chosen live chat provider.
