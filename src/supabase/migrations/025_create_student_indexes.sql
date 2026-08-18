-- ==========================================================
-- INDEXES : students
-- ==========================================================

create index idx_students_company
on public.students(company_id);

create index idx_students_establishment
on public.students(establishment_id);

create index idx_students_school_year
on public.students(school_year_id);

create index idx_students_class
on public.students(class_id);

create index idx_students_level
on public.students(level_id);

create index idx_students_grade
on public.students(grade_level_id);

create index idx_students_massar
on public.students(massar_code);

create index idx_guardians_company
on public.guardians(company_id);

create index idx_student_guardian_student
on public.student_guardian_links(student_id);

create index idx_student_guardian_guardian
on public.student_guardian_links(guardian_id);