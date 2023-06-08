const db = require('../../connection');

/**
 * Soft deletes a user from the database by setting the "deleted_at" field.
 * @param {number} id - The ID of the user to be soft deleted.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the success of the operation.
 */
const remove = (id) => {
  const query = 'SELECT soft_delete_user($1) AS success;';
  const values = [id];

  return db.query(query, values)
    .then(data => {
      const success = data.rows[0].success;
      return success;
    })
    .catch(error => {
      console.error('Error soft deleting chapter:', error);
      return false;
    });
};

module.exports = remove;
