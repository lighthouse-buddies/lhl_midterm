const assert = require('assert');
const Chapters = require('../../../../db/queries/chapters/chapters');
const setUp = require('./setUp');

describe('Chapters', function() {
  let chapterIds;
  let testNumber = 5;

  before(async function() {
    const userId = 1; // Replace with the desired user ID

    chapterIds = await setUp(userId, testNumber);
  });

  it('should retrieve a chapter by its ID', async function() {
    const chapterId = chapterIds[chapterIds.length - 1];
    const expectedChapterNumber = testNumber;

    const actualChapterNumber = await Chapters.getChapterNumber(chapterId);

    assert.strictEqual(actualChapterNumber, expectedChapterNumber);
  });
});
