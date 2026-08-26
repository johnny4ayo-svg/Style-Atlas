-- Add ad package tiers

CREATE TYPE ad_package_tier AS ENUM ('basic', 'premium', 'enterprise');

ALTER TABLE public.promoted_campaigns 
ADD COLUMN package_tier ad_package_tier NOT NULL DEFAULT 'basic';
