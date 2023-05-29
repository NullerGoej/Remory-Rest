const db = require("../models");
const Task = db.tasks;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    const task = {
        title: req.body.title,
        description: req.body.description,
        time: req.body.time,
        start_date: req.body.start_date,
        repeat: req.body.repeat,
        reminder: req.body.reminder,
        gps: req.body.gps,
        user_id: req.body.user_id,
        category_id: req.body.category_id
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
    Task.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ Message: err.message || "Some error occurred while retrieving Tasks." });
        });
};

exports.findToday = (req, res) => {
    const moment = require('moment');
    const TODAY_START = moment().format('YYYY-MM-DD 00:00');
    const TODAY_END = moment().format('YYYY-MM-DD 23:59');
    const NOW = moment().format();
    const TMR = moment().add(1, 'days').format();
    const YTD = moment().add(-1, 'days').format();
    const DOW = moment().day();

    Task.findAll({
            where: {
                [Op.or]: [{
                        start_date: {
                            [Op.between]: [
                                TODAY_START,
                                TODAY_END,
                            ]
                        },
                        time: {
                            [Op.or]: [{
                                [Op.between]: [
                                    NOW,
                                    TODAY_END,
                                ]
                            }, null]
                        },
                        repeat: {
                            [Op.or]: ["", null]
                        },
                    },
                    {
                        start_date: {
                            [Op.lte]: TMR
                        },
                        time: {
                            [Op.between]: [
                                TODAY_START,
                                TMR,
                            ]
                        },
                        repeat: {
                            [Op.or]: ["", null]
                        },
                    },
                    {
                        start_date: {
                            [Op.lte]: TODAY_START
                        },
                        time: {
                            [Op.or]: [{
                                [Op.between]: [
                                    NOW,
                                    TODAY_END,
                                ]
                            }, null]
                        },
                        repeat: {
                            [Op.like]: "%" + DOW + "%"
                        }
                    },
                    {
                        start_date: {
                            [Op.lte]: TMR
                        },
                        time: {
                            [Op.between]: [
                                TODAY_START,
                                TMR,
                            ]
                        },
                        repeat: {
                            [Op.like]: "%" + ((DOW % 7) + 1) + "%"
                        }
                    }
                ]

            },
            order: [
                [
                    'time', 'ASC'
                ]
            ],
            include: [{
                model: db.tasks_done,
                required: false,
                limit: 1,
                order: [
                    [
                        'timestamp', 'DESC'
                    ]
                ],
                where: {
                    timestamp: {
                        [Op.between]: [
                            YTD,
                            NOW
                        ]
                    }
                }
            }]
        })
        .then(data => {
            let array = [];
            data.forEach(element => {
                if (element.dataValues.task_dones.length != 0) {
                    element.dataValues.checked = true;
                } else {
                    element.dataValues.checked = false;
                }
                array.push(element);
            });
            res.send(array);
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