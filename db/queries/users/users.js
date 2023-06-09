const create = require('./create');
const getData = require('./getData');
const authenticate = require('./authenticate');
const removeUser = require('./remove');
const db = require("../../connection");

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};



module.exports = {
  getUsers: getUsers,
    create: create,/**
   * Creates a new user in the database.
   * @param {string} username - The username of the user.
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<number|null>} A promise that resolves to the user ID (as a number) if the user is created successfully, or null if the user creation fails.
   */
    getData:getData,/**
   * Retrieves a user by their user ID.
   * @param {number} user_id - The ID of the user.
   * @returns {Promise<Object|null>} A promise that resolves to an object containing user details if found, or null if not found.
   */
    authenticate: authenticate,/**
   * Authenticates a user based on their email and password.
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<number|null>} A promise that resolves to the user ID (as a number) if authentication is successful, or null if authentication fails.
   */
   //  getIdByStoryId: getIdByStoryId,/**
   // * Retrieves the user ID associated with a given story ID.
   // * @param {number} story_id - The ID of the story.
   // * @returns {Promise<number|null>} A promise that resolves to the user ID (as a number) if found, or null if not found.
   // */
    remove: removeUser,/**
   * Soft deletes a user from the database by setting the "deleted_at" field.
   * @param {number} userId - The ID of the user to be soft deleted.
   * @returns {Promise<boolean>} A promise that resolves to true if the user is soft deleted successfully, or false if the user deletion fails.
   */
}
