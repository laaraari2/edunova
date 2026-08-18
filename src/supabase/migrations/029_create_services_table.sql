-- ==========================================================
-- TABLE : services
-- ==========================================================

create table public.services (

    id uuid primary key default gen_random_uuid(),

    establishment_id uuid not null
        references public.establishments(id)
        on delete cascade,

    name varchar(150) not null,
    
    code varchar(50) not null,

    type varchar(50) not null default 'optional', -- 'core' or 'optional'

    frequency varchar(50) not null default 'mensuel', -- 'mensuel' or 'annuel'

    default_price numeric(10, 2) not null default 0,

    is_active boolean not null default true,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now(),

    unique(establishment_id, code)

);

-- Create index for faster lookups
create index idx_services_establishment_id on public.services(establishment_id);
