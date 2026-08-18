-- ==========================================================
-- TABLE : streams
-- Filières nationales
-- ==========================================================

create table public.streams (

    id uuid primary key default gen_random_uuid(),

    code varchar(20) not null unique,

    name varchar(150) not null,

    display_order integer not null,

    is_active boolean not null default true,

    created_at timestamptz not null default now()

);
