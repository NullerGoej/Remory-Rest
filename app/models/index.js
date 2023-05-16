const Sequelize = require("sequelize");
const sequelize = new Sequelize('remory', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    port: 3306
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.tasks = require("./task.model.js")(sequelize, Sequelize);
db.categories = require("./category.model.js")(sequelize, Sequelize);
db.tasks_done = require("./task_done.model.js")(sequelize, Sequelize);

module.exports = db;