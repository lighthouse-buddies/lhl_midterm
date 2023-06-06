const db = require(`../../db/connection.js`);
require('dotenv').config({ path: '../../.env' });
console.log(process.env)
console.log(db);
