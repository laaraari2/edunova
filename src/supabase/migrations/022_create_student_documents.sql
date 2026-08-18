-- ==========================================================
-- TABLE : student_documents
-- ==========================================================

create table public.student_documents (

    id uuid primary key default gen_random_uuid(),

    student_id uuid not null
        references public.students(id)
        on delete cascade,

    document_type varchar(50) not null,

    document_name varchar(200),

    file_url text not null,

    issue_date date,

    expiry_date date,

    uploaded_by uuid,

    created_at timestamptz default now()

);