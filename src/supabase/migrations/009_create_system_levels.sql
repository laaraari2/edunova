-- ==========================================================
-- TABLE : system_levels
-- Référentiel national
-- ==========================================================

create table public.system_levels (

    id uuid primary key default gen_random_uuid(),

    code varchar(10) not null unique,

    name varchar(100) not null,

    display_order integer not null,

    is_active boolean not null default true,

    created_at timestamptz not null default now()

);
