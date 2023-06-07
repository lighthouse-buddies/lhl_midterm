-- Create the find_author function
CREATE OR REPLACE FUNCTION find_author(story_id INT)
RETURNS INT AS $$
DECLARE
author_id INT;
BEGIN
SELECT user_id INTO author_id
FROM chapters
WHERE id = (SELECT first_chapter_id FROM stories WHERE id = story_id);

RETURN author_id; -- Return the author ID of the first chapter
END;
$$ LANGUAGE plpgsql;
