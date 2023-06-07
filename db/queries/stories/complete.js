/**
  * Retrieves a row by its ID from the stories table in the database.
  * @param {number} id - The ID of the row.
  * @returns {Promise<Object|null>} A promise that resolves to the row object if found, or null if not found.
  */

const completedStories = (storyId) => {
  const query = `
    SELECT * FROM stories
    WHERE id = $1 AND complete = true;
  `;

  const values = [storyId];

  return db.query(query, values)
    .then((data) => {
      if (data.rows.length > 0) {
        const story = data.rows[0];
        return story;
      } else {
        return null;
      }
    })
    .catch(error => {
      console.log(error);
      return null;
    });
};

module.exports = completedStories;
