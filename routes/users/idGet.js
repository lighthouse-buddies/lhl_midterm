const Users = require('../../db/queries/users/users');
const userQueries = require("../../db/queries/queries");

const usersIdGetHandler = (req, res) => {
  const userId = req.params.id;
  const sessionUserId = req.session.userId;

  if (sessionUserId === userId) {
    userQueries.users.getData(userId)
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).send('User not found');
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send('Error retrieving user');
      });
  } else {
    res.status(401).send('Unauthorized');
  }
}

module.exports = usersIdGetHandler;
