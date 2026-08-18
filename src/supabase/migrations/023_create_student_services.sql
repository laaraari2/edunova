-- ==========================================================
-- TABLE : student_services
-- ==========================================================

create table public.student_services (

    id uuid primary key default gen_random_uuid(),

    student_id uuid not null
        references public.students(id)
        on delete cascade,

    transport boolean default false,

    internat boolean default false,

    cantine boolean default false,

    insurance boolean default false,

    transport_line varchar(150),

    pickup_point varchar(150),

    insurance_number varchar(100),

    created_at timestamptz default now(),

    updated_at timestamptz default now(),

    unique(student_id)

);