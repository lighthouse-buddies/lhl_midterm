const db = require('../../connection');

/**
 * Creates a new user in the database.
 * @param {string} username - The username of the user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<number|null>} A promise that resolves to the user ID (as a number) if the user is created successfully, or null if the user creation fails.
 */
const create = (username, email, password) => {
  const query = 'SELECT create_user($1, $2, $3) AS user_id;';
  const values = [username, email, password];

  return db.query(query, values)
    .then(data => {
      const userId = data.rows[0].user_id;
      return userId;
    })
    .catch(error => {
      console.error('Error creating user:', error);
      return null;
    });
};

module.exports = create;
