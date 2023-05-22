module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        task_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING
        },
        time: {
            type: Sequelize.TIME
        },
        start_date: {
            type: Sequelize.DATEONLY
        },
        repeat: {
            type: Sequelize.STRING
        },
        reminder: {
            type: Sequelize.INTEGER
        },
        gps: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        category_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'category_id'
            }
        }
    });

    Task.associate = function(models) {
        Task.hasMany(models.tasks_done, {
            foreignKey: 'task_id',
            onDelete: 'CASCADE'
        })
    };

    return Task;
};