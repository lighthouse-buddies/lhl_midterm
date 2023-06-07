-- Create or replace the function
CREATE OR REPLACE FUNCTION find_next_approved_chapter_from_chapter(chapter_id INT)
RETURNS INT AS $$
DECLARE
first_chapter_id INT;
    story_id INT;
    last_chapter_id INT;
    next_chapter_id INT;
BEGIN
    first_chapter_id := find_first_chapter_by_chapter(chapter_id); -- Find the first chapter ID based on the given chapter ID

    story_id := find_story_by_first_chapter(first_chapter_id); -- Find the story ID based on the first chapter ID

    last_chapter_id := find_last_chapter_by_story(story_id); -- Find the last chapter ID based on the story ID

    next_chapter_id := find_next_approved_chapter(last_chapter_id, first_chapter_id); -- Find the next approved chapter based on the last chapter ID and first chapter ID

RETURN next_chapter_id; -- Return the next approved chapter ID
END;
$$ LANGUAGE plpgsql;
