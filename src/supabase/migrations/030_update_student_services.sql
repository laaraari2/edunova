-- ==========================================================
-- TABLE : student_services (Recreated)
-- ==========================================================

-- Drop the old table
drop table if exists public.student_services cascade;

create table public.student_services (

    id uuid primary key default gen_random_uuid(),

    student_id uuid not null
        references public.students(id)
        on delete cascade,

    service_id uuid not null
        references public.services(id)
        on delete cascade,

    start_month varchar(20),
    
    end_month varchar(20),

    custom_price numeric(10, 2), -- Overrides default_price if set

    discount_type varchar(20), -- 'percentage' or 'fixed'

    discount_value numeric(10, 2) default 0,

    is_exempt boolean not null default false,

    status varchar(30) not null default 'active',

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now(),

    -- A student can only have a specific service once (or we could allow multiple if needed, but usually once is enough)
    unique(student_id, service_id)

);

-- Create indexes for faster lookups
create index idx_student_services_student_id on public.student_services(student_id);
create index idx_student_services_service_id on public.student_services(service_id);
