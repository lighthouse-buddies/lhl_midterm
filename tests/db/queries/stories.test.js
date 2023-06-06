const assert = require('assert');
const Stories = require('./../../../db/queries/stories/stories');

// Declare test variables in document scope
let createdStoryId;
let userId=1;
let chapterId=1;
let chapterId2=2;
let storyId=1;

before(async function() {
  // Set up the data before running the tests
  // Create a user or retrieve an existing user ID from the database
  // userId = await createTestUser(); // Replace with your user creation logic

  // Create a chapter or retrieve an existing chapter ID from the database
 // Replace with your chapter creation logic
});

describe('Stories', function() {
  describe('create', function() {
    it('should create a story in the database', async function() {
      const title = 'Test Story';

      const result = await Stories.create(title, chapterId);
      assert.strictEqual(result, true);
    });
  });

  describe('remove', function() {
    it('should remove a story from the database', async function() {
      // Assume a story has been created in the previous test
      const result = await Stories.remove(createdStoryId);
      assert.strictEqual(result, true);
    });
  });

  describe('approve', function() {
    it('should approve a chapter and add it as the last chapter of a story', async function() {

      const result = await Stories.approve(storyId, chapterId2);
      assert.strictEqual(result, true);
    });
  });

  describe('getStoriesByUserId', function() {
    it('should retrieve an array of story IDs associated with a user ID', async function() {
      const stories = await Stories.getStoriesByUserId(userId);
      assert(Array.isArray(stories));
    });
  });

  describe('getData', function() {
    it('should retrieve a row by its ID', async function() {
      // Assume a user with ID `userId` exists in the database
      const tableName = 'users';
      const data = await Stories.getData(tableName, userId);
      console.log('Retrieved user data:', data); // Console log the retrieved data
      assert.strictEqual(typeof data, 'object');
    });
  });
});


