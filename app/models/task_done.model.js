module.exports = (sequelize, Sequelize) => {
    const Task_done = sequelize.define("task_done", {
        task_done_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        timestamp: {
            type: Sequelize.DATE,
            allowNull: true
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

    return Task_done;
};