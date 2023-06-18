const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                Message: err.message || "Some error occurred while creating the user."
            });
        });
};

exports.findAll = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ Message: err.message || "Some error occurred while retrieving users." });
        });
};

exports.findOne = (req, res) => {
    const user_id = req.params.id;

    User.findByPk(user_id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ Message: "Error retrieving user with id=" + user_id });
        });
};

exports.update = (req, res) => {
    const user_id = req.params.id;

    User.update(req.body, {
            where: { user_id: user_id }
        })
        .then(num => {
            if (num == 1) {
                res.send({ Message: "User was updated successfully." });
            } else {
                res.send({ Message: `Cannot update user with id=${user_id}. Maybe user was not found or req.body is empty!` });
            }
        })
        .catch(err => {
            res.status(500).send({ Message: "Error updating user with id=" + user_id });
        });
};

exports.delete = (req, res) => {
    const user_id = req.params.id;

    User.destroy({
            where: { user_id: user_id }
        })
        .then(num => {
            if (num == 1) {
                res.send({ Message: "User was deleted successfully!" });
            } else {
                res.send({ Message: `Cannot delete user with id=${user_id}. Maybe user was not found!` });
            }
        })
        .catch(err => {
            res.status(500).send({ Message: "Could not delete user with id=" + user_id });
        });
};