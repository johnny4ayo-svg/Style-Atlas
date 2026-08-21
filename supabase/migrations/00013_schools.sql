-- Fashion Schools and Courses

-- Create Schools Table
CREATE TABLE public.schools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  school_name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  cover_image_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  accreditation_info TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  address TEXT,
  website_url TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  facilities TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Courses Table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  duration TEXT NOT NULL, -- e.g., '6 months', '2 years'
  tuition_fee DECIMAL(10, 2),
  teaching_format TEXT NOT NULL DEFAULT 'in-person', -- 'in-person', 'online', 'hybrid'
  entry_requirements TEXT,
  program_level TEXT, -- 'beginner', 'intermediate', 'advanced', 'diploma'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(school_id, slug)
);

-- RLS Policies for schools
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Schools are viewable by everyone"
  ON public.schools FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own schools"
  ON public.schools FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own schools"
  ON public.schools FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own schools"
  ON public.schools FOR DELETE
  USING (auth.uid() = owner_id);

-- RLS Policies for courses
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Courses are viewable by everyone"
  ON public.courses FOR SELECT
  USING (true);

CREATE POLICY "School owners can insert courses"
  ON public.courses FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.schools 
      WHERE schools.id = courses.school_id 
      AND schools.owner_id = auth.uid()
    )
  );

CREATE POLICY "School owners can update courses"
  ON public.courses FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.schools 
      WHERE schools.id = courses.school_id 
      AND schools.owner_id = auth.uid()
    )
  );

CREATE POLICY "School owners can delete courses"
  ON public.courses FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.schools 
      WHERE schools.id = courses.school_id 
      AND schools.owner_id = auth.uid()
    )
  );
