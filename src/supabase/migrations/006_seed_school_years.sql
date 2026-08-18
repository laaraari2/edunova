-- ==========================================================
-- SEED : school_years
-- ==========================================================

insert into public.school_years (

    company_id,

    name,

    start_date,

    end_date,

    is_current,

    is_active

)

select

    id,

    '2025-2026',

    '2025-09-01',

    '2026-07-15',

    true,

    true

from public.companies;