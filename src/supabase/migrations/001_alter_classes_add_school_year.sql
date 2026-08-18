-- =====================================================
-- ALTER TABLE: classes
-- Add school_year_id
-- =====================================================

alter table public.classes

add column school_year_id uuid

references public.school_years(id)

on delete set null;