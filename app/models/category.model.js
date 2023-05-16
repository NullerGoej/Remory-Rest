module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
        category_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    return Category;
};