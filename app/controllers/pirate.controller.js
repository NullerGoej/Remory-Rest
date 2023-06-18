const db = require("../models");
const Pirate = db.pirates;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    const pirate = {
        name: req.body.name,
        age: req.body.age,
        pirateCrew: req.body.pirateCrew
    };

    Pirate.create(pirate)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                Message: err.message || "Some error occurred while creating the pirate."
            });
        });
};

exports.findAll = (req, res) => {
    Pirate.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ Message: err.message || "Some error occurred while retrieving pirates." });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Pirate.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ Message: "Error retrieving pirate with id=" + id });
        });
};

exports.update = (req, res) => {
    const _id = req.params.id;

    Pirate.update(req.body, {
            where: { id: _id }
        })
        .then(num => {
            if (num == 1) {
                res.send({ Message: "pirate was updated successfully." });
            } else {
                res.send({ Message: `Cannot update pirate with id=${_id}. Maybe pirate was not found or req.body is empty!` });
            }
        })
        .catch(err => {
            res.status(500).send({ Message: "Error updating pirate with id=" + _id });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Pirate.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({ Message: "pirate was deleted successfully!" });
            } else {
                res.send({ Message: `Cannot delete pirate with id=${id}. Maybe pirate was not found!` });
            }
        })
        .catch(err => {
            res.status(500).send({ Message: "Could not delete pirate with id=" + id });
        });
};