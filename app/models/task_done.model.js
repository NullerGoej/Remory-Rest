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
            allowNull: false
        }
    });
    return Task_done;
};