-- Publication approval is separate from identity verification.
-- Apply this migration before deploying the premium homepage and onboarding.
ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS publication_status TEXT NOT NULL DEFAULT 'pending'
  CHECK (publication_status IN ('pending', 'approved', 'rejected'));

-- Preserve the visibility of established profiles already marked verified.
UPDATE public.businesses SET publication_status = 'approved'
WHERE is_verified = true AND publication_status = 'pending';

CREATE INDEX IF NOT EXISTS businesses_publication_status_idx ON public.businesses(publication_status);

-- Existing public SELECT policy exposes all records, including pending submissions.
DROP POLICY IF EXISTS "Businesses are viewable by everyone" ON public.businesses;
CREATE POLICY "Public sees approved businesses and owners see their own"
ON public.businesses FOR SELECT
USING (publication_status = 'approved' OR owner_id = auth.uid() OR EXISTS (
  SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
));

-- Prevent owners from publishing or verifying themselves via ordinary updates.
-- Restrict privileged fields to admin-controlled database functions/service-role workflows.
CREATE OR REPLACE FUNCTION public.protect_business_review_fields()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.role() <> 'service_role' AND NOT EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
  ) THEN
    IF TG_OP = 'INSERT' THEN
      NEW.publication_status := 'pending';
      NEW.is_verified := false;
      NEW.verification_status := 'unverified';
    ELSE
      NEW.publication_status := OLD.publication_status;
      NEW.is_verified := OLD.is_verified;
      NEW.verification_status := OLD.verification_status;
      NEW.verification_tier := OLD.verification_tier;
    END IF;
  END IF;
  RETURN NEW;
END; $$;
DROP TRIGGER IF EXISTS protect_business_review_fields_trigger ON public.businesses;
CREATE TRIGGER protect_business_review_fields_trigger
BEFORE INSERT OR UPDATE ON public.businesses
FOR EACH ROW EXECUTE FUNCTION public.protect_business_review_fields();
