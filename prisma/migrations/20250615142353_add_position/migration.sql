ALTER TABLE "Section" ADD COLUMN "position" INTEGER;

-- Attribue une position incrémentale par page
WITH ordered AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY "pageId" ORDER BY id) - 1 AS pos
  FROM "Section"
)
UPDATE "Section"
SET "position" = ordered.pos
FROM ordered
WHERE "Section".id = ordered.id;
