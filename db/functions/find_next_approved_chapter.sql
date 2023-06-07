CREATE OR REPLACE FUNCTION find_next_approved_chapter(last_chapter_id INT, chapter_id INT)
RETURNS INT AS $$
DECLARE
next_chapter_id INT;
BEGIN
SELECT id INTO next_chapter_id
FROM chapters

WHERE prev = chapter_id
  AND id = (
  WITH RECURSIVE chapter_path AS (
    SELECT id, prev
    FROM chapters
    WHERE id = last_chapter_id
    UNION ALL
    SELECT c.id, c.prev
    FROM chapters c
           JOIN chapter_path cp ON c.id = cp.prev
  )
  SELECT prev
  FROM chapter_path
  WHERE id = last_chapter_id
);

RETURN next_chapter_id;
END;
$$ LANGUAGE plpgsql;
