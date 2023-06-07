-- Create the find_last_chapter_by_story function
CREATE OR REPLACE FUNCTION find_last_chapter_by_story(story_id INT)
RETURNS INT AS $$
DECLARE
last_chapter_id INT;
BEGIN
SELECT last_chapter_id INTO last_chapter_id
FROM stories
WHERE id = story_id;

RETURN last_chapter_id; -- Return the last chapter ID
END;
$$ LANGUAGE plpgsql;
