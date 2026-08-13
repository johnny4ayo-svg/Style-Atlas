-- Seed script for dummy portfolios and media

-- 1. Generate one portfolio for every business
INSERT INTO public.portfolios (business_id)
SELECT id FROM public.businesses
ON CONFLICT DO NOTHING;

-- 2. Generate 4 portfolio media items for each portfolio
INSERT INTO public.portfolio_media (portfolio_id, image_url, caption)
SELECT 
  p.id,
  CASE 
    WHEN (s.num % 4) = 1 THEN '/images/designer-blue.jpg'
    WHEN (s.num % 4) = 2 THEN '/images/bridal-black.jpg'
    WHEN (s.num % 4) = 3 THEN '/images/fashion-couple.jpg'
    ELSE '/images/designer-green.jpg'
  END as image_url,
  'Selected portfolio piece' as caption
FROM public.portfolios p
CROSS JOIN generate_series(1, 4) as s(num);
