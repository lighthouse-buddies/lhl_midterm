-- Create the find_first_chapter function
CREATE OR REPLACE FUNCTION find_first_chapter_by_chapter(chapter_id INT)
RETURNS INT AS $$
DECLARE
first_chapter_id INT; -- Declare a variable to store the ID of the first chapter
BEGIN
WITH RECURSIVE previous_path AS (
  -- Recursive query to traverse the chapter path
  SELECT id, prev -- Select the ID and previous chapter ID
  FROM chapters
  WHERE id = chapter_id -- Start with the given chapter ID
  UNION ALL
  SELECT c.id, c.prev -- Combine with the next chapter's ID and previous chapter ID
  FROM chapters c
         JOIN previous_path p ON c.id = p.prev -- Join with the previous path to continue the traversal
)
SELECT id INTO first_chapter_id -- Select the ID of the first chapter into the variable
FROM previous_path
WHERE prev IS NULL -- Filter for the chapter where the previous chapter ID is NULL
ORDER BY id ASC -- Order the results by ID in ascending order
  LIMIT 1 -- Retrieve only the first row
;

RETURN first_chapter_id; -- Return the ID of the first chapter
END;
$$ LANGUAGE plpgsql;
