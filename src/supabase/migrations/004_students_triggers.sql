-- ==========================================================
-- FUNCTION : update_updated_at_column
-- ==========================================================

create or replace function public.update_updated_at_column()

returns trigger

language plpgsql

as $$

begin

    new.updated_at = now();

    return new;

end;

$$;



-- ==========================================================
-- TRIGGER : students_updated_at
-- ==========================================================

create trigger trg_students_updated_at

before update

on public.students

for each row

execute function public.update_updated_at_column();