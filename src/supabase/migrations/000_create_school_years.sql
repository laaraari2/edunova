-- =====================================================
-- TABLE: school_years
-- =====================================================

create table public.school_years (

    id uuid primary key default gen_random_uuid(),

    company_id uuid not null
        references public.companies(id)
        on delete cascade,

    name varchar(20) not null,

    start_date date not null,

    end_date date not null,

    is_current boolean not null default false,

    is_active boolean not null default true,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);