-- Add status column to events table

BEGIN;

ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending_review' NOT NULL;

COMMIT;
