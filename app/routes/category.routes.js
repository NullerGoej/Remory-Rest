module.exports = app => {
    const categories = require("../controllers/category.controller.js");

    var router = require("express").Router();

    // Create a new User
    router.post("/", categories.create);

    // Retrieve all Users
    router.get("/", categories.findAll);

    // Retrieve a single User with id
    router.get("/:id", categories.findOne);

    // Update a User with id
    router.put("/:id", categories.update);

    // Delete a User with id
    router.delete("/:id", categories.delete);

    app.use('/api/categories', router);
};