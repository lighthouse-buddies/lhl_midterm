const create = require('./createUser');
const getUserById = require('./getUserById');
const authenticate = require('./authenticateUser');
const getIdByStoryId = require('./getUserIdByStoryId');


module.exports = {
    create,
    getUserById,
    authenticate,
    getIdByStoryId
}
