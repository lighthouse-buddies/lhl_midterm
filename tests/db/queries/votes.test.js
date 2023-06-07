const assert = require('assert');
const Votes = require('../../../db/queries/votes/votes');

// Define the variables in the document scope
let userId = 1;
let chapterId = 1;
let chapterId2 =2

describe('Votes', function() {
  describe('create', function() {
    it('should create a new vote for a chapter in the database', async function() {

      const result = await Votes.create(userId, chapterId);
      assert.strictEqual(result, true);
    });
  });

  describe('getChapter', function() {
    it('should retrieve the total count of votes for a given chapter ID', async function() {
      const count = await Votes.getChapter(chapterId);
      assert.strictEqual(count, (1).toString());
    });
  });

  describe('remove', function() {
    it('should remove a vote for a chapter from the database', async function() {
      const result = await Votes.remove(userId, chapterId);
      assert.strictEqual(result, true);
    });
  });

  describe('getChapter', function() {
    it('should retrieve the total count of votes for a given chapter ID', async function() {
      const count = await Votes.getChapter(chapterId);
      assert.strictEqual(count, (0).toString());
      await Votes.remove(userId, chapterId2);
    });
  });
});
