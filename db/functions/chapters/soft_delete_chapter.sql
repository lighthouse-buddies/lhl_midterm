-- Create the soft_delete_chapter function
CREATE OR REPLACE FUNCTION soft_delete_chapter(
  chapter_id INT
)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if the chapter exists
  IF NOT EXISTS (SELECT 1 FROM chapters WHERE id = chapter_id) THEN
    RETURN FALSE; -- Chapter not found, return false
END IF;

  -- Soft delete the chapter
UPDATE chapters
SET deleted_at = CURRENT_TIMESTAMP
WHERE id = chapter_id;

RETURN TRUE; -- Chapter soft deleted successfully
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE; -- Chapter deletion failed
END;
$$ LANGUAGE plpgsql;
