-- Starter schema only. Review and adapt before deployment.
-- RLS is enabled on every table; no client policies are provided intentionally.
-- All table access is blocked for anon/authenticated clients until reviewed policies are added.
-- Do not expose service-role keys in browser code.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  organization text,
  role text not null default 'buyer' check (role in ('buyer', 'supplier', 'admin')),
  country text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.origins (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  region text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.profiles (id) on delete restrict,
  origin_id uuid not null references public.origins (id) on delete restrict,
  title text not null,
  processing_method text,
  grade text,
  altitude_min_m integer check (altitude_min_m is null or altitude_min_m >= 0),
  altitude_max_m integer check (altitude_max_m is null or altitude_max_m >= altitude_min_m),
  tasting_notes text,
  crop_year text,
  quantity_kg numeric(12, 2) check (quantity_kg is null or quantity_kg >= 0),
  status text not null default 'draft' check (status in ('draft', 'pending_review', 'published', 'paused', 'sold')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid references public.profiles (id) on delete set null,
  listing_id uuid references public.listings (id) on delete set null,
  origin_id uuid references public.origins (id) on delete set null,
  contact_name text not null,
  contact_email text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.shipment_tracking (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references public.listings (id) on delete set null,
  inquiry_id uuid references public.inquiries (id) on delete set null,
  reference_code text not null unique,
  status text not null default 'pending' check (status in ('pending', 'preparing', 'in_transit', 'delivered', 'delayed', 'cancelled')),
  origin_location text,
  destination_location text,
  estimated_departure date,
  estimated_arrival date,
  last_updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint shipment_has_parent check (listing_id is not null or inquiry_id is not null)
);

create index if not exists listings_origin_status_idx on public.listings (origin_id, status);
create index if not exists listings_supplier_idx on public.listings (supplier_id);
create index if not exists inquiries_buyer_created_idx on public.inquiries (buyer_id, created_at desc);
create index if not exists shipment_tracking_inquiry_idx on public.shipment_tracking (inquiry_id);

alter table public.profiles enable row level security;
alter table public.origins enable row level security;
alter table public.listings enable row level security;
alter table public.inquiries enable row level security;
alter table public.shipment_tracking enable row level security;

-- TODO before exposing the app:
-- 1. Define least-privilege policies for every table, including public published-listing reads.
-- 2. Restrict supplier writes to their own verified profile and listings.
-- 3. Restrict inquiries and shipment data to authorized parties and admins.
-- 4. Add moderation, identity checks, audit logging, and server-side validation.
-- 5. Review role assignment: never trust a user-editable profile role for authorization.
-- This starter intentionally ships with no RLS policies and no active backend integration.
