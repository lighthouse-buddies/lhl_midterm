CREATE OR REPLACE FUNCTION get_chapter_number(chapter_id INT)
RETURNS INT AS $$
DECLARE
chapter_number INT;
BEGIN
WITH RECURSIVE chapter_path AS (
  SELECT id, prev
  FROM chapters
  WHERE id = chapter_id

  UNION ALL

  SELECT chapters.id, chapters.prev
  FROM chapters
         JOIN chapter_path ON chapters.id = chapter_path.prev
)
SELECT COUNT(*) INTO chapter_number
FROM chapter_path;

RETURN chapter_number;
END;
$$ LANGUAGE plpgsql;
