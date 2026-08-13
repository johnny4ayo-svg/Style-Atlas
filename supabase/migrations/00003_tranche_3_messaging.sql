-- Tranche 3: Concierge, Enquiries & Messaging

-- ENUMS
CREATE TYPE public.quote_status AS ENUM ('pending', 'responded', 'accepted', 'declined');
CREATE TYPE public.appointment_type AS ENUM ('virtual', 'in-person');
CREATE TYPE public.appointment_status AS ENUM ('requested', 'confirmed', 'cancelled', 'completed');

-- 1. Conversations
CREATE TABLE public.conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(customer_id, business_id)
);

-- 2. Messages
CREATE TABLE public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. Quote Requests
CREATE TABLE public.quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  occasion TEXT,
  budget_range TEXT,
  target_date DATE,
  details TEXT NOT NULL,
  status public.quote_status DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 4. Quote Responses
CREATE TABLE public.quote_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_request_id UUID REFERENCES public.quote_requests(id) ON DELETE CASCADE NOT NULL UNIQUE,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  estimated_price INTEGER NOT NULL, -- Stored in smallest currency unit (e.g. kobo/cents)
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 5. Appointments
CREATE TABLE public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  appointment_date TIMESTAMPTZ NOT NULL,
  appointment_type public.appointment_type NOT NULL,
  status public.appointment_status DEFAULT 'requested' NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);


-- Enable Row Level Security (RLS)
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Create Policies

-- Conversations: Customer can see their own; Business Owner can see theirs
CREATE POLICY "Customers can access their conversations" ON public.conversations
  FOR ALL USING (auth.uid() = customer_id);

CREATE POLICY "Business owners can access their conversations" ON public.conversations
  FOR ALL USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));

-- Messages: Users can access messages in conversations they are part of
CREATE POLICY "Users can access messages if in conversation" ON public.messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.conversations c 
      WHERE c.id = conversation_id AND (
        c.customer_id = auth.uid() OR 
        EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = c.business_id AND b.owner_id = auth.uid())
      )
    )
  );

-- Quote Requests
CREATE POLICY "Customers can access their quote requests" ON public.quote_requests
  FOR ALL USING (auth.uid() = customer_id);

CREATE POLICY "Business owners can access quote requests" ON public.quote_requests
  FOR ALL USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));

-- Quote Responses
CREATE POLICY "Customers can view quote responses" ON public.quote_responses
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.quote_requests q WHERE q.id = quote_request_id AND q.customer_id = auth.uid()));

CREATE POLICY "Business owners can manage quote responses" ON public.quote_responses
  FOR ALL USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));

-- Appointments
CREATE POLICY "Customers can access their appointments" ON public.appointments
  FOR ALL USING (auth.uid() = customer_id);

CREATE POLICY "Business owners can access appointments" ON public.appointments
  FOR ALL USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = business_id AND b.owner_id = auth.uid()));
