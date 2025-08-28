# PlanReading Academy – Pro Starter

**You own your platform**: Next.js (Vercel) + Clerk (Auth) + Stripe (Checkout/Webhooks) + Vimeo (locked embeds).

## Step-by-step (non‑technical)

1) **Get accounts** (free to start): GitHub, Vercel, Stripe, Clerk, Vimeo.
2) **Download this ZIP** and upload to a new **GitHub** repo.
3) In **Vercel**: “Add New Project” → Import your GitHub repo → Deploy.
4) In Vercel → Project → **Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_SUCCESS_URL` = `https://YOURDOMAIN/welcome`
   - `NEXT_PUBLIC_CANCEL_URL` = `https://YOURDOMAIN/`
5) In **Stripe**: create a Product + Price → copy **Price ID** and replace `price_xxx_replace_me` in `app/api/checkout/route.ts`.
6) In **Stripe → Developers → Webhooks**: add endpoint `https://YOUR-VERCEL-URL/api/stripe/webhook` → events: `checkout.session.completed, charge.refunded` → copy signing secret to `STRIPE_WEBHOOK_SECRET`.
7) In **Vimeo**: set each video → Privacy → **Only allow embedding on** your domain (and Vercel preview domain). Disable download.
8) Edit `data/lessons.ts` with your titles + Vimeo IDs. Put PDFs in `public/downloads`.
9) Visit `/sign-in` to create your user. Run a test Stripe checkout. After success, the webhook will grant your user access to `/courses/plan-reading`.

Need help? Ask me and we'll do it together live.
