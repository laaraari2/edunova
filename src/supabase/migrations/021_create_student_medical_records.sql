-- ==========================================================
-- TABLE : student_medical_records
-- ==========================================================

create table public.student_medical_records (

    id uuid primary key default gen_random_uuid(),

    student_id uuid not null
        references public.students(id)
        on delete cascade,

    blood_group varchar(5),

    allergies text,

    chronic_diseases text,

    disabilities text,

    medications text,

    emergency_notes text,

    doctor_name varchar(150),

    doctor_phone varchar(30),

    hospital varchar(150),

    created_at timestamptz default now(),

    updated_at timestamptz default now(),

    unique(student_id)

);