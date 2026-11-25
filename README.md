# Past 21 Store — Next.js + Vercel + Supabase

A custom editorial storefront and private product admin starter.

## Included
- Minimal Past 21 storefront and product pages
- Product admin login, create/edit/delete, image upload, stock and publishing
- Shopping bag with WhatsApp order handoff
- PayPal REST API order approval redirect (server credentials stay server-side)
- Supabase schema and storage policy starter

## Important launch notes
This is a functional starter, not a fully audited Shopify replacement. Before accepting real payments:
1. Finish PayPal capture + webhook handling and persistent order creation. The current PayPal flow creates and captures the payment, then records a basic paid order. It does not yet reserve/decrement stock, store line items, or process PayPal webhooks/refunds.
2. Add customer/order details, shipping/tax rules, refund process, and Botswana-specific business/payment checks.
3. Tighten admin authorization. The included RLS assumes every authenticated Supabase user is a trusted admin. Create only your own admin account; for a multi-user store, add an `admin_users` table and policies tied to it.
4. Configure backups, monitoring, privacy/terms/returns pages, and test mobile checkout.

## 1. Create Supabase project
- Create a project at https://supabase.com
- Open SQL Editor and run `supabase/schema.sql`
- In Storage, create a **public** bucket named `product-images`
- In Authentication, create your admin user (your email + strong password)
- Copy Project URL and anon/public key from Project Settings → API. Also copy the service-role key for `SUPABASE_SERVICE_ROLE_KEY`; keep it server-only and never expose it as a `NEXT_PUBLIC_` variable.

## 2. Configure locally
- Install Node.js 20+
- Extract this folder
- Copy `.env.example` to `.env.local`
- Fill in Supabase URL and anon key
- Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to your WhatsApp number in international digits format
- Set currency. The default is USD because PayPal currencies vary by account/country. Confirm supported currency and receiving capability in your PayPal Business account before choosing BWP.

Then run:
```bash
npm install
npm run dev
```
Open http://localhost:3000. Visit `/admin` to sign in and add products.

## 3. Deploy to Vercel
- Push this project to a private GitHub repository
- Sign in at https://vercel.com and choose Add New → Project
- Import the repository
- Add every variable from `.env.example` in Vercel Project → Settings → Environment Variables
- Set `NEXT_PUBLIC_SITE_URL` to your assigned `https://your-project.vercel.app` address
- Deploy

## 4. PayPal
- Create/confirm a PayPal Business account and API app in PayPal Developer
- Start with Sandbox credentials and `PAYPAL_MODE=sandbox`
- Test approval and cancellation
- Do not switch to live until capture and order recording are implemented and tested
- Add `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, and `SUPABASE_SERVICE_ROLE_KEY` to Vercel server environment variables only. Never expose the secret in browser code.

## Admin
- Storefront: `/`
- Admin login: `/admin`
- Product manager: `/admin/products`
- Orders page: `/admin/orders`

## Customization
Edit the CSS in `app/globals.css`. Store currency and WhatsApp number are environment variables. Product photos are uploaded to Supabase Storage, not Vercel, so they persist across deployments.
