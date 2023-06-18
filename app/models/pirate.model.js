module.exports = (sequelize, Sequelize) => {
    const Pirate = sequelize.define("pirate", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        pirateCrew: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Pirate;
};