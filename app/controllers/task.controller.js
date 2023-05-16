const db = require("../models");
const Task = db.tasks;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.Name) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    const task = {
        title: req.body.title,
        description: req.body.description,
        user_id: req.body.user_id
    };

    Task.create(task)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                Message: err.message || "Some error occurred while creating the Task."
            });
        });
};

exports.findAll = (req, res) => {
    Task.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ Message: err.message || "Some error occurred while retrieving Tasks." });
        });
};

exports.findOne = (req, res) => {
    const task_id = req.params.id;

    Task.findByPk(task_id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ Message: "Error retrieving Task with id=" + task_id });
        });
};

exports.update = (req, res) => {
    const task_id = req.params.id;

    Task.update(req.body, {
            where: { task_id: task_id }
        })
        .then(num => {
            if (num == 1) {
                res.send({ Message: "Task was updated successfully." });
            } else {
                res.send({ Message: `Cannot update Task with id=${task_id}. Maybe Task was not found or req.body is empty!` });
            }
        })
        .catch(err => {
            res.status(500).send({ Message: "Error updating Task with id=" + task_id });
        });
};

exports.delete = (req, res) => {
    const task_id = req.params.id;

    Task.destroy({
            where: { task_id: task_id }
        })
        .then(num => {
            if (num == 1) {
                res.send({ Message: "Task was deleted successfully!" });
            } else {
                res.send({ Message: `Cannot delete Task with id=${task_id}. Maybe Task was not found!` });
            }
        })
        .catch(err => {
            res.status(500).send({ Message: "Could not delete Task with id=" + task_id });
        });
};