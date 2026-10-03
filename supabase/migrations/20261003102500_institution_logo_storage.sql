-- Storage for institution branding
INSERT INTO storage.buckets (id, name, public)
VALUES ('institution-logos', 'institution-logos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "institution managers can upload logos" ON storage.objects;
DROP POLICY IF EXISTS "institution managers can update logos" ON storage.objects;
DROP POLICY IF EXISTS "institution managers can delete logos" ON storage.objects;
DROP POLICY IF EXISTS "institution logos are publicly readable" ON storage.objects;

CREATE POLICY "institution logos are publicly readable"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'institution-logos');

CREATE POLICY "institution managers can upload logos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'institution-logos'
  AND EXISTS (
    SELECT 1
    FROM public.establishments e
    WHERE e.slug = split_part(name, '/', 1)
      AND public.is_establishment_manager(e.id)
  )
);

CREATE POLICY "institution managers can update logos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'institution-logos'
  AND EXISTS (
    SELECT 1
    FROM public.establishments e
    WHERE e.slug = split_part(name, '/', 1)
      AND public.is_establishment_manager(e.id)
  )
)
WITH CHECK (
  bucket_id = 'institution-logos'
  AND EXISTS (
    SELECT 1
    FROM public.establishments e
    WHERE e.slug = split_part(name, '/', 1)
      AND public.is_establishment_manager(e.id)
  )
);

CREATE POLICY "institution managers can delete logos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'institution-logos'
  AND EXISTS (
    SELECT 1
    FROM public.establishments e
    WHERE e.slug = split_part(name, '/', 1)
      AND public.is_establishment_manager(e.id)
  )
);
