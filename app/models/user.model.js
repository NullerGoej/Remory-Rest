module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    User.associate = function(models) {
        User.hasMany(models.tasks, {
            as: 'tasks',
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        })
    };

    return User;
};