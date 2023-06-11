const User = require('../../sequelize').User;

/**
 * Retrieves a user by their user ID.
 * @param {number} user_id - The ID of the user.
 * @returns {Promise<Object|null>} A promise that resolves to an object containing user details if found, or null if not found.
 */
const getData = async (user_id) => {
  try {
    const user = await User.findByPk(user_id);

    if (user) {
      // Extract the user details from the user object
      const { id, username, email, deleted_at } = user;
      return { id, username, email, deleted_at };
    } else {
      return null; // User not found
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    return null; // Error occurred
  }
};

module.exports = getData;
