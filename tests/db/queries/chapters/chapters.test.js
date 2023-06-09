const assert = require('assert');
const Chapters = require('../../../../db/queries/chapters/chapters');



const content = 'Chapter content';

describe('Chapters', function() {
  let chapterId;
  let chapterId2;


  before(async function() {

    const prev = null;
    const userId = 1; // Replace with the desired user ID'

  chapterId = (await Chapters.create(content, prev, userId)).id;
  chapterId2 = (await Chapters.create(content, chapterId, userId)).id;

  });

  it('should retrieve a chapter by its ID', async function() {
    const chapter = await Chapters.getData(chapterId);
    console.log(chapter);
    assert.strictEqual(chapter.id, chapterId);
    assert.strictEqual(chapter.content, content);
    assert.strictEqual(chapter.user_id, 1); // Replace with the expected user ID
  });

  it('should getData the next chapters', async function() {
    const nextChapters = await Chapters.getNextChapters(chapterId);
    console.log(await Chapters.getData(chapterId));
    assert.deepStrictEqual(nextChapters, [chapterId2]); // Replace with the expected array of chapter IDs
  });

  it('should remove a chapter by its ID', async function() {
    const result = await Chapters.remove(chapterId);
    assert.strictEqual(result, true);
  });
  //should return false when remove non existent chapter
  it('should return false if chapter removal fails', async function() {
    const nonExistentChapterId = 999;
    const result = await Chapters.remove(nonExistentChapterId);
    assert.strictEqual(result, false);
  });
});
