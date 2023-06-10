const { expect } = require('chai');
const { User, Chapter, Story, Vote } = require('./../../db/sequelize'); // Assuming the Sequelize models are exported from a separate file

let email;
const name = 'John Doe';
const password = 'password123';

describe('Sequelize Models', () => {
  before(async () => {
    // Establish a test database connection
    // Perform any necessary setup before running the tests
  });

  after(async () => {
    // Close the database connection
    // Perform any necessary teardown after running the tests
  });

  beforeEach(async () => {
    // Reset the database or perform any necessary actions before each test
    email = Date.now().toString() + '@example.com';
  });

  afterEach(async () => {
    // Clean up any data or perform any necessary actions after each test
  });

  describe('User Model', () => {
    it('should create a new user', async () => {
      const user = await User.create({
        username: name,
        email: email,
        password: password,
      });

      expect(user).to.be.an('object');
      expect(user.username).to.equal(name);
      expect(user.email).to.equal(email);
      expect(user.password).to.equal(password);
    });

    // Add more tests for the User model
  });

  describe('Chapter Model', () => {
    it('should create a new chapter', async () => {
      // Create a user to associate with the chapter
      const user = await User.create({
        username: name,
        email: email,
        password: password,
      });

      const chapter = await Chapter.create({
        content: 'Chapter content goes here',
        prev: null,
        user_id: user.id,
      });

      expect(chapter).to.be.an('object');
      expect(chapter.content).to.equal('Chapter content goes here');
      expect(chapter.prev).to.be.null;
      expect(chapter.user_id).to.equal(user.id);
    });

    // Add more tests for the Chapter model
  });

  describe('Story Model', () => {
    it('should create a new story', async () => {
      // Create a chapter to associate with the story
      const chapter = await Chapter.create({
        content: 'Chapter content goes here',
        prev: null,
      });

      const story = await Story.create({
        title: 'My Story',
        first_chapter_id: chapter.id,
        last_chapter_id: chapter.id,
        complete: false,
      });

      expect(story).to.be.an('object');
      expect(story.title).to.equal('My Story');
      expect(story.first_chapter_id).to.equal(chapter.id);
      expect(story.last_chapter_id).to.equal(chapter.id);
      expect(story.complete).to.be.false;
    });

    // Add more tests for the Story model
  });

  describe('Vote Model', () => {
    it('should create a new vote', async () => {
      // Create a user and chapter to associate with the vote
      const user = await User.create({
        username: name,
        email: email,
        password: password,
      });

      const chapter = await Chapter.create({
        content: 'Chapter content goes here',
        prev: null,
      });

      const vote = await Vote.create({
        user_id: user.id,
        chapter_id: chapter.id,
      });

      expect(vote).to.be.an('object');
      expect(vote.user_id).to.equal(user.id);
      expect(vote.chapter_id).to.equal(chapter.id);
    });

    // Add more tests for the Vote model
  });
});
