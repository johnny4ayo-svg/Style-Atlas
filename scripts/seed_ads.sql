BEGIN;
-- Pick one business and make it an active ad
INSERT INTO public.promoted_campaigns (business_id, target_type, status, amount_paid, starts_at, expires_at)
SELECT id, 'profile', 'active', 50000, now(), now() + interval '30 days'
FROM public.businesses
WHERE business_name = 'Ugo Monye'
LIMIT 1
ON CONFLICT DO NOTHING;
COMMIT;
