
const db = require('../../connection');
/**
 * Retrieves the previous chapters recursively until there is no previous chapter,
 * then finds the story that has the given chapter as the first chapter.
 * @param {number} chapter_id - The ID of the chapter.
 * @returns {Promise<number|null>} A promise that resolves to the ID of the story or null if no story is found.
 */
const storyOfChapter = async (chapter_id) => {




  // Retrieve the previous chapters recursively
  const retrievePreviousChaptersQuery = `
    WITH RECURSIVE previous_chapters AS (
      SELECT id, prev
      FROM chapters
      WHERE id = $1
      UNION ALL
      SELECT c.id, c.prev
      FROM chapters c
      JOIN previous_chapters pc ON pc.prev = c.id
    )
    SELECT s.id AS story_id
    FROM previous_chapters pc
    JOIN stories s ON s.first_chapter_id = pc.id
    LIMIT 1;
  `;

  try {
    // Execute the query using the database connection
    const result = await db.query(retrievePreviousChaptersQuery, [chapter_id]);

    // Return the story ID or null if no story is found
    return result.rows.length > 0 ? result.rows[0].story_id : null;
  } catch (error) {
    console.error('Error retrieving previous chapters and story:', error);
    throw error;
  }
};


module.exports = storyOfChapter;
