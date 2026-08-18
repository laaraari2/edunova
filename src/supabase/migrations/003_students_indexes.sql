-- ==========================================================
-- INDEXES : students
-- ==========================================================

-- Company
create index idx_students_company
on public.students(company_id);

-- Establishment
create index idx_students_establishment
on public.students(establishment_id);

-- Class
create index idx_students_class
on public.students(class_id);

-- Student status
create index idx_students_status
on public.students(student_status);

-- Last name
create index idx_students_lastname
on public.students(lastname);

-- First name
create index idx_students_firstname
on public.students(firstname);

-- Full name search
create index idx_students_fullname
on public.students(lastname, firstname);

-- Active students
create index idx_students_active
on public.students(is_active);

-- Registration number
create index idx_students_registration
on public.students(registration_number);

-- Birth date
create index idx_students_birthdate
on public.students(birth_date);