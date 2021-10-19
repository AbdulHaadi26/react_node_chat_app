const Sequelize = require('sequelize');

const sequelize = new Sequelize('chat_app', 'root', 'toor', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
});

let db = {

};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Chat = require("./models/chat")(sequelize, Sequelize);
db.User = require("./models/user")(sequelize, Sequelize);


require('./relations')(db);

module.exports = db;