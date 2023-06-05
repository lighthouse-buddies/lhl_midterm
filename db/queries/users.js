const db = require('../connection');

/**
 * Retrieves all users from the database.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
 */
const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

/**
 * Retrieves a user's information based on their ID.
 * @param {number} id - The ID of the user.
 * @returns {Promise<Object>} A promise that resolves to the user object.
 */
const getUserById = (id) => {
  return db.query('SELECT * FROM users WHERE id = $1;', [id])
    .then(data => {
      return data.rows[0];
    });
};

/**
 * Authenticates a user by checking if the provided email and password match a record in the database.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the authentication result.
 */
const authenticate = (email, password) => {
  return db.query('SELECT EXISTS(SELECT 1 FROM users WHERE email = $1 AND password = $2);', [email, password])
    .then(data => {
      return data.rows[0].exists;
    });
};

/**
 * Retrieves the user ID associated with a given story ID.
 * @param {number} story_id - The ID of the story.
 * @returns {Promise<number>} A promise that resolves to the user ID.
 */
const getUserIdByStory = (story_id) => {
  return db.query('SELECT user_id FROM stories WHERE id = $1;', [story_id])
    .then(data => {
      return data.rows[0].user_id;
    });
};

module.exports = {
  getUsers,
  getUserById,
  authenticate,
  getUserIdByStory
};
