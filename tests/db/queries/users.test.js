// Import the functions
const { getUsers, getUserById, authenticate, getUserIdByStory } = require('../../../db/queries/users'); // Replace 'your-module' with the appropriate module path

// Function to test the functionality
const testFunctions = async () => {
  try {
    // Retrieve all users
    const allUsers = await getUsers();
    console.log('All Users:', allUsers);

    // Retrieve a specific user by ID
    const userId = 1; // Replace with the desired user ID
    const userById = await getUserById(userId);
    console.log(`User with ID ${userId}:`, userById);

    // Authenticate a user
    const email = 'example@example.com'; // Replace with the desired email
    const password = 'password'; // Replace with the desired password
    const isAuthenticated = await authenticate(email, password);
    console.log(`Authentication result for user with email ${email}:`, isAuthenticated);

    // Retrieve the user ID associated with a story's first chapter
    const storyId = 1; // Replace with the desired story ID
    const firstChapterUserId = await getUserIdByStory(storyId);
    console.log(`User ID associated with the first chapter of story ${storyId}:`, firstChapterUserId);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Call the test function
testFunctions();
