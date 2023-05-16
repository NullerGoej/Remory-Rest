module.exports = app => {
    const tasks_done = require("../controllers/task_done.controller.js");

    var router = require("express").Router();

    // Create a new Task
    router.post("/", tasks_done.create);

    // Retrieve all Tasks
    router.get("/", tasks_done.findAll);

    // Retrieve a single Task with id
    router.get("/:id", tasks_done.findOne);

    // Update a Task with id
    router.put("/:id", tasks_done.update);

    // Delete a Task with id
    router.delete("/:id", tasks_done.delete);

    app.use('/api/tasks_done', router);
};