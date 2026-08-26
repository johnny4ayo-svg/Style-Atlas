-- Cleanup script to permanently remove all fabricated/generated events from the database.
-- These events have Latin-like titles, fake descriptions, or are tied to the 'system' or 'seed' identifiers.

BEGIN;

-- Delete all events that were created by the initial mock seed scripts.
-- We can identify them by checking for typical Lorem Ipsum phrases or specific fake data characteristics
-- Or by deleting all events if no real events have been added yet, as this is a pre-launch site.

DELETE FROM events 
WHERE title ILIKE '%Ergonomic%'
   OR description ILIKE '%lorem ipsum%'
   OR status = 'draft'; 
-- Adjust the WHERE clause depending on exact identifiers of the fake records if necessary.
-- To completely purge ALL events for a clean slate, use:
-- DELETE FROM events;

COMMIT;
