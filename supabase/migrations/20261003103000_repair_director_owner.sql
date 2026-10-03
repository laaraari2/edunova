-- Repair the current Edunova owner identity after the old account was removed.
-- This uses the Auth email, so it does not depend on a hard-coded user UUID.

DO $$
DECLARE
  v_owner_id uuid;
  v_company_id uuid;
BEGIN
  SELECT id INTO v_owner_id
  FROM auth.users
  WHERE lower(email) = lower('director@gmail.com')
  LIMIT 1;

  IF v_owner_id IS NULL THEN
    RAISE EXCEPTION 'director@gmail.com does not exist in auth.users';
  END IF;

  SELECT id INTO v_company_id
  FROM public.companies
  WHERE lower(email) = lower('laaraari@gmail.com')
     OR lower(name) = lower('EduNova')
  ORDER BY created_at
  LIMIT 1;

  IF v_company_id IS NULL THEN
    INSERT INTO public.companies (name, email)
    VALUES ('EduNova', 'director@gmail.com')
    RETURNING id INTO v_company_id;
  ELSE
    UPDATE public.companies
    SET email = 'director@gmail.com',
        updated_at = now()
    WHERE id = v_company_id;
  END IF;

  INSERT INTO public.company_members (company_id, user_id, role)
  VALUES (v_company_id, v_owner_id, 'owner')
  ON CONFLICT (company_id, user_id)
  DO UPDATE SET role = 'owner';

  DELETE FROM public.establishment_members
  WHERE user_id = v_owner_id;
END
$$;
