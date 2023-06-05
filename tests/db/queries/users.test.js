const users = require('../../../db/queries/users/users');

// // test users.create and users.get
// //users.create doc:
// // /**
// //  * Creates a new user in the database.
// //  * @param {string} username - The username of the user.
// //  * @param {string} email - The email address of the user.
// //  * @param {string} password - The password of the user.
// //  * @returns {Promise<number|null>} A promise that resolves to the user ID (as a number) if the user is created successfully, or null if the user creation fails.
// //  */
// // users.get doc:
// // /**
// //  * Retrieves a user by their user ID.
// //  * @param {number} user_id - The ID of the user.
// //  * @returns {Promise<Object|null>} A promise that resolves to an object containing user details if found, or null if not found.
// //  */
// // Import the necessary dependencies and modules
// const assert = require('assert');
//
// // Assuming the `users` module is imported correctly
//
// // Test users.create function
// describe('users.create', function() {
//   it('should create a new user in the database', async function() {
//     // Sample user data
//     const username = 'username';
//     const email = 'email@example.com';
//     const password = 'password';
//
//     // Call the users.create function with the sample user data
//     const userId = await users.create(username, email, password);
//
//     // Save the user ID for use in the users.get test
//     this.userId = userId;
//
//     // Assert that the user ID is a number
//     assert.strictEqual(typeof userId, 'number');
//   });
// });
//
// // Test users.get function
// describe('users.get', function() {
//   it('should retrieve a user by their user ID', async function() {
//     // Retrieve the saved user ID from the users.create test
//     const userId = this.userId;
//
//     // Call the users.get function with the user ID
//     const user = await users.get(userId);
//
//     // Assert that the user object is not null
//     assert.notStrictEqual(user, null);
//     // Assert other properties of the user object if necessary
//     assert.strictEqual(user.id, userId);
//     assert.strictEqual(user.username, 'username');
//     assert.strictEqual(user.email, 'email@example.com');
//     // ...
//   });
//
//   it('should return null if user is not found', async function() {
//     // Call the users.get function with a non-existent user ID
//     const user = await users.get(999);
//
//     // Assert that the user object is null
//     assert.strictEqual(user, null);
//   });
// });

users.create('username', 'email', 'password');
