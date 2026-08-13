DO $$ 
DECLARE
  b_id uuid;
  p_id uuid;
BEGIN
  -- Get any business
  SELECT id INTO b_id FROM public.businesses LIMIT 1;

  IF b_id IS NOT NULL THEN
    -- Product 1
    INSERT INTO public.products (business_id, name, description, base_price, image_url, is_published)
    VALUES (b_id, 'Emerald Ankara Statement Dress', 'Made to order · Ships in 14 to 21 days', 18500000, '/images/designer-green.jpg', true)
    RETURNING id INTO p_id;
    INSERT INTO public.product_variants (product_id, sku, size, color, inventory_count) VALUES (p_id, 'EM-01', 'Sizes 8 to 18', 'Emerald', 10);

    -- Product 2
    INSERT INTO public.products (business_id, name, description, base_price, image_url, is_published)
    VALUES (b_id, 'Blue Embroidered Occasion Set', 'Made to order · Custom length available', 23000000, '/images/designer-blue.jpg', true)
    RETURNING id INTO p_id;
    INSERT INTO public.product_variants (product_id, sku, size, color, inventory_count) VALUES (p_id, 'BL-01', 'Sizes 10 to 20', 'Blue', 10);

    -- Product 3
    INSERT INTO public.products (business_id, name, description, base_price, image_url, is_published)
    VALUES (b_id, 'Plum Detail Kaftan', 'Ready to ship · Tailoring adjustment included', 9850000, '/images/designer-menswear.jpg', true)
    RETURNING id INTO p_id;
    INSERT INTO public.product_variants (product_id, sku, size, color, inventory_count) VALUES (p_id, 'PL-01', 'S to XXL', 'Plum', 10);

    -- Product 4
    INSERT INTO public.products (business_id, name, description, base_price, image_url, is_published)
    VALUES (b_id, 'Pearl-Trimmed Bridal Blouse', 'Made to order · Styling consultation included', 14500000, '/images/designer-bridal.jpg', true)
    RETURNING id INTO p_id;
    INSERT INTO public.product_variants (product_id, sku, size, color, inventory_count) VALUES (p_id, 'PR-01', 'Custom sizing', 'White', 10);

    -- Product 5
    INSERT INTO public.products (business_id, name, description, base_price, image_url, is_published)
    VALUES (b_id, 'Black Heritage Occasion Set', 'Made to order · Accessories available separately', 27500000, '/images/bridal-black.jpg', true)
    RETURNING id INTO p_id;
    INSERT INTO public.product_variants (product_id, sku, size, color, inventory_count) VALUES (p_id, 'BK-01', 'Custom sizing', 'Black', 10);

    -- Product 6
    INSERT INTO public.products (business_id, name, description, base_price, image_url, is_published)
    VALUES (b_id, 'Hand-Finished Ceremonial Veil', 'Made to order · Hand-beaded details', 12000000, '/images/bridal-white.jpg', true)
    RETURNING id INTO p_id;
    INSERT INTO public.product_variants (product_id, sku, size, color, inventory_count) VALUES (p_id, 'WH-01', 'One size', 'White', 10);

    -- Product 7
    INSERT INTO public.products (business_id, name, description, base_price, image_url, is_published)
    VALUES (b_id, 'Coordinated Ceremony Set', 'Made to order · Couple consultation included', 39000000, '/images/fashion-couple.jpg', true)
    RETURNING id INTO p_id;
    INSERT INTO public.product_variants (product_id, sku, size, color, inventory_count) VALUES (p_id, 'CP-01', 'Custom sizing', 'Multi', 10);

    -- Product 8
    INSERT INTO public.products (business_id, name, description, base_price, image_url, is_published)
    VALUES (b_id, 'Soft Lounge Co-ord', 'Ready to ship · Locally produced', 5400000, '/images/fashion-studio.jpg', true)
    RETURNING id INTO p_id;
    INSERT INTO public.product_variants (product_id, sku, size, color, inventory_count) VALUES (p_id, 'LG-01', 'XS to XXL', 'Neutral', 10);

  END IF;
END $$;
