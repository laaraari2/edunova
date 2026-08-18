-- ==========================================================
-- TABLE : guardians
-- ==========================================================

create table public.guardians (

    id uuid primary key default gen_random_uuid(),

    company_id uuid not null
        references public.companies(id)
        on delete cascade,

    cin varchar(30),

    firstname varchar(100) not null,

    lastname varchar(100) not null,

    gender char(1),

    phone varchar(30) not null,

    phone2 varchar(30),

    email varchar(150),

    profession varchar(150),

    address text,

    city varchar(120),

    is_active boolean not null default true,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now(),

    unique(company_id, cin)

);