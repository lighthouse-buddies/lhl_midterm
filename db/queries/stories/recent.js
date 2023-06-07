const db = require('../../connection');

/**
  * Retrieves an array of story IDs of the most recently updated stories.
  * @param {number} limit - The maximum number of stories to retrieve.
  * @returns {Promise<number[]>} A promise that resolves to an array of story IDs.
  */
const recentStories = (limit) => {
  const query = `
    SELECT stories.id
    FROM stories
    JOIN chapters ON chapters.id = stories.last_chapter_id
    WHERE stories.deleted_at IS NULL
    ORDER BY chapters.created_at DESC
    LIMIT $1;
  `;

  const values = [limit];

  return db.query(query, values)
  .then((data) => {
    const storyIds = data.rows.map(row => row.id)
    return storyIds;
  })
  .catch((error) => {
    console.log(error);
    return [];
  })
}

module.exports = recentStories;
