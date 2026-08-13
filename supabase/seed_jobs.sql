DO $$ 
DECLARE
  b_id uuid;
BEGIN
  -- Get any business
  SELECT id INTO b_id FROM public.businesses LIMIT 1;

  IF b_id IS NOT NULL THEN
    -- Job 1
    INSERT INTO public.jobs (business_id, title, description, type, location, salary_range, is_active)
    VALUES (b_id, 'Senior Pattern Cutter', 'Lead pattern development, fittings and production handoff for bespoke occasionwear. Requirements: 5+ years experience in luxury womenswear', 'full-time', 'On-site', '₦350k to ₦500k monthly', true);

    -- Job 2
    INSERT INTO public.jobs (business_id, title, description, type, location, salary_range, is_active)
    VALUES (b_id, 'Brand Content Lead', 'Shape editorial campaigns, launch stories and social content for a growing ready-to-wear label. Requirements: Portfolio of fashion copywriting and art direction', 'contract', 'Remote', 'Negotiable', true);

    -- Job 3
    INSERT INTO public.jobs (business_id, title, description, type, location, salary_range, is_active)
    VALUES (b_id, 'Fashion Illustration Tutor', 'Teach weekly illustration classes and support portfolio development for diploma students. Requirements: Strong drawing portfolio and patience', 'part-time', 'On-site', 'Hourly rate', true);

    -- Job 4
    INSERT INTO public.jobs (business_id, title, description, type, location, salary_range, is_active)
    VALUES (b_id, 'Bridal Client Experience Manager', 'Coordinate consultations, fittings, schedules and client communication across bridal projects. Requirements: Excellent communication and organization', 'full-time', 'On-site', '₦200k to ₦300k monthly', true);
  END IF;
END $$;
