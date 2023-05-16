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
            allowNull: false
        }
    });
    return Task;
};