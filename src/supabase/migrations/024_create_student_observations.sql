-- ==========================================================
-- TABLE : student_observations
-- ==========================================================

create table public.student_observations (

    id uuid primary key default gen_random_uuid(),

    student_id uuid not null
        references public.students(id)
        on delete cascade,

    category varchar(50),

    observation text not null,

    created_by uuid,

    created_at timestamptz default now()

);