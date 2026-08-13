DO $$ 
DECLARE
  b_id uuid;
  u_id uuid;
BEGIN
  -- Get any business
  SELECT id INTO b_id FROM public.businesses LIMIT 1;
  -- Get any profile for author
  SELECT id INTO u_id FROM public.profiles LIMIT 1;

  IF b_id IS NOT NULL THEN
    -- Events
    INSERT INTO public.events (business_id, title, description, event_date, location, ticket_price, image_url)
    VALUES (b_id, 'Lagos Fashion Week 2026', 'Runway shows, presentations, retail events and industry conversations across the city.', '2026-10-18T09:00:00Z', 'Lagos', 0, '/images/hero-editorial.jpg');

    INSERT INTO public.events (business_id, title, description, event_date, location, ticket_price, image_url)
    VALUES (b_id, 'Bridal Business Forum', 'Industry forum for bridal designers', '2026-11-22T10:00:00Z', 'Abuja', 2500000, '/images/bridal-black.jpg');

    INSERT INTO public.events (business_id, title, description, event_date, location, ticket_price, image_url)
    VALUES (b_id, 'Small Studio Systems Workshop', 'Workshop on scaling production', '2026-08-16T14:00:00Z', 'Yaba', 1500000, '/images/fashion-studio.jpg');

    INSERT INTO public.events (business_id, title, description, event_date, location, ticket_price, image_url)
    VALUES (b_id, 'New Northern Menswear', 'A curated presentation of designers working across kaftans, agbada and contemporary tailoring.', '2026-09-07T11:00:00Z', 'Kano', 0, '/images/designer-menswear.jpg');
  END IF;

  IF u_id IS NOT NULL THEN
    -- Articles
    INSERT INTO public.articles (title, slug, content, cover_image_url, author_id, published_at)
    VALUES ('The designers making Ankara feel new again', 'the-new-ankara', 'Ankara has always carried visual confidence. What feels different now is how a new generation of Nigerian designers is handling the cloth itself. Instead of relying on print alone, they are shaping volume, refining seams and allowing negative space to do part of the work.', '/images/designer-green.jpg', u_id, now());

    INSERT INTO public.articles (title, slug, content, cover_image_url, author_id, published_at)
    VALUES ('How to choose a bridal designer without second-guessing every detail', 'choosing-bridal-designer', 'A practical guide to timelines, fittings and creative fit.', '/images/designer-bridal.jpg', u_id, now());

    INSERT INTO public.articles (title, slug, content, cover_image_url, author_id, published_at)
    VALUES ('What a stronger studio looks like behind the photos', 'stronger-studio-behind-photos', 'Processes that protect the designer, team and client.', '/images/fashion-studio.jpg', u_id, now());
  END IF;
END $$;
