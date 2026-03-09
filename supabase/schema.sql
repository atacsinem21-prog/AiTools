create extension if not exists pgcrypto;

create table if not exists public.tools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  website text not null,
  category text,
  source text default 'manual',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tools_category_idx on public.tools (category);
create index if not exists tools_created_at_idx on public.tools (created_at desc);

create table if not exists public.tool_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  website text not null,
  category text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.compare_pairs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  left_tool_slug text not null,
  right_tool_slug text not null,
  score integer not null default 0,
  source text not null default 'auto',
  created_at timestamptz not null default now()
);

create table if not exists public.email_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  locale text not null default 'en',
  created_at timestamptz not null default now()
);

alter table public.tools enable row level security;
alter table public.tool_submissions enable row level security;
alter table public.compare_pairs enable row level security;
alter table public.email_subscriptions enable row level security;

drop policy if exists "public_can_read_tools" on public.tools;
create policy "public_can_read_tools"
on public.tools
for select
to anon, authenticated
using (true);

drop policy if exists "service_role_manage_tools" on public.tools;
create policy "service_role_manage_tools"
on public.tools
for all
to service_role
using (true)
with check (true);

drop policy if exists "service_role_manage_submissions" on public.tool_submissions;
create policy "service_role_manage_submissions"
on public.tool_submissions
for all
to service_role
using (true)
with check (true);

drop policy if exists "anon_submit_tool_submissions" on public.tool_submissions;
create policy "anon_submit_tool_submissions"
on public.tool_submissions
for insert
to anon
with check (status = 'pending');

drop policy if exists "public_can_read_compare_pairs" on public.compare_pairs;
create policy "public_can_read_compare_pairs"
on public.compare_pairs
for select
to anon, authenticated
using (true);

drop policy if exists "service_role_manage_compare_pairs" on public.compare_pairs;
create policy "service_role_manage_compare_pairs"
on public.compare_pairs
for all
to service_role
using (true)
with check (true);

drop policy if exists "anon_subscribe_email" on public.email_subscriptions;
create policy "anon_subscribe_email"
on public.email_subscriptions
for insert
to anon
with check (position('@' in email) > 1);

drop policy if exists "service_role_manage_email_subscriptions" on public.email_subscriptions;
create policy "service_role_manage_email_subscriptions"
on public.email_subscriptions
for all
to service_role
using (true)
with check (true);
