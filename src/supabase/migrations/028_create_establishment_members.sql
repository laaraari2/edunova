-- ==========================================================
-- TABLE : establishment_members
-- ==========================================================

create table public.establishment_members (
    id uuid primary key default gen_random_uuid(),

    establishment_id uuid not null
        references public.establishments(id)
        on delete cascade,

    user_id uuid not null
        references auth.users(id)
        on delete cascade,

    role varchar(30) not null
        default 'manager',

    created_at timestamptz not null
        default now(),

    -- Un utilisateur ne peut avoir qu'un seul rôle
    -- par établissement
    constraint establishment_members_unique
        unique (establishment_id, user_id)
);


-- ==========================================================
-- INDEXES
-- ==========================================================

-- Pour les recherches par utilisateur
create index idx_establishment_members_user_id
    on public.establishment_members(user_id);

-- Pour les recherches par établissement
create index idx_establishment_members_establishment_id
    on public.establishment_members(establishment_id);


-- ==========================================================
-- ROW LEVEL SECURITY
-- ==========================================================

alter table public.establishment_members
    enable row level security;


-- ==========================================================
-- SELECT : Manager voit sa propre membership
-- ==========================================================

create policy "Members can view own memberships"
    on public.establishment_members
    for select
    using (
        user_id = auth.uid()
    );


-- ==========================================================
-- SELECT : Owner voit les managers de ses établissements
-- ==========================================================

create policy "Owner can view establishment members"
    on public.establishment_members
    for select
    using (
        establishment_id in (
            select e.id
            from public.establishments e
            inner join public.company_members cm
                on cm.company_id = e.company_id
            where cm.user_id = auth.uid()
              and cm.role = 'owner'
        )
    );


-- ==========================================================
-- INSERT : seul l'Owner peut ajouter un manager
-- ==========================================================

create policy "Owner can insert establishment members"
    on public.establishment_members
    for insert
    with check (
        establishment_id in (
            select e.id
            from public.establishments e
            inner join public.company_members cm
                on cm.company_id = e.company_id
            where cm.user_id = auth.uid()
              and cm.role = 'owner'
        )
    );


-- ==========================================================
-- DELETE : seul l'Owner peut supprimer un manager
-- ==========================================================

create policy "Owner can delete establishment members"
    on public.establishment_members
    for delete
    using (
        establishment_id in (
            select e.id
            from public.establishments e
            inner join public.company_members cm
                on cm.company_id = e.company_id
            where cm.user_id = auth.uid()
              and cm.role = 'owner'
        )
    );


-- ==========================================================
-- FUNCTION : récupérer l'établissement du Manager connecté
-- ==========================================================

drop function if exists public.get_user_establishment();

create or replace function public.get_user_establishment(p_user_id uuid)
returns table (
    establishment_id uuid,
    establishment_slug text,
    setup_completed boolean,
    role text
)
language sql
security definer
set search_path = public
stable
as $$
    select
        e.id as establishment_id,
        e.slug as establishment_slug,
        e.setup_completed,
        em.role
    from public.establishment_members em
    inner join public.establishments e
        on e.id = em.establishment_id
    where em.user_id = p_user_id
    limit 1;
$$;


-- ==========================================================
-- FUNCTION SECURITY
-- ==========================================================

revoke all
on function public.get_user_establishment(uuid)
from public;

grant execute
on function public.get_user_establishment(uuid)
to authenticated;