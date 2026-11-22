# MEA-BOKO Ethio Coffee Marketplace

**Ethiopian coffee to the world — from farm to global market.**

MEA-BOKO is a mobile-first React + Vite marketplace starter designed for Android browsers and desktop web. It brings Ethiopian green coffee, roasted coffee, domestic trade and international buyer/supplier inquiries into one interface.

## Marketplace modules

- Green coffee listings: washed, natural and other processing types
- Roasted coffee and ground coffee product categories
- Domestic and export market filters
- Origins: Sidama, Guji, Yirgacheffe, Limu and Harar
- Search by product, origin, process and tasting notes
- Product detail dialog and inquiry-by-email action
- Supplier / exporter registration inquiry form
- Contact links for email, WhatsApp and Telegram
- Responsive layout and installable PWA shell with basic offline fallback
- Brand UI prepared for English, Afaan Oromo and Amharic expansion

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Android installation

1. Deploy the website over HTTPS.
2. Open the website in Chrome on Android.
3. Open the browser menu and choose **Install app** or **Add to Home screen**.
4. Launch MEA-BOKO from the phone home screen.

This repository currently builds a responsive web app / installable PWA. It does not yet contain a native Android APK.

## Deploy

The project can be deployed to a static hosting service that supports Vite builds. Use:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: `20` or newer

A GitHub Actions workflow runs the production build on pushes and pull requests to `main`.

## Important: current starter limitations

The product cards are illustrative sample listings, not verified inventory or offers for sale. Prices, available quantities, grades, crop years, certifications, minimum order quantities and export readiness must be confirmed with MEA-BOKO and the relevant supplier.

The current forms prepare email drafts; they do not save registrations or inquiries to a database and do not send messages automatically. No live user accounts, role-based access, listing management, payment processing, escrow, identity verification, export-document validation, customs integration or shipment tracking is active.

Before enabling live trade, implement and security-review:

1. Supabase authentication and role-based access for buyers, suppliers, exporters and admins.
2. Server-side listing and inquiry APIs with strict validation and Row Level Security policies.
3. Supplier / exporter identity and business-document verification.
4. Admin moderation, audit logs and product approval workflows.
5. Lot-level traceability, sample requests, price / quantity negotiation and trade terms.
6. Payment and shipping integrations only after legal, compliance and settlement review.
7. Ethiopia export and destination-country compliance checks with qualified professionals.

## Brand contact

- Email: meaboko11@gmail.com
- WhatsApp: +251 926 133 289 — https://wa.me/251926133289
- Telegram: @coffeemarketet — https://t.me/coffeemarketet
