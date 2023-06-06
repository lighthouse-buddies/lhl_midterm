const db = require('../../connection');

/**
 * Retrieves the next chapter IDs for a given chapter ID.
 * @param {number} chapter_id - The ID of the current chapter.
 * @returns {Promise<number>} A promise that resolves to the next approved chapter ID if found, or null if not found.
 */
const nextApproved = (chapter_id) => {
  return Promise((resolve, reject) => {
    resolve(chapter_id);
  });

}

module.exports = nextApproved;
