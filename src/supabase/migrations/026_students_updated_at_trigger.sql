create or replace function update_updated_at_column()

returns trigger

language plpgsql

as $$

begin

new.updated_at = now();

return new;

end;

$$;
create trigger trg_students_updated_at

before update

on public.students

for each row

execute procedure update_updated_at_column();

create trigger trg_guardians_updated_at

before update

on public.guardians

for each row

execute procedure update_updated_at_column();
create trigger trg_student_services_updated_at

before update

on public.student_services

for each row

execute procedure update_updated_at_column();
create trigger trg_student_medical_updated_at

before update

on public.student_medical_records

for each row

execute procedure update_updated_at_column();