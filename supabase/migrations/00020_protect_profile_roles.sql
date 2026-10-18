-- Prevent account owners from promoting themselves to platform administrators.
-- Existing profile self-update policies do not protect privileged columns.
CREATE OR REPLACE FUNCTION public.protect_profile_roles()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.role() = 'service_role' THEN
    RETURN NEW;
  END IF;
  IF TG_OP = 'INSERT' THEN
    NEW.role := 'customer';
  ELSIF NEW.role IS DISTINCT FROM OLD.role AND NOT EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Only administrators can change account roles';
  END IF;
  RETURN NEW;
END; $$;
DROP TRIGGER IF EXISTS protect_profile_roles_trigger ON public.profiles;
CREATE TRIGGER protect_profile_roles_trigger
BEFORE INSERT OR UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.protect_profile_roles();
