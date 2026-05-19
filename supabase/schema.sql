-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Collections table (must be created before products due to FK)
create table collections (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  description text,
  cover_image text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Products table
create table products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  price numeric(10,2) not null,
  images text[] default '{}',
  category text,
  collection_id uuid references collections(id) on delete set null,
  in_stock boolean default true,
  created_at timestamptz default now()
);

-- Lookbook table
create table lookbook (
  id uuid primary key default uuid_generate_v4(),
  image_url text not null,
  caption text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Orders table
create table orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_email text not null,
  items jsonb not null,
  total_amount numeric(10,2) not null,
  currency text default 'NGN',
  payment_method text not null,
  payment_status text default 'pending',
  order_status text default 'pending',
  tx_hash text,
  created_at timestamptz default now()
);

-- Visitor logs table
create table visitor_logs (
  id uuid primary key default uuid_generate_v4(),
  session_id text not null,
  page text not null,
  device_type text,
  visited_at timestamptz default now()
);

-- Enable Row Level Security (RLS) on all tables
alter table collections enable row level security;
alter table products enable row level security;
alter table lookbook enable row level security;
alter table orders enable row level security;
alter table visitor_logs enable row level security;

-- Policies for Collections: public read, admin write
create policy "Allow public read access to collections"
  on collections for select
  using (is_active = true or (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' or (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

create policy "Allow admin full access to collections"
  on collections for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' or (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

-- Policies for Products: public read, admin write
create policy "Allow public read access to products"
  on products for select
  using (in_stock = true or (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' or (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

create policy "Allow admin full access to products"
  on products for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' or (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

-- Policies for Lookbook: public read, admin write
create policy "Allow public read access to lookbook"
  on lookbook for select
  using (true);

create policy "Allow admin full access to lookbook"
  on lookbook for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' or (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

-- Policies for Orders: admin full access only (or user read if they owned the order)
create policy "Allow admin full access to orders"
  on orders for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' or (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

create policy "Allow users to read their own orders"
  on orders for select
  using (auth.uid() = user_id);

create policy "Allow public to insert orders"
  on orders for insert
  with check (true);

-- Policies for Visitor Logs: insert from public, read by admin only
create policy "Allow public to insert visitor logs"
  on visitor_logs for insert
  with check (true);

create policy "Allow admin read access to visitor logs"
  on visitor_logs for select
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' or (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');
