module.exports = app => {
    const pirates = require("../controllers/pirate.controller.js");

    var router = require("express").Router();

    // Create a new pirates
    router.post("/", pirates.create);

    // Retrieve all pirates
    router.get("/", pirates.findAll);

    // Retrieve a single pirates with id
    router.get("/:id", pirates.findOne);

    // Update a pirates with id
    router.put("/:id", pirates.update);

    // Delete a pirates with id
    router.delete("/:id", pirates.delete);

    app.use('/api/pirates', router);
};