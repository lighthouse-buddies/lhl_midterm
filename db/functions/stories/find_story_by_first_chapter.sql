-- Create the find_story_by_first_chapter function
CREATE OR REPLACE FUNCTION find_story_by_first_chapter(first_chapter_id INT)
RETURNS INT AS $$
DECLARE
story_id INT;
BEGIN
SELECT id INTO story_id
FROM stories
WHERE first_chapter_id = first_chapter_id;

RETURN story_id; -- Return the story ID
END;
$$ LANGUAGE plpgsql;
