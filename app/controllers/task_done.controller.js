const db = require("../models");
const Task_done = db.tasks_done;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.task_id) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    const task_done = {
        task_id: req.body.task_id
    };

    Task_done.create(task_done)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                Message: err.message || "Some error occurred while creating the task_done."
            });
        });
};

exports.findAll = (req, res) => {
    Task_done.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ Message: err.message || "Some error occurred while retrieving Categories." });
        });
};

exports.findOne = (req, res) => {
    const task_done_id = req.params.id;

    Task_done.findByPk(task_done_id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ Message: "Error retrieving task_done with id=" + task_done_id });
        });
};

exports.update = (req, res) => {
    const task_done_id = req.params.id;

    Task_done.update(req.body, {
            where: { task_done_id: task_done_id }
        })
        .then(num => {
            if (num == 1) {
                res.send({ Message: "Task_done was updated successfully." });
            } else {
                res.send({ Message: `Cannot update task_done with id=${task_done_id}. Maybe task_done was not found or req.body is empty!` });
            }
        })
        .catch(err => {
            res.status(500).send({ Message: "Error updating task_done with id=" + task_done_id });
        });
};

exports.delete = (req, res) => {
    const task_done_id = req.params.id;

    Task_done.destroy({
            where: { task_done_id: task_done_id }
        })
        .then(num => {
            if (num == 1) {
                res.send({ Message: "Task_done was deleted successfully!" });
            } else {
                res.send({ Message: `Cannot delete task_done with id=${task_done_id}. Maybe task_done was not found!` });
            }
        })
        .catch(err => {
            res.status(500).send({ Message: "Could not delete task_done with id=" + task_done_id });
        });
};