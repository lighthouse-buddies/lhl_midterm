const db = require('../../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString = `
    SELECT * FROM users
    WHERE email = $1
    `;

  return db
    .query(queryString, [email])
    .then(result => result.rows[0] || null)
    .catch(error => console.log(error.message));
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `
    SELECT * FROM users
    WHERE id = $1
    `;

  return db
    .query(queryString, [id])
    .then(result => result.rows[0] || null)
    .catch(error => console.log(error.message));
};

/**
 * Get a single username from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUsernameById = function(id) {
  const queryString = `
    SELECT username FROM users
    WHERE id = $1
    `;

  return db
    .query(queryString, [id])
    .then(result => result.rows[0] || null)
    .catch(error => console.log(error.message));
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  const queryString = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [user.name, user.email, user.password];

  return db
    .query(queryString, values)
    .then(result => result.rows[0])
    .catch(error => console.log(error));
};

/**
 * Returns all stories by currently logged in user.
 * @param {string} id The id of the user
 * @return {Promise<{}>} A promise to the user.
 */
const getStoriesByUserId = (id) => {
  const queryString = `
    SELECT * FROM stories
    WHERE first_chapter_id IN
    (SELECT id FROM chapters WHERE user_id = $1);
    `;

  return db
    .query(queryString, [id])
    .then(result => result.rows)
    .catch(error => console.log(error));
};


module.exports = { getUsers, getUserWithEmail, getUserWithId, addUser, getStoriesByUserId, getUsernameById };
