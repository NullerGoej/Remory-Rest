module.exports = (sequelize, Sequelize) => {
    const Task_done = sequelize.define("task_done", {
        task_done_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        timestamp: {
            type: Sequelize.DATE,
            allowNull: false
        },
        task_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'tasks',
                key: 'task_id'
            }
        }
    });

    Task_done.associate = function(models) {
        Task_done.belongsToMany(models.tasks, {
            as: 'tasks',
            through: 'tasksTask_done',
            foreignKey: 'task_id',
            onDelete: 'CASCADE'
        })
    };
    return Task_done;
};