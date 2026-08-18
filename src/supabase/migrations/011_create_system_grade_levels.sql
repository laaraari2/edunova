-- ==========================================================
-- TABLE : system_grade_levels
-- Référentiel national des niveaux scolaires
-- ==========================================================

create table public.system_grade_levels (

    id uuid primary key default gen_random_uuid(),

    system_level_id uuid not null
        references public.system_levels(id)
        on delete cascade,

    code varchar(20) not null,

    name varchar(100) not null,

    display_order integer not null,

    is_active boolean not null default true,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);