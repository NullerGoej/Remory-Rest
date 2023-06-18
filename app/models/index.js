const Sequelize = require("sequelize");
const sequelize = new Sequelize('pirates', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    port: 3306
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pirates = require("./pirate.model.js")(sequelize, Sequelize);

module.exports = db;