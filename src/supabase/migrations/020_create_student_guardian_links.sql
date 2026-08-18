-- ==========================================================
-- TABLE : student_guardian_links
-- ==========================================================

create table public.student_guardian_links (

    id uuid primary key default gen_random_uuid(),

    student_id uuid not null
        references public.students(id)
        on delete cascade,

    guardian_id uuid not null
        references public.guardians(id)
        on delete cascade,

    relationship varchar(30) not null,

    is_legal_guardian boolean default false,

    is_emergency_contact boolean default false,

    lives_with_student boolean default false,

    created_at timestamptz default now(),

    unique(student_id, guardian_id)

);