const users = require('../../../../db/queries/users/users');
const assert = require('assert');

describe('users', function() {
  let userId;
  //get unix timestamp
  let username;
  let email;
  let password;
  let timestamp = (new Date().getTime()).toString();

  before(async function() {
    username = '1';
    email = timestamp;
    password = '1';

    userId = await users.create(username, email, password);
  });

  it('should retrieve a user by their user ID', async function() {
    const user = await users.get(userId);
    assert.strictEqual(user.id, userId);
    assert.strictEqual(user.username, '1');
    assert.strictEqual(user.email, timestamp);
  });

  it('should return null if user is not found', async function() {
    const nonExistentUserId = 999;
    const user = await users.get(nonExistentUserId);
    assert.strictEqual(user, null);
  });


  it(`should return true if authentication is successful`, async function() {

    const result = await users.authenticate(email, password);
    assert.strictEqual(result, true);
  });
  it(`should return false if authentication is unsuccessful`, async function() {
    const result = await users.authenticate(email, 'wrong password');
    assert.strictEqual(result, false);
  } );

  it('should remove a user by their ID', async function() {
    const result = await users.remove(userId);
    assert.strictEqual(result, true);
  });

  it('should return false if user removal fails', async function() {
    const nonExistentUserId = 999;
    const result = await users.remove(nonExistentUserId);
    assert.strictEqual(result, false);
  });
});
