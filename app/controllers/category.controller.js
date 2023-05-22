const db = require("../models");
const Category = db.categories;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    const category = {
        title: req.body.title,
        user_id: req.body.user_id
    };

    Category.create(category)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                Message: err.message || "Some error occurred while creating the category."
            });
        });
};

exports.findAll = (req, res) => {
    Category.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ Message: err.message || "Some error occurred while retrieving Categories." });
        });
};

exports.findOne = (req, res) => {
    const category_id = req.params.id;

    Category.findByPk(category_id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ Message: "Error retrieving category with id=" + category_id });
        });
};

exports.update = (req, res) => {
    const category_id = req.params.id;

    Category.update(req.body, {
            where: { category_id: category_id }
        })
        .then(num => {
            if (num == 1) {
                res.send({ Message: "Category was updated successfully." });
            } else {
                res.send({ Message: `Cannot update category with id=${category_id}. Maybe category was not found or req.body is empty!` });
            }
        })
        .catch(err => {
            res.status(500).send({ Message: "Error updating category with id=" + category_id });
        });
};

exports.delete = (req, res) => {
    const category_id = req.params.id;

    Category.destroy({
            where: { category_id: category_id }
        })
        .then(num => {
            if (num == 1) {
                res.send({ Message: "Category was deleted successfully!" });
            } else {
                res.send({ Message: `Cannot delete category with id=${category_id}. Maybe category was not found!` });
            }
        })
        .catch(err => {
            res.status(500).send({ Message: "Could not delete category with id=" + category_id });
        });
};