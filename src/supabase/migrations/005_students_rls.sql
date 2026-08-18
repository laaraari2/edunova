-- ==========================================================
-- RLS : students
-- ==========================================================

alter table public.students
enable row level security;


-------------------------------------------------------------
-- SELECT
-------------------------------------------------------------

create policy "Students can view their company students"

on public.students

for select

using (

company_id in (

select company_id

from public.company_members

where user_id = auth.uid()

)

);



-------------------------------------------------------------
-- INSERT
-------------------------------------------------------------

create policy "Students insert"

on public.students

for insert

with check (

company_id in (

select company_id

from public.company_members

where user_id = auth.uid()

)

);



-------------------------------------------------------------
-- UPDATE
-------------------------------------------------------------

create policy "Students update"

on public.students

for update

using (

company_id in (

select company_id

from public.company_members

where user_id = auth.uid()

)

)

with check (

company_id in (

select company_id

from public.company_members

where user_id = auth.uid()

)

);



-------------------------------------------------------------
-- DELETE
-------------------------------------------------------------

create policy "Students delete"

on public.students

for delete

using (

company_id in (

select company_id

from public.company_members

where user_id = auth.uid()

)

);