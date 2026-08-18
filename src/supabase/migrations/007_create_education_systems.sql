-- ==========================================================
-- TABLE : education_systems
-- Référentiels des systèmes éducatifs
-- ==========================================================

create table public.education_systems (

    id uuid primary key default gen_random_uuid(),

    code varchar(20) not null unique,

    name varchar(150) not null,

    description text,

    display_order integer not null,

    is_active boolean not null default true,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);