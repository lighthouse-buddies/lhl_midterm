// const db = require('../../connection');
const User = require('../../sequelize').User;

/**
 * Creates a new user in the database.
 * @param {string} username - The username of the user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<number|null>} A promise that resolves to the user ID (as a number) if the user is created successfully, or null if the user creation fails.
 */

const create = async (username, email, password) => {
  try {
    const user = await User.create({
      username,
      email,
      password,
    });


    return user.id;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};


module.exports = create;
