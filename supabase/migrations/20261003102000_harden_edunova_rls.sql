-- Edunova authorization hardening
-- Run this migration in Supabase SQL Editor after the public schema is present.

CREATE OR REPLACE FUNCTION public.is_company_member(
  p_company_id uuid,
  p_user_id uuid DEFAULT auth.uid()
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.company_members cm
    WHERE cm.company_id = p_company_id
      AND cm.user_id = p_user_id
  );
$$;

CREATE OR REPLACE FUNCTION public.is_company_owner(
  p_company_id uuid,
  p_user_id uuid DEFAULT auth.uid()
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.company_members cm
    WHERE cm.company_id = p_company_id
      AND cm.user_id = p_user_id
      AND cm.role = 'owner'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_establishment_member(
  p_establishment_id uuid,
  p_user_id uuid DEFAULT auth.uid()
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.establishment_members em
    WHERE em.establishment_id = p_establishment_id
      AND em.user_id = p_user_id
  );
$$;

CREATE OR REPLACE FUNCTION public.is_establishment_manager(
  p_establishment_id uuid,
  p_user_id uuid DEFAULT auth.uid()
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.establishment_members em
    WHERE em.establishment_id = p_establishment_id
      AND em.user_id = p_user_id
      AND em.role IN ('manager', 'admin')
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_company_member(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_company_owner(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_establishment_member(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_establishment_manager(uuid, uuid) TO authenticated;

DROP POLICY IF EXISTS "users can read own company memberships" ON public.company_members;
DROP POLICY IF EXISTS "company members can read their company" ON public.companies;
DROP POLICY IF EXISTS "company members can read establishments" ON public.establishments;
DROP POLICY IF EXISTS "company owners can insert establishments" ON public.establishments;
DROP POLICY IF EXISTS "company owners can update establishments" ON public.establishments;
DROP POLICY IF EXISTS "users can read establishment memberships" ON public.establishment_members;
DROP POLICY IF EXISTS "establishment members can read classes" ON public.classes;
DROP POLICY IF EXISTS "establishment managers can manage classes" ON public.classes;

CREATE POLICY "users can read own company memberships"
ON public.company_members
FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "company members can read their company"
ON public.companies
FOR SELECT TO authenticated
USING (public.is_company_member(id));

CREATE POLICY "company owners can read company establishments"
ON public.establishments
FOR SELECT TO authenticated
USING (public.is_company_member(company_id));

CREATE POLICY "establishment members can read own establishment"
ON public.establishments
FOR SELECT TO authenticated
USING (public.is_establishment_member(id));

CREATE POLICY "company owners can insert establishments"
ON public.establishments
FOR INSERT TO authenticated
WITH CHECK (public.is_company_owner(company_id));

CREATE POLICY "company owners and managers can update establishments"
ON public.establishments
FOR UPDATE TO authenticated
USING (
  public.is_company_owner(company_id)
  OR public.is_establishment_manager(id)
)
WITH CHECK (
  public.is_company_owner(company_id)
  OR public.is_establishment_manager(id)
);

CREATE POLICY "users can read own establishment membership"
ON public.establishment_members
FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "company owners can read establishment memberships"
ON public.establishment_members
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.establishments e
    WHERE e.id = establishment_id
      AND public.is_company_owner(e.company_id)
  )
);

CREATE POLICY "establishment members can read classes"
ON public.classes
FOR SELECT TO authenticated
USING (public.is_establishment_member(establishment_id));

CREATE POLICY "establishment managers can insert classes"
ON public.classes
FOR INSERT TO authenticated
WITH CHECK (public.is_establishment_manager(establishment_id));

CREATE POLICY "establishment managers can update classes"
ON public.classes
FOR UPDATE TO authenticated
USING (public.is_establishment_manager(establishment_id))
WITH CHECK (public.is_establishment_manager(establishment_id));

CREATE POLICY "establishment managers can delete classes"
ON public.classes
FOR DELETE TO authenticated
USING (public.is_establishment_manager(establishment_id));
