-- ==========================================================
-- TABLE : students
-- ==========================================================

create table public.students (

    id uuid primary key default gen_random_uuid(),

    company_id uuid not null
        references public.companies(id)
        on delete cascade,

    establishment_id uuid not null
        references public.establishments(id)
        on delete cascade,

    class_id uuid
        references public.classes(id)
        on delete set null,

    ----------------------------------------------------------
    -- IDENTIFICATION
    ----------------------------------------------------------

    massar_code varchar(30) not null unique,

    registration_number varchar(50),

    registration_date date,

    ----------------------------------------------------------
    -- IDENTITY
    ----------------------------------------------------------

    firstname varchar(100) not null,

    lastname varchar(100) not null,

    gender varchar(10) not null,

    birth_date date not null,

    birth_place varchar(150),

    nationality varchar(80),

    photo_url text,

    ----------------------------------------------------------
    -- CONTACT
    ----------------------------------------------------------

    address text,

    city varchar(120),

    email varchar(150),

    ----------------------------------------------------------
   
    ----------------------------------------------------------

    school_year_id uuid
    references public.school_years(id)
    on delete set null,

level_id uuid
    references public.levels(id)
    on delete set null,

grade_level_id uuid
    references public.grade_levels(id)
    on delete set null,
    ----------------------------------------------------------
    -- SCHOOL
    ----------------------------------------------------------

    student_status varchar(30)
        not null
        default 'active',

    observation text,

    ----------------------------------------------------------
    -- AUDIT
    ----------------------------------------------------------

    is_active boolean
        not null
        default true,

    deleted_at timestamptz,

    created_by uuid,

    updated_by uuid,

    created_at timestamptz
        not null
        default now(),

    updated_at timestamptz
        not null
        default now()

);