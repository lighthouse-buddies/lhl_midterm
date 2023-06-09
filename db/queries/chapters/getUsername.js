const db = require('../../connection');

/**
 * Retrieves the username of a user based on the user_id in the chapters table.
 * @param {number} user_id - The ID of the user.
 * @returns {Promise<string>} A promise that resolves to the username.
 */
const getUsername = (user_id) => {
  const query = `
    SELECT users.username
    FROM chapters
    JOIN users ON chapters.user_id = users.id
    WHERE chapters.user_id = $1;
    `;
  const values = [user_id];

  return db.query(query, values)
    .then((result) => {
      if (result.rows.length > 0) {
        const username = result.rows[0].username;
        return username;
      } else {
        throw new Error(`User with ID ${user_id} not found in chapters table`);
      }
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = getUsername;
