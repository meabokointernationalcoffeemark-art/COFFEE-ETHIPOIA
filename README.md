# MEA-BOKO Coffee Ethiopia — Export Marketplace Starter

A mobile-first React/Vite marketplace landing page for discovering Ethiopian coffee origins and starting buyer/supplier conversations.

> **Starter only:** origin listings are illustrative. This is not a live trading or export platform. The supplier campaign is a proposed 0% commission message; campaign terms and eligibility must be defined and confirmed before launch.

## Included

- Responsive marketplace landing page and brand line: **ETHIOPIAN COFFEE TO THE WORLD — FROM FARM TO GLOBAL MARKET.**
- Sample origin listings for Sidama, Guji, Yirgacheffe, Limu, and Harar.
- Search across origins, regions, processing methods, and tasting notes; filter by origin.
- Coffee inquiry form that prepares an email in the visitor's email application.
- Email, WhatsApp, and Telegram contact links.
- Supabase starter schema for profiles, origins, listings, inquiries, and shipment tracking.
- Environment variable template.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To test a production build:

```bash
npm run build
npm run preview
```

## Publish to GitHub

1. Download and extract this project.
2. Open your repository: https://github.com/meabokointernationalcoffeemark-art/COFFEE-ETHIPOIA
3. Select **Add file → Upload files** and upload the extracted project files and folders (not the ZIP).
4. Commit to the `main` branch with message: `Build MEA-BOKO coffee export marketplace starter.`

## Backend setup (next phase)

1. Create a Supabase project.
2. Review `supabase/schema.sql` and apply it in the Supabase SQL Editor.
3. Configure and test Row Level Security policies for every table before exposing data. RLS is enabled and no policies are included, so client access is blocked until you deliberately add reviewed policies.
4. Copy `.env.example` to `.env.local` and add the Supabase URL and anon key. The current landing page does not connect to Supabase; do not treat adding environment values as backend integration.
5. Implement authentication, role-based permissions, listing management, secure inquiry submission, and notification workflows before enabling backend features.

## Important production work still required

- Implement authentication and role-based permissions.
- Verify supplier/exporter identities and listing documents.
- Add admin moderation and audit logs.
- Validate coffee specifications and traceability at lot level.
- Integrate a payment provider only after legal, compliance, and settlement review.
- Add secure inquiry APIs and notification workflows.
- Review Ethiopia export requirements and destination-country requirements with qualified professionals.
- Add multilingual UI (English and Amharic first; Afaan Oromo, Arabic, and Chinese later).
- Define the supplier campaign's terms and eligibility—including duration, covered services, and any other fees—before communicating 0% commission as an active offer.
- Build a Telegram Mini App using the same backend and authentication model.

## Listing and inquiry limitations

All displayed coffee listings and specifications are illustrative, not confirmed inventory or offers for sale. Confirm availability, price, grade, processing, and export readiness with MEA-BOKO. The inquiry form creates an email draft only: it does not save the inquiry to a database or send it automatically. No live inventory, price feed, payment processing, identity verification, export permit validation, customs integration, or shipment tracking is active.

## Brand contact

- Email: [meaboko11@gmail.com](mailto:meaboko11@gmail.com)
- WhatsApp: [+251 926 133 289](https://wa.me/251926133289)
- Telegram: [@coffeemarketet](https://t.me/coffeemarketet)
